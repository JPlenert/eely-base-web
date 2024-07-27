// Eelybase - (c) 2022-24 by Joerg Plenert | https://eely.eu
/// <reference path="Control.ts"/>

class Navbar extends Control {
    private contentDiv: Div;
    private headlineText: string;
    private ul: HTMLUListElement;

    private onClickArray: ((parent: Control) => void)[] = [];

    constructor(headlineText: string) {
        super();
        this.headlineText = headlineText;
    }

    protected getHtml(): string {
        return `<div>        
        <nav class="navbar">
         <a class="navbar-logo" href="#">${this.headlineText}&nbsp;</a>
         <div class="navbar-body" id="navbarNav">
            <ul id="${this._id}ul" class="navbar-nav">
            </ul></div>
            <a class="navbar-logo" href="https://eely.eu" target="_new">eely.eu&nbsp;</a>
        </nav>                        
        </div>`;
    }

    protected initControlLate(): void {
        this.ul = <HTMLUListElement>this.htmlElement.querySelector(`#${this.id}ul`);
        this.contentDiv = new Div(null);
        this.appendChild(this.contentDiv);        
    }

    public addNavItem(navButtonSvgItemName: string, onClick: (parent: Control) => void, clearScreenOnClicked: boolean = true, spacing: number = 0, id?: string): void {
        // for (var i = 0; i < spacing; i++) {
        //     this.ul.innerHTML += "&nbsp;";
        // }
        var navLIElement = <HTMLLIElement>document.createElement("li");
        if (id != null) {
            navLIElement.id = `${this.id}_${id}`;
        }
        navLIElement.classList.add("nav-item");
        this.ul.appendChild(navLIElement);

        var navAElement = <HTMLAnchorElement>document.createElement("a");
        navAElement.classList.add("nav-link");
        navAElement.href = "#";
        if (id != null) {
            navAElement.id = `${this.id}_${id}link`;
        }
        navLIElement.appendChild(navAElement);
        navAElement.innerHTML = `<svg class="bi pe-none" width="24" height="24" role="img"><use xlink:href="#${navButtonSvgItemName}"></use></svg>`

        var onClickIdx: number = this.onClickArray.length;
        this.onClickArray.push(onClick);
        (<any>navAElement).eeleycid = onClickIdx;

        navAElement.onclick = () => {
            if (clearScreenOnClicked) {
                this.contentDiv.htmlElement.innerHTML = null;
            }
            this.onClickArray[onClickIdx](this.contentDiv);
        };
    }

    public setProperties(id: string, enable?: boolean, onClick?: (parent: Control) => void) {
        if (enable != null) {
            (<HTMLLIElement>this.ul.querySelector(`#${this.id}_${id}`)).style.display = enable ? null : 'none';
        }
        if (onClick != null) {
            var navAElement = <HTMLAnchorElement>this.ul.querySelector(`#${this.id}_${id}link`);
            this.onClickArray[(<number>(<any>navAElement).eeleycid)] = onClick;
        }
    }

    public switchTo(idx: number): void {
        this.contentDiv.htmlElement.innerHTML = null
        this.onClickArray[idx](this.contentDiv);
    }
}