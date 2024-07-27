// Eelybase - (c) 2022-24 by Joerg Plenert | https://eely.eu
/// <reference path="FormControl.ts"/>

class FormRange extends Control{
    private labelText: string;
    public onClick : () => void;

    constructor(labelText: string){
        super();

        this.labelText = labelText;
    }

    protected getHtml(): string {
        var html: string = `<div id="${this.id}">`;

        if (this.labelText != null){
            html += `<label for="${this.id}_range" class="form-label">${this.labelText}</label>`;
        }

        html += `<input type="range" class="form-range" id="${this.id}_range"/>`;

        return html;
    }

    protected initControlLate() : void{
        (<HTMLButtonElement>this.htmlElement).onclick = () => this.onClick();
    }
}