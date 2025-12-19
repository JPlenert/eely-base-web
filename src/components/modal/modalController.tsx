import { h, Component, Fragment } from '../../features/preact'

export class ModalController extends Component{
    private modalContainer: h.JSX.Element[] = [];
    private static globalModalComponent: ModalController | undefined = undefined;
    private index : number = 1;

    public addModal(newModal: h.JSX.Element) : void{
        this.modalContainer.push(newModal);
        this.setState({});
    }

    public removeModal(modal: Component) : void{       
        var foundItem = this.modalContainer.find(a => (a as any)._component === modal);
        if (foundItem != undefined){
            let idx = this.modalContainer.indexOf(foundItem);
            this.modalContainer.splice(idx, 1);
            this.setState({});
        }
    }

    static get() : ModalController | undefined{
        return ModalController.globalModalComponent;
    }

    render() {
        if (ModalController.globalModalComponent == undefined)
            ModalController.globalModalComponent = this;

        return (<>
            {this.modalContainer}
        </>);
    }
}
