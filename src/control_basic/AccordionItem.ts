// Eelybase - (c) 2022-24 by Joerg Plenert | https://eely.eu
class AccordionItem extends Control {
    protected headerText: string;
    protected button: HTMLButtonElement;
    protected body: HTMLDivElement;

    constructor(headerText: string) {
        super();

        this.headerText = headerText;
    }

    protected getHtml(): string {
        return `<div class="accordion-item">
          <h2 class="accordion-header">
            <button id="${this.id}Button" class="accordion-button">
                ${this.headerText}
            </button>
          </h2>
          <div>
            <div id="${this.id}Body" class="accordion-body">
            </div>
          </div>`;
    }

    public setHeaderText(headerText: string): void {
        this.button.innerText = headerText;
    }

    public toggleItem() {
        if (this.button.classList.contains("collapsed")) {
            this.openItem();
        }
        else {
            this.closeItem();
        }
    }

    public openItem() {
        this.button.classList.remove("collapsed");
        this.body.style.display = null;
    }

    public closeItem() {
        this.button.classList.add("collapsed");
        this.body.style.display = "none";
    }

    protected initControlLate(): void {
        this.appendElement = this.htmlElement.querySelector(`#${this.id}Body`);

        this.button = this.htmlElement.querySelector(`#${this.id}Button`) as HTMLButtonElement;
        this.button.classList.add("collapsed");
        this.body = this.htmlElement.querySelector(`#${this.id}Body`) as HTMLDivElement;
        this.body.style.display = "none";

        this.button.onclick = () => { this.toggleItem(); };
    }

    public setAdditionalButton(buttonSvg: string, onClick: () => void): void{
        var html = `<a id="${this._id}_addbtn" href="#" style="margin-left: auto; margin-right: 0"><svg class="bi pe-none" width="24" height="24" role="img"><use xlink:href="#${buttonSvg}"></use></svg></a>`;
        this.button.innerHTML += html;
        this.button.classList.add("accordion-button-no-left-margin");

        var addBtn = this.htmlElement.querySelector(`#${this.id}_addbtn`) as HTMLButtonElement;
        addBtn.addEventListener("click", (event) => { onClick(); event.stopImmediatePropagation(); return false; }, false);
    }
}
