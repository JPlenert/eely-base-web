import { h, Component } from "../../features/preact";
import { ModalController } from './modalController';
import './modal.css';

// Types for props
interface ModalBoxProps {
    title: string;
    hasClose?: boolean;
};

// Types for state
interface ModalBoxState {};

export class ModalBox extends Component<ModalBoxProps, ModalBoxState>{

    constructor(props: ModalBoxProps){
        super(props);
    }

    static show(title: string, content: string, hasClose: boolean) : void{
        ModalController.get()?.addModal(<ModalBox title={title} hasClose={hasClose}>{content}</ModalBox>);
    }

    // if (false)
    //     htmlString += `<div class="modal-footer"> <div>Buttons</div> </div>`
    render() {
        return(
            <div class="modal-frame"> 
                <div class="modal-container"> 
                    <div class="modal-header"> 
                        <h1 class="modal-title fs-6">{this.props.title}</h1>
                        {this.props.hasClose && <button type="submit" class="btn-close" onClick={() => ModalController.get()?.removeModal(this) }></button>}
                        </div> 
                    <div class="modal-body"> 
                        <div>{this.props.children}</div> 
                    </div>
                </div>
            </div>
        );
    }
}
