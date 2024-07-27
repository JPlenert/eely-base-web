// Eelybase - (c) 2022-24 by Joerg Plenert | https://eely.eu
abstract class FormControl extends Control{
    protected headline: string;
    protected helpInfo: string;
    
    protected bindObject : any;
    protected bindItemNames : string[];
    protected editorElement : HTMLInputElement;
    public onChanged : (ctl: FormControl) => void;

    constructor(headline: string, helpInfo: string = null){
        super();

        this.headline = headline;
        this.helpInfo = helpInfo;
    }

    protected abstract getEditElementHtml(id: string) : string;

    protected getHtml(): string {
        var html: string;

        html = `<div class="form-group"><label for="${this.id}_edt">${this.headline}</label>`;
        html += this.getEditElementHtml(`${this.id}_edt`);
        if (this.helpInfo != null)
            html += `<small id="${this.id}_helpInfo" class="form-text text-muted">${this.helpInfo}</small>`;
        
        return html;
    }

    protected initControlLate() : void{
        this.editorElement = this._htmlElement.querySelector(`#${this.id}_edt`);
    }

    public setValue(data: any){
        this.editorElement.value = data;
    }

    public getValue() : any{
        return this.editorElement.value;
    }

    public bind(object: any, ...names: string[]){
        this.bindObject = object;        
        this.bindItemNames = names;

        var itemObject : any = object;

        names.every(name => {
            itemObject = itemObject[name];
            if (itemObject == null)
                return false;            
            return true;
        });
        
        if (itemObject != null)
            this.setValue(itemObject);

            this.editorElement.onchange = () => {  
            
            var itemObject : any = this.bindObject;
            for (var i :number = 0; i<this.bindItemNames.length-1; i++){
                if (itemObject[this.bindItemNames[i]] == null)
                    itemObject[this.bindItemNames[i]] = {};
                itemObject = itemObject[this.bindItemNames[i]];
            }

            itemObject[this.bindItemNames[this.bindItemNames.length-1]] = this.getValue(); 

            this.onChanged(this);
        };
    }
}