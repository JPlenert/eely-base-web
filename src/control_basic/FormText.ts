// Eelybase - (c) 2022-24 by Joerg Plenert | https://eely.eu
/// <reference path="FormControl.ts"/>

class FormText extends FormControl{
    protected placeholer: string;

    constructor(headline: string, placeholer: string = null, helpInfo: string = null){
        super(headline, helpInfo);
        this.placeholer = placeholer;
    }

    protected getEditElementHtml(id: string){
        var html : string = `<input type="text" class="form-control" id="${id}"`;

        if (this.placeholer != null)
            html += ` placeholder="${this.placeholer}"`;
        html += `>`;

        return html;
    }
}