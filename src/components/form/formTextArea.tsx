import { getGlobalId } from "../../features/helper/uniqueId";
import { h, Component, createRef } from "../../features/preact";
import { FormFrame } from "./formFrame";

// Types for props
export interface FormTextAreaProps {
    headline: string;
    placeHolder?: string;
    helpInfo?: string;
    value?: string;
    rows?: number;
    setValue?: (newValue: string) => void;
};

export class FormTextArea extends Component<FormTextAreaProps>{

    private labelId : string = `label_${getGlobalId()}`;
    private inputRef = createRef<HTMLTextAreaElement>();

    public get value() : string | undefined { return this.inputRef.current?.value; }
    public set value(v: string) { this.inputRef.current!.value = v }

    render() {
        let helpLine = [];

        return (
            <FormFrame headline={this.props.headline} helpInfo={this.props.helpInfo} labelId={this.labelId}>
                <textarea ref={this.inputRef} class="form-control" id={this.labelId} placeholder={this.props.placeHolder} rows={this.props.rows} value={this.props.value} onChange={(e) => { if (this.props.setValue) this.props.setValue(e.currentTarget.value)}}></textarea>
            </FormFrame>
        );
    }
}
