// Eely-Base-Web - (c) 2022-26 by Joerg Plenert | https://eely.eu

import { ModalBox } from "../components/modal/modalBox";
import { h, Component, Fragment } from "../features/preact";
import SimpleCom from "../features/simpleCom/simpleCom";

// Types for props
interface EspResetDeviceProps {
    com: SimpleCom;
};
  
export class EspResetDevice extends Component<EspResetDeviceProps>{
    private doReset() : void{
        // No await here - will not respond!
        this.props.com.restart();
        ModalBox.show("Resetting ....", "Device will reset now.", false);
    }

    render() {
        return(
        <>
            Reset device
            <button type="submit" class="btn btn-primary" onClick={() => this.doReset()}>reset</button>
        </>);
    }
}