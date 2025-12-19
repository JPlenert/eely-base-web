import { getGlobalId } from "../../features/helper/uniqueId";
import { h, Component, createRef } from "../../features/preact";
import { FormFrame } from "./formFrame";
import { FormBase } from "./formBase";

// Types for props
export interface FormInputProps {
    headline: string;
    bindBase?: any;
    bindPath?: string,
    placeHolder?: string;
    helpInfo?: string;
    value?: string;
    setValue?: (newValue: string) => void;
};

export class FormInput extends FormBase<FormInputProps, {}>{

    private labelId : string = `label_${getGlobalId()}`;
    private inputRef = createRef<HTMLInputElement>();

    constructor(props?: FormInputProps){
        super(props);
        if (this.props.bindBase != null){
            this.bind(this.props.bindBase, this.props.bindPath);
        }
    }

    public get value() : string | undefined {
        if (this.bindBase != null) 
            return this.getBindValue();
        
        return this.inputRef.current?.value; }
    public set value(v: string) { this.inputRef.current!.value = v }

    render() {
        let helpLine = [];

        return (
            <FormFrame headline={this.props.headline} helpInfo={this.props.helpInfo} labelId={this.labelId}>
                <input ref={this.inputRef} type="text" class="form-control" id={this.labelId} placeholder={this.props.placeHolder} value={this.getInitialValue(this.props.value)} onChange={(e) => { this.setChangedValue(e.currentTarget.value, this.props.setValue)}}></input>
            </FormFrame>
        );
    }
}
