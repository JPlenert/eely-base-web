import { h, Component, Fragment, createRef } from "../../features/preact";
import { EspEDeviceInfo } from "./espEDeviceConfig";

export interface EspEDeviceListProps{
    list: Array<EspEDeviceInfo>;
}

export class EspEDeviceList extends Component<EspEDeviceListProps>
{
    render()
    {
        let container = [];

        if (this.props.list.length == 0) {
            container.push(<tr><td colspan={4}>no device!</td></tr>);
        }
        else
        {
            var no : number = 1;
            this.props.list.forEach(element => {

                var status :string;
                if (element.device_last_error == "")
                    status = "OK";
                else
                    status = element.device_last_error;

                container.push(<tr>
                    <th scope="row">{no}</th>
                    <td>{element.device_name}</td>
                    <td>{element.device_id}</td>
                    <td>{status}</td>
                    </tr>);

                no++;
            });
        }

        return (
            <>
                <div class="row row-header"><div class="col row-header-content">Devices</div></div>
                <table class="table table-striped">
                <thead><tr><th scope="col">#</th><th scope="col">Name</th><th scope="col" >Id</th><th scope="col">Status</th></tr></thead>
                <tbody>
                    {container}
                </tbody>
                </table>
            </>
        )
    }
}