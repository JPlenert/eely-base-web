// Eelybase - (c) 2022-24 by Joerg Plenert | https://eely.eu
/// <reference path="FormControl.ts"/>

class FormCheckbox extends FormControl{

    constructor(headline: string, helpInfo: string = null){
        super(headline, helpInfo);
    }

    public setValue(data: any){
        this.editorElement.checked = data;
    }

    public getValue() : any{
        return this.editorElement.checked;
    }

    protected getEditElementHtml(id: string){
        return `<br><input type="checkbox" id="${id}"><br>`;
    }
}