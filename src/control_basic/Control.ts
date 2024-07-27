// Eelybase - (c) 2022-24 by Joerg Plenert | https://eely.eu
class Control{
    protected _htmlElement: HTMLElement;
    protected _id: string;
    protected _parentControl: Control;

    // Element where the 'appendChild' methods appends to
    protected appendElement: HTMLElement;

    protected get containerType() : string { return "div"; }
    public get htmlElement() : HTMLElement { return this._htmlElement; }
    public get id() : string { return this._id; }
    public get parentControl() : Control { return this._parentControl; }
    //public get id() : string { return this._id; }

    constructor(){
        this._id = global.getNextControlId();
    }

    // Maybe usefull?
    // public preInject() : String{
    //     return `<div id="${this._id}"></div>`;
    // }
    // public inject(parent: Control){
    //     let old = parent.htmlElement.querySelector(`#${this._id}`);
    //     let newE = this.initControl();
    //     //old.parentElement.replaceChild(old, newE);
    //     old.replaceWith(newE);
    // }

    // Internal initialization of the control. Returns the HTMLElement that can be used by the caller to add additional Elements
    // Should return null if no overload should add additional elements
    protected initControl() : HTMLElement{
        
        // Check if already initialized
        if (this._htmlElement != null)
            return this._htmlElement;

        let html = this.getHtml();
        if (html != null) {
            let templ = document.createElement("div");
            templ.innerHTML = html;
            // Copy out the item and make it the element - if it is only one!
            if (templ.children.length == 1)
                this._htmlElement = templ.firstChild as HTMLElement;
            else
                // Else use the div and all items
                this._htmlElement = templ as HTMLElement;
        }
        else {
            let innerHtml = this.getInnerHtml();
            if (innerHtml != null) {
                this._htmlElement = document.createElement(this.containerType);
                this._htmlElement.innerHTML = innerHtml;
            }
            else {
                this._htmlElement = this.getElement();
            }
            if (this._htmlElement == null)
                this._htmlElement = document.createElement("div");
        }

        this._htmlElement.id = this._id;

        (<any>this._htmlElement).enmea = this;

        this.initControlLate();

        return this._htmlElement;
    }

    public setVisibility(visible : boolean) : void{
        this._htmlElement.hidden = !visible;
    }

    protected initControlLate() : void{
    }

    public appendChild(child: Control){
        child._parentControl = this;
        child.initControl();
        if (this.appendElement != null)
            this.appendElement.appendChild(child.htmlElement);
        else
            this._htmlElement.appendChild(child.htmlElement);
    }

    public insertBeforeChild(newChild: Control, oldChild: Control)
    {
        newChild._parentControl = this;
        newChild.initControl();
        if (this.appendElement != null)
            this.appendElement.insertBefore(newChild.htmlElement, oldChild._htmlElement);
        else
            this._htmlElement.insertBefore(newChild.htmlElement, oldChild._htmlElement);
    }

    // Returns the Html-String of the control.
    // String must have one overarching element, that will be the htmlElement and hold the id.
    protected getHtml() : string { return null; }

    // Returns the InnerHtml-String of the control.
    // An overarching element of containerType will be created and will hold the id.
    protected getInnerHtml() : string { return null; }

    // Returns the element of the control.
    // This element will hold the id.
    protected getElement() : HTMLElement { return null; }
};