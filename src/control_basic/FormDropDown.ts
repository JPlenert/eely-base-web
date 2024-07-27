// Eelybase - (c) 2022-24 by Joerg Plenert | https://eely.eu
/// <reference path="FormControl.ts"/>

class FormDropDownItem {
    public value: string;
    public display: string;

    constructor(value: string, display: string) {
        this.display = display;
        this.value = value;

    }
}

class FormDropDown extends FormControl {
    private buttonSvg: string;
    private items: FormDropDownItem[];
    public onButtonClick: (parent: FormDropDown) => void;

    constructor(headline: string, items: FormDropDownItem[], helpInfo: string = null, buttonSvg: string = null) {
        super(headline, helpInfo);
        this.buttonSvg = buttonSvg;
        this.items = items;
    }

    protected getEditElementHtml(id: string) {
        var html: string = "";

        if (this.buttonSvg != null)
            html += `<p style="display: flex">`;

        html += `<select class="form-control" id="${id}">`;
        this.items.forEach(element => {
            html += `<option value="${element.value}">${element.display}</option>`;
        });
        html += "</select>";

        if (this.buttonSvg != null)
            html += `<a class="nav-link" id="${this._id}_btn" href="#"><svg class="bi pe-none" width="24" height="24" role="img" aria-label="Dashboard"><use xlink:href="#${this.buttonSvg}"></use></svg></span></a></p>`;

        return html;
    }

    protected initControlLate(): void {
        super.initControlLate();
        if (this.buttonSvg != null) {
            (<HTMLButtonElement>this._htmlElement.querySelector(`#${this._id}_btn`)).onclick = () => { this.onButtonClick(this); };
        }
    }
}