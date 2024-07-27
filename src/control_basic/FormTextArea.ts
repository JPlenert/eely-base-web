// Eelybase - (c) 2022-24 by Joerg Plenert | https://eely.eu
/// <reference path="FormControl.ts"/>

class FormTextArea extends FormControl{
    protected placeholer: string;

    constructor(headline: string, helpInfo: string = null){
        super(headline, helpInfo);
    }

    protected getEditElementHtml(id: string){
        var html : string = `<textarea class="form-control" id="${this.id}_edt" rows="50"></textarea>`;

        return html;
    }
}