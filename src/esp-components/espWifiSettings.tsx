import { ModalBox } from "../components/modal/modalBox";
import { h, Component, Fragment, createRef } from "../features/preact/index.js";
import SimpleCom from "../features/simpleCom/simpleCom";

// Types for props
interface EspWifiSettingsProps {
    com: SimpleCom;
};
  
// Types for state
interface EspWifiSettingsState {};

export class EspWifiSettings extends Component<EspWifiSettingsProps, EspWifiSettingsState>
{
    private ssidRef = createRef<HTMLInputElement>();
    private pwdRef = createRef<HTMLInputElement>();

    private setWifi() : void{
        this.props.com.wifi_settings_set(this.ssidRef.current?.value!, this.pwdRef.current?.value!);
        // No await here - will not respond!
        this.props.com.restart();
        ModalBox.show("Resetting ....", "Device will reset now and try to connect to the given Wifi.", false);
    }

    render(){
        return(
            <>
                Normally you'd connect your eely device to your network. Enter the name of your Wifi (SSID) and the password. 
                The device will reset and connect to your network after you press 'connect'.
                <br/>
                <br/>
                <div class="form-group">
                    <label for="wifiSSID">SSID</label>
                    <input ref={this.ssidRef} type="email" class="form-control" id="wifiSSID" placeholder="SSID of your Wifi"/>
                    <small id="wifiSSIDHelp" class="form-text text-muted">SSID of your WiFi network where nemea should connect to. Please use a 2.4GHz Wifi.</small>
                </div>
                <div class="form-group">
                    <label for="wifiPassword">Password</label>
                    <input ref={this.pwdRef} type="password" class="form-control" id="wifiPassword" placeholder="Password"/>
                </div>
                <br/>
                <button type="submit" class="btn btn-primary" onClick={ () => this.setWifi() }>connect</button>
            </>
        )
    }
}