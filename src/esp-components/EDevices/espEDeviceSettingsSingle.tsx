// Eely-Base-Web - (c) 2022-26 by Joerg Plenert | https://eely.eu

import { h, Component, Fragment } from "../../features/preact";
import { EspEDeviceConfig, EspEDeviceShellyConfig } from "./espEDeviceConfig"
import { EspEDeviceShellySettings } from "./espEDeviceShellySettings"
import { FormDropDown, FormDropDownItem } from "../../components/form/formDropDown"
import { EspEDeviceTypes } from "./espEDeviceTypes";
import { EspConfigCubit, EspConfigState } from "../../esp/espConfigCubit"
import { tryRegisterCubit } from "../../features/cubit";

export interface EspEDeviceSettingsSingleProps{
    configCubit: EspConfigCubit;
    typeFilter?: Array<string>;
}

export class EspEDeviceSettingsSingle extends Component<EspEDeviceSettingsSingleProps>
{
    private ddItems : Array<FormDropDownItem>;
    private _devicesList?: Array<EspEDeviceConfig>;

    constructor(props: EspEDeviceSettingsSingleProps)
    {
        super(props);

        this.ddItems = EspEDeviceTypes.getDDItems(props.typeFilter);
        props.configCubit.getConfig();
    }

    private onDDChange(value:string): void{
        if (this._devicesList == null)
            this._devicesList = [];

        if (this._devicesList.length == 0)
            this._devicesList.push({ name: "new", type: value });
        else
            this._devicesList[0].type = value;
        this.setState({});
    }

    private async onApply(): Promise<void> {
        this.props.configCubit.config.hodi.devices = this._devicesList;
        await this.props.configCubit.setConfig(this.props.configCubit.config);

        this.props.configCubit.resetDeviceAndShowModalBox("Device will reset now and will start up with new configuration.");
    }

    render() {
        tryRegisterCubit<EspConfigCubit, EspConfigState>(this, this.props.configCubit);
        if (this._devicesList == null && this.props.configCubit.config != null){
            this._devicesList = [ ...this.props.configCubit.config.hodi.devices];
        }

        if (this.props.configCubit.state.state == EspConfigState.ConfigState_Reading || 
            this.props.configCubit.state.state == EspConfigState.ConfigState_Writing)
        {
            return (<>Working ....</>);
        }
        else if (this.props.configCubit.state.state == EspConfigState.ConfigState_Ready)
        {
            var ddType : string | undefined;

            if ((this._devicesList?.length ?? 0) > 0) {
                ddType = this._devicesList![0].type;
            }

            return (
                <>
                    <FormDropDown headline="Meter type" value={ddType} items={this.ddItems} onChange={ (val) => this.onDDChange(val as string) } />
                    { ddType != null && <EspEDeviceShellySettings config={this._devicesList![0] as EspEDeviceShellyConfig}/> }
                    <button type="submit" class="btn btn-primary" onClick={() => this.onApply()}>apply</button>
                </>
            );    
        }
        else{
            return (<>Do reset</>);
        }
    }
}
