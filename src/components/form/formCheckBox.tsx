import { getGlobalId } from "../../features/helper/uniqueId";
import { h, Component, createRef } from "../../features/preact";
import { FormFrame } from "./formFrame";
import { FormBase } from "./formBase";

// Types for props
export interface FormCheckBoxProps {
    headline: string;
    bindBase?: any;
    bindPath?: string,
    helpInfo?: string;
    value?: boolean;
    setValue?: (newValue: boolean) => void;
};

export class FormCheckBox extends FormBase<FormCheckBoxProps, {}>{

    private labelId : string = `label_${getGlobalId()}`;
    private inputRef = createRef<HTMLInputElement>();

    public get value() : boolean | undefined { return this.inputRef.current?.checked; }
    public set value(v: boolean) { this.inputRef.current!.checked = v }
    
    constructor(props?: FormCheckBoxProps){
        super(props);
        if (this.props.bindBase != null){
            this.bind(this.props.bindBase, this.props.bindPath);
        }
    }

    render() {
        let helpLine = [];

        return (
            <FormFrame headline={this.props.headline} helpInfo={this.props.helpInfo} labelId={this.labelId}>
                <input ref={this.inputRef} type="checkbox" id={this.labelId} checked={this.getInitialValue(this.props.value)} onChange={(e) => { this.setChangedValue(e.currentTarget.value == "on", this.props.setValue)}}></input>
                <br/>
            </FormFrame>
        );
    }
}
