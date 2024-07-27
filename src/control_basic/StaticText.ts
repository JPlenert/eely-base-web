// Eelybase - (c) 2022-24 by Joerg Plenert | https://eely.eu
/// <reference path="Control.ts"/>

class StaticText extends Control{
    protected text: string;

    constructor(text: string){
        super();

        this.text = text;
    }

    protected getHtml(): string {
        return `<div>${this.text}</div>`;
    }
}