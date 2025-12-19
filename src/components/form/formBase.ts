import { Component } from "../../features/preact";

export abstract class FormBase<P, S> extends Component<P, S>{

    protected bindBase : any;
    protected bindPath: string[];
    protected bindObject: any;

    protected getInitialValue(value : any) : any{
        if (this.bindBase != null)
            return this.getBindValue();
        return value;
    }

    protected setChangedValue(value : any,  setValue?: (string) => void){
        if (this.bindPath != null)
            this.setBindValue(value);

        if (setValue != null)
            setValue(value);
    }

    protected setBindValue(value: any){
        if (this.bindObject == null){
            this.bindObject = this.bindBase;
            for (var i :number = 0; i<this.bindPath.length-1; i++){
                if (this.bindObject[this.bindPath[i]] == null)
                    this.bindObject[this.bindPath[i]] = {};
                this.bindObject = this.bindObject[this.bindPath[i]];
            }
        }
        this.bindObject[this.bindPath[this.bindPath.length-1]] = value;
    }

    protected getBindValue(): any{
        if (this.bindObject == null){
            var itemObject : any = this.bindBase;

            for (var i :number = 0; i<this.bindPath.length-1; i++){
                if (itemObject[this.bindPath[i]] == null)
                    return null;
                itemObject = itemObject[this.bindPath[i]];
            }
            this.bindObject = itemObject;
        }
        return this.bindObject[this.bindPath[this.bindPath.length-1]];
    }

    protected bind(base: any, path: string){
        this.bindBase = base;        
        this.bindPath = path.split('.');
        this.bindObject = null;
    }
}