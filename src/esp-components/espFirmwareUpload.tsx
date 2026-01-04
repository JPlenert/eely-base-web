// Eely-Base-Web - (c) 2022-26 by Joerg Plenert | https://eely.eu

import { ModalBox } from "../components/modal/modalBox";
import { h, Component, Fragment, ComponentChildren, RenderableProps } from "../features/preact";
import SimpleCom from "../features/simpleCom/simpleCom";

// Types for props
interface EspFirmwareUploadProps {
    com: SimpleCom;
};
  
// Types for state
interface EspFirmwareUploadState {};

export class EspFirmwareUpload extends Component<EspFirmwareUploadProps, EspFirmwareUploadState>{
    readonly esp_image_header_len = 24;
    readonly esp_image_segment_header_len = 8;
    readonly esp_app_desc_len = 256;
    readonly esp_app_desc_version_offset = 16;
    readonly esp_app_desc_version_len = 32;
    readonly esp_app_desc_project_offset = 16 + this.esp_app_desc_version_len;
    readonly esp_app_desc_project_len = 32;

    private progressInfo : string = "";

    render(props?: RenderableProps<EspFirmwareUploadProps, any> | undefined, state?: Readonly<EspFirmwareUploadState> | undefined, context?: any): ComponentChildren {
        return (<><input type="file" onChange={(e) => this.onFileChange(e)}/><div>{this.progressInfo}</div></>);
    }

    private onFileChange(e : any){        
        const files = (e.currentTarget as HTMLInputElement).files;

        if (files){
            let reader = new FileReader();
            reader.readAsBinaryString(files[0]);
            reader.onload = () => { this.handleUpload(reader.result as string) }
            console.log(e);
        }
    }

    private async handleUpload(data: string){
        console.log("len:" + data.length);
        let esp_app_desc_start = this.esp_image_header_len + this.esp_image_segment_header_len;
        let version = data.substring(esp_app_desc_start + this.esp_app_desc_version_offset, esp_app_desc_start + this.esp_app_desc_version_offset + this.esp_app_desc_version_len);
        console.log("version:" + version);
        let project = data.substring(esp_app_desc_start + this.esp_app_desc_project_offset, esp_app_desc_start + this.esp_app_desc_project_offset + this.esp_app_desc_project_len);
        console.log("project:" + project);
        // ToDo - Make plausi checks!

        var toWrite;
        var written = 0;
        var chunkNo = 0;
        let headerLen = this.esp_image_header_len + this.esp_image_segment_header_len + this.esp_app_desc_len;
        let defaultChunkSize = 6000;
        let chunkCount = 1 + Math.ceil(data.length / defaultChunkSize);
        while (written < data.length)
        {
            this.progressInfo = `Writing chunk ${chunkNo+1} / ${chunkCount}`;
            this.setState({});

            if (written == 0)
                toWrite = headerLen;
            else
                toWrite = Math.min(defaultChunkSize, data.length-written);
            
            // Convert to base64
            let baseData = btoa(data.substring(written, written + toWrite));
            console.log(`Sending update chunk ${chunkNo} with ${toWrite} bytes to ${written}`);
            await this.props.com.ota_upload(chunkNo, baseData, data.length);

            written += toWrite;
            chunkNo++;
        }

        // No await here - will not respond!
        this.props.com.restart();
        ModalBox.show("Resetting ....", "Device will reset now and will start up with new firmware.", false);
    }
}