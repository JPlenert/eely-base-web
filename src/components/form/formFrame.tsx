import { h, Component, Fragment, createRef } from "../../features/preact";

// Types for props
interface FormFrameProps {
    labelId: string;
    headline: string;
    helpInfo?: string;
};

export class FormFrame extends Component<FormFrameProps>{
    render() {
        let helpLine = [];

        if (this.props.helpInfo){
            helpLine.push(<small class="form-text text-muted">{this.props.helpInfo}</small>);
        }

        return (
            <div class="form-group">
                <label for={this.props.labelId}>{this.props.headline}</label>
                {this.props.children}
                {helpLine}
            </div>    
        );
    }

}
