import { FormTextArea } from "../components/form/formTextArea";
import { ModalBox } from "../components/modal/modalBox";
import { EspConfigCubit, EspConfigState } from "../esp/espConfigCubit";
import { tryRegisterCubit } from "../features/cubit";
import { h, Component, Fragment, createRef } from "../features/preact";

// Types for props
interface EspJsonConfigEditorProps {
    configCubit: EspConfigCubit;
};

export class EspJsonConfigEditor extends Component<EspJsonConfigEditorProps>
{
    private textEditor = createRef<FormTextArea>();

    constructor(props: EspJsonConfigEditorProps)
    {
        super(props);
        if (props.configCubit.config == null)
            props.configCubit.getConfig();                
    }

    private async onApply(): Promise<void> {
        var jsonVal;

        try {
            jsonVal = JSON.parse(this.textEditor.current?.value!);
            this.props.configCubit.config.hodi = jsonVal;
        }
        catch (e) {
            ModalBox.show("Config", "Json configuration is invalid", true);
            return;
        }

        await this.props.configCubit.setConfig();
        this.props.configCubit.resetDeviceAndShowModalBox("Device will reset now and will start up with new configuration.");
    }

    render(){
        tryRegisterCubit<EspConfigCubit, EspConfigState>(this, this.props.configCubit);

        if (this.props.configCubit.state.state == EspConfigState.ConfigState_Reading || 
            this.props.configCubit.state.state == EspConfigState.ConfigState_Writing)
        {
            return (<>Working ....</>);
        }
        else if (this.props.configCubit.state.state == EspConfigState.ConfigState_Ready)
        {
            return (
                <>
                <FormTextArea ref={this.textEditor} headline="Json configuration" rows={30} value={JSON.stringify(this.props.configCubit.config?.hodi, null, 2)}></FormTextArea>
                <br/>
                <div style="float: right"><br/>
                    <button type="submit" class="btn btn-primary" onClick={ () => { this.onApply() } }>apply config</button>
                </div>                
            </>
            );    
        }
        else{
            return (<>Do reset</>);
        }        
    }
}