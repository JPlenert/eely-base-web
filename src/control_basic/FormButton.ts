// Eelybase - (c) 2022-24 by Joerg Plenert | https://eely.eu
/// <reference path="FormControl.ts"/>

class FormButton extends Control{
    private buttonText: string;
    public onClick : () => void;

    constructor(text: string){
        super();

        this.buttonText = text;
    }

    protected getHtml(): string {
        var html: string;

        html = `<button type="submit" id="${this.id}_btn" class="btn btn-primary">${this.buttonText}</button>`;

        return html;
    }

    protected initControlLate() : void{
        (<HTMLButtonElement>this.htmlElement).onclick = () => this.onClick();
    }
}