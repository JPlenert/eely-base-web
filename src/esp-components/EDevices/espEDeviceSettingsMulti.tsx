// Eely-Base-Web - (c) 2022-26 by Joerg Plenert | https://eely.eu

import { h, Component, Fragment } from "../../features/preact";
import { EspEDeviceShellyConfig } from "./espEDeviceConfig"
import { EspEDeviceShellySettings } from "./espEDeviceShellySettings"
import { FormDropDown, FormDropDownItem } from "../../components/form/formDropDown"
import { EspEDeviceTypes } from "./espEDeviceTypes";
import { EspConfigCubit, EspConfigState } from "../../esp/espConfigCubit"
import { tryRegisterCubit } from "../../features/cubit";
import Accordion from "../../components/accordion/accordion";
import AccordionItem from "../../components/accordion/accordionItem";
import { SymbolTrash } from "../../components/symbols/symbolTrash";
import { SymbolPlus } from "../../components/symbols/symbolPlus";

export interface EspEDeviceSettingsMultiProps{
    configCubit: EspConfigCubit;
    typeFilter?: Array<string>;
}

export class EspEDeviceSettingsMulti extends Component<EspEDeviceSettingsMultiProps>
{
    private ddItems : Array<FormDropDownItem>;
    private _openedItem?: number;
    
    constructor(props: EspEDeviceSettingsMultiProps)
    {
        super(props);

        this.ddItems = EspEDeviceTypes.getDDItems(props.typeFilter);
    }

    render() {
        tryRegisterCubit<EspConfigCubit, EspConfigState>(this, this.props.configCubit);

        var list = this.props.configCubit.config?.hodi?.devices;

        if (this.props.configCubit.state.state == EspConfigState.ConfigState_Ready)
        {
            let container = [];

            if (list == null || list == 0) {
                container.push(<tr><td colspan={4}>no device!</td></tr>);
            }
            else
            {
                var no : number = 1;
                list.forEach(element => {

                    container.push(
                        <AccordionItem headerText={`${element.name} (${element.type})`} additionalButtonSvg={SymbolTrash.href} tag={no-1}
                            onAdditionalButtonClicked={(tag?: object) => { this.props.configCubit.config?.hodi?.devices.splice(tag, 1); this.setState({})}} 
                            collapsedInitial={this._openedItem == null || this._openedItem != no}>

                            <EspEDeviceShellySettings config={element as EspEDeviceShellyConfig} onDescriptionChanged={() => {this.setState({});}}/>

                        </AccordionItem>
                        );

                    no++;
                });
            }

            this._openedItem = null

            return (
            <>
                <Accordion>{container}</Accordion>
                <br/>
                <FormDropDown headline="Add new item" items={this.ddItems} onChange={ (val) => {} } additionalButtonSvg={SymbolPlus.href} 
                    onAddtionalButtonClicked={ (val) => {
                        if (list == null){
                            // Ensure structue
                            if (this.props.configCubit.config.hodi == null)
                                this.props.configCubit.config.hodi = {};
                            if (this.props.configCubit.config.hodi.devices == null)
                                this.props.configCubit.config.hodi.devices = [];
                            list = this.props.configCubit.config.hodi.devices;
                        }
                        list.push({ type: val, name: 'new', access: 'direct'} as EspEDeviceShellyConfig);
                        this._openedItem = list.length;
                        this.setState({});
                    } }
                    />
            </>
            );
        }
        else
        {            
            return (<>Working ....</>);
        }
    }
}