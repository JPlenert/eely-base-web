// Eelybase - (c) 2022-24 by Joerg Plenert | https://eely.eu
/// <reference path="../control_basic/Control.ts"/>
/// <reference path="../control_basic/ModalBox.ts"/>

class ResetDevice extends Control{
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
        return `
			Reset device
			<button type="submit" class="btn btn-primary" id="${this.id}_reset">reset</button>
		`;
        }

    protected initControlLate(): void {
        let button = <HTMLButtonElement>this.htmlElement.querySelector(`#${this.id}_reset`);
        button.onclick = async ()  => { 

			global.com.restart();

			global.body.appendChild(new ModalBox("Resetting ...", "Device will reset now.", false))};
    }
}
