import { h, Component, Fragment } from "../../features/preact";
import { EspEDeviceConfig, EspEDeviceShellyConfig } from "./espEDeviceConfig"
import { FormDropDown, FormDropDownItem } from "../../components/form/formDropDown"
import { EspEDeviceTypes } from "./espEDeviceTypes";
import { EspEDeviceShellySettings } from "./espEDeviceShellySettings";

// EXAMPLE FOR USAGE OF LOCAL STATE!!!!


/*
                    <EspEDeviceSettingsSingle 
                        typeFilter={[ EspEDeviceTypes.TYPE_shelly_3em,  EspEDeviceTypes.TYPE_shelly_pro3em ]}
                        devicesListGetHandler={async () => {
                                let reply = await global.com.configGet();
                                return reply.hodi.devices;
                            }}
                        devicesApplyHandler={async (items) => {
                            let reply = await global.com.configGet();
                            reply.hodi.devices = items;
                            await global.com.configSet(reply);
                            }}
                    /> 
*/

export interface EspEDeviceSettingsSingle_LOCALSTATE_Props{
    devicesListGetHandler?: () => Promise<Array<EspEDeviceConfig>>;
    devicesApplyHandler?: (devList: Array<EspEDeviceConfig>) => Promise<void>;
    devicesList?: Array<EspEDeviceConfig>;
    typeFilter?: Array<string>;

}

export class EspEDeviceSettings_LOCALSTATE_Single extends Component<EspEDeviceSettingsSingle_LOCALSTATE_Props>
{
    private ddItems : Array<FormDropDownItem>;
    private apiCallInProgress: boolean;

    constructor(props: EspEDeviceSettingsSingle_LOCALSTATE_Props)
    {
        super(props);

        this.ddItems = EspEDeviceTypes.getDDItems(props.typeFilter);
        if (props.devicesListGetHandler != null)
        {
            this.apiCallInProgress = true;
            props.devicesListGetHandler().then(li => { this.props.devicesList = li; this.apiCallInProgress = false; this.setState({});});
        }
        else{
            this.apiCallInProgress = false;
        }
    }

    private onDDChange(value:string): void{
        if (this.props.devicesList == null)
            this.props.devicesList = [];

        if (this.props.devicesList.length == 0)
            this.props.devicesList.push({ name: "new", type: value });
        else
            this.props.devicesList[0].type = value;
        this.setState({});
    }

    private async onApply(): Promise<void> {
        if (this.props.devicesApplyHandler != null)
        {
            this.apiCallInProgress = true;
            this.setState({});
            await this.props.devicesApplyHandler(this.props.devicesList!);
            this.apiCallInProgress = false;
            this.setState({});
        }
    }

    render() {

        if (this.apiCallInProgress)
        {
            return (<>Ich arbeite!</>);

        }
        else
        {
            var ddType : string | undefined;

            if ((this.props.devicesList?.length ?? 0) > 0) {
                ddType = this.props.devicesList![0].type;
            }

            return (
                <>
                    <FormDropDown headline="Meter type" value={ddType} items={this.ddItems} onChange={ (val) => this.onDDChange(val) } />
                    { ddType != null && <EspEDeviceShellySettings config={this.props.devicesList![0] as EspEDeviceShellyConfig}/> }
                    <button type="submit" class="btn btn-primary" onClick={() => this.onApply()}>apply</button>
                </>
            );    
        }
    }
}
