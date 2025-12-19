import { getGlobalId } from "../../features/helper/uniqueId";
import { h, Component, Fragment } from "../../features/preact";
import { FormFrame } from "./formFrame";
import { FormBase } from "./formBase";

export class FormDropDownItem{
    public value: string | number;
    public display: string;

    constructor(display: string, value?: string | number) {
        this.display = display;
        if (value != null) {
            this.value = value;
        }
        else {
            this.value = display;
        }
    }
}

export interface FormDropDownProps {
    headline: string;
    placeHolder?: string;
    helpInfo?: string;
    bindBase?: any;
    bindPath?: string,
    value?: string;
    onChange?: (newValue: string | number) => void;
    items: FormDropDownItem[];

    additionalButtonSvg?: string;
    onAddtionalButtonClicked?: (value: string | number) => void;
};

export class FormDropDown extends FormBase<FormDropDownProps, {}>{

    private labelId : string = `label_${getGlobalId()}`;
    private inited: boolean = false;
    private currentValue? : string | number;

    public get value() : string | undefined { return this.value; }
    public set value(v: string) { this.currentValue = v }

    constructor(props?: FormDropDownProps){
            super(props);
        if (this.props.bindBase != null){
            this.bind(this.props.bindBase, this.props.bindPath);
        }
    }
    render(){   
        if (!this.inited) {
            if (this.props.value == null && this.props.items != null && this.props.items.length > 0){
                this.currentValue = this.props.items[0].value;
            }
            else{
                this.currentValue = this.getInitialValue(this.props.value);
            }
            this.inited = true;
        }

        var select : h.JSX.Element= (<>
                <select class="form-control" id={this.labelId} value={this.currentValue} 
                 onChange={(e) => { 
                    this.currentValue = e.currentTarget.value; 
                    this.setChangedValue(this.currentValue, this.props.onChange);
                }}>

                    {this.props.items.map(a => { 
                        if (this.currentValue != null && this.currentValue == a.value) {
                            return (<option value={a.value} selected>{a.display}</option>)
                        }
                        else {
                            return (<option value={a.value}>{a.display}</option>)
                        }
                        } ) }
                </select>
        </>);

        if (this.props.additionalButtonSvg != null){
            select = (
                <p style="display: flex">   
                    {select}
                    <a class="nav-link" id="${this._id}_btn" href="#" onClick={ (e) => {
                        this.props?.onAddtionalButtonClicked(this.currentValue);
                        }
                    }>
                        <svg class="bi pe-none" width="24" height="24" role="img" aria-label="Dashboard">
                            <use xlink:href={`#${this.props.additionalButtonSvg}`}></use>
                        </svg>
                    </a>
                </p>
            );
        }

        return (
            <FormFrame headline={this.props.headline} helpInfo={this.props.helpInfo} labelId={this.labelId}>   
             {select}         
            </FormFrame>
        );
    }
}
