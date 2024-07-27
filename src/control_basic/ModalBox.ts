// Eelybase - (c) 2022-24 by Joerg Plenert | https://eely.eu
/// <reference path="Control.ts"/>

class ModalBox extends Control{
    protected title: string;
    protected content: string;
    private hasClose: boolean;

    constructor(title: string, content: string, hasClose: boolean = true){
        super();

        this.title = title;
        this.content = content;
        this.hasClose = hasClose;
    }

    protected getHtml() : string { 
      var htmlString;

      htmlString = `<div class="modal-frame"> <div class="modal-container"> <div class="modal-header"> <h1 class="modal-title fs-5">${this.title}</h1>`;
      if (this.hasClose)
        htmlString += `<button type="button" id="${this.id}clbtn" class="btn-close"></button>`;
      htmlString += `</div> <div class="modal-body"> <div>${this.content}</div> </div>`;
      if (false)
        htmlString += `<div class="modal-footer"> <div>Buttons</div> </div>`
      htmlString += `</div></div>`;

      return htmlString;
    }

    protected initControlLate(): void {
      super.initControlLate();
      if (this.hasClose) {
          (<HTMLButtonElement>this._htmlElement.querySelector(`#${this._id}clbtn`)).onclick = () => { this.htmlElement.remove(); };
      }
  }


}