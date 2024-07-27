// Eelybase - (c) 2022-24 by Joerg Plenert | https://eely.eu
/// <reference path="Control.ts"/>

class Body extends Control{

    public init(){
        this.initControl();
    }

    protected initControl(): HTMLElement {
        this._htmlElement = window.document.body;
        (<any>this._htmlElement).enmea = this;
        return this._htmlElement;
    }
}