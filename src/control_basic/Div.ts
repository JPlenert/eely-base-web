// Eelybase - (c) 2022-24 by Joerg Plenert | https://eely.eu
/// <reference path="Control.ts"/>

class Div extends Control{

    private html: string;

    constructor(html: string){
        super();
        this.html = html;
    }

    protected getHtml(): string {
        return this.html;
    }
}
