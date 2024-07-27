// Eelybase - (c) 2022-24 by Joerg Plenert | https://eely.eu
/// <reference path="../control_basic/Control.ts"/>
/// <reference path="../control_basic/ModalBox.ts"/>

class WifiSettings extends Control{

    protected getInnerHtml() : string { 
        return `
			Normally you'd connect your eely device to your network. Enter the name of your Wifi (SSID) and the password. 
			The device will reset and connect to your network after you press 'connect'.
			<br/>
			<br/>
			<div class="form-group">
				<label for="${this.id}wifiSSID">SSID</label>
				<input type="email" class="form-control" id="${this.id}wifiSSID" placeholder="SSID of your Wifi">
				<small id="${this.id}wifiSSIDHelp" class="form-text text-muted">SSID of your WiFi network where nemea should connect to. Please use a 2.4GHz Wifi.</small>
			</div>
			<div class="form-group">
				<label for="${this.id}wifiPassword">Password</label>
				<input type="password" class="form-control" id="${this.id}wifiPassword" placeholder="Password">
			</div>
			<br/>
			<button type="submit" class="btn btn-primary" id="${this.id}connect">connect</button>
		`;
        }

    protected initControlLate() {
        let button = <HTMLButtonElement>this.htmlElement.querySelector(`#${this.id}connect`);
        button.onclick = async ()  => { 

			let ssidEle = (window.document.getElementById(`${this.id}wifiSSID`) as HTMLInputElement).value;
			let passwordEle = (window.document.getElementById(`${this.id}wifiPassword`) as HTMLInputElement).value;

			console.info(`Calling wifi_settings_set ${ssidEle}:${passwordEle}`);
			await global.com.wifi_settings_set(ssidEle, passwordEle);
	        // No await here - will not respond!
			global.com.restart();

			global.body.appendChild(new ModalBox("Resetting ...", "Device will reset now and try to connect to the given Wifi.", false))};
    }
}