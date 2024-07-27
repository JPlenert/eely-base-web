// Eelybase - (c) 2022-24 by Joerg Plenert | https://eely.eu
/// <reference path="../control_basic/Control.ts"/>
/// <reference path="../control_basic/ModalBox.ts"/>

class FirmwareUpdate extends Control{
    protected fileElement: HTMLInputElement;
    protected progressElement: HTMLDivElement;
    readonly esp_image_header_len = 24;
    readonly esp_image_segment_header_len = 8;
    readonly esp_app_desc_len = 256;
    readonly esp_app_desc_version_offset = 16;
    readonly esp_app_desc_version_len = 32;
    readonly esp_app_desc_project_offset = 16 + this.esp_app_desc_version_len;
    readonly esp_app_desc_project_len = 32;

    protected getInnerHtml() : string {
        return `<input id=${this.id}file type="file"><div id=${this.id}progress></div>`;
    }

    protected initControlLate(): void {
        this.fileElement = <HTMLInputElement>this.htmlElement.querySelector(`#${this.id}file`);
        this.fileElement.onchange = () => { 
            let file = (<any>this.fileElement).files[0];

            let reader = new FileReader();
            reader.readAsBinaryString(file);

            reader.onload = () => { this.handleUpload(reader.result as string) };
        }
        this.progressElement = <HTMLInputElement>this.htmlElement.querySelector(`#${this.id}progress`);
    }

    protected async handleUpload(data: string){
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
            this.progressElement.innerHTML = `<br/>Writing chunk ${chunkNo+1} / ${chunkCount}`;

            if (written == 0)
                toWrite = headerLen;
            else
                toWrite = Math.min(defaultChunkSize, data.length-written);
            
            // Convert to base64
            let baseData = btoa(data.substring(written, written + toWrite));
            console.log(`Sending update chunk ${chunkNo} with ${toWrite} bytes to ${written}`);
            await global.com.ota_upload(chunkNo, baseData, data.length);

            written += toWrite;
            chunkNo++;
        }

        // No await here - will not respond!
        global.com.restart();
        global.body.appendChild(new ModalBox("Resetting ...", "Device will reset now and will start up with new firmware.", false));
    }
}
