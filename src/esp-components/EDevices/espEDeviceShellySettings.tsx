// Eely-Base-Web - (c) 2022-26 by Joerg Plenert | https://eely.eu

import { FormInput } from "../../components/form/formInput";
import { FormDropDown, FormDropDownItem } from "../../components/form/formDropDown";
import { h, Component, Fragment } from "../../features/preact";

export interface EspEDeviceConfig{
    type: string;
    name: string;
}

export interface EspEDeviceShellyConfig extends EspEDeviceConfig{
    id: string;
    access: string;
    host: string;
    username: string;
    password: string;
}

export interface EspEDeviceShellySettingsProps{
    config: EspEDeviceShellyConfig;
    onDescriptionChanged?: () => void;
}

export class EspEDeviceShellySettings extends Component<EspEDeviceShellySettingsProps>
{
    constructor(props: EspEDeviceShellySettingsProps)
    {
        super(props);
        if (props.config.access == undefined){
            props.config.access = "direct";
        }
    }

    render() {
        let container = <></>;

        if (this.props.config.access == 'direct')
        {
            container = (
                <>
                <FormInput headline="Hostname" placeHolder="Name or IP address of the shelly device" value={this.props.config.host} setValue={(v) => this.props.config.host = v}></FormInput>
                <FormInput headline="Username" placeHolder="Username for the shelly device" value={this.props.config.username} setValue={(v) => this.props.config.username = v}></FormInput>
                <FormInput headline="Password" placeHolder="Password for the shelly device" value={this.props.config.password} setValue={(v) => this.props.config.password = v}></FormInput>    
                </>
            );
        }


        return (
        <>
            <FormInput headline="Name or description of device" placeHolder="Name or description" value={this.props.config.name} setValue={(v) => {this.props.config.name = v; this.props.onDescriptionChanged?.call(v); }}></FormInput>
            <FormInput headline="Id of the device" placeHolder="Series of number and characters (hex)" value={this.props.config.id} setValue={(v) => this.props.config.id = v}></FormInput>
            <FormDropDown headline="Access type" items={[new FormDropDownItem("Direct", "direct"), new FormDropDownItem("Shelly Cloud API", "cloudAPI") ]}  value={this.props.config.access} onChange={(val) => {this.props.config.access = val as string; this.setState({}); }}></FormDropDown>
            {container}
        </>);
    }
}