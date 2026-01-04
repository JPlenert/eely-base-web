// Eely-Base-Web - (c) 2022-26 by Joerg Plenert | https://eely.eu

import { h,  Component } from "../../features/preact";
import './accordion.css';

// Types for props
interface AccordionItemProps {
    headerText: string,
    tag?: object | number,
    collapsed?: boolean, 
    collapsedInitial?: boolean,
    collapsedChange?: (collapsed : boolean) => void;
    additionalButtonSvg?: string;
    onAdditionalButtonClicked?: (tag? : object | number) => void;
};
  
// Types for state
export interface AccordionItemState {
    collapsed: boolean;
};
  
export class AccordionItem extends Component<AccordionItemProps, AccordionItemState>{
    readonly COLLAPSED = 'collapsed';
    buttonClass: string;

    constructor(props: AccordionItemProps) {
        super(props);

        if (this.props.collapsed === undefined) {
          this.state = { collapsed: this.props.collapsedInitial ?? true };
        }

        this.buttonClass = "accordion-button ";
      }

      private setLocalOrRemoteState(collapsed : boolean) : void{
        if (this.props.collapsed === undefined) {
          this.setState({ collapsed: collapsed });
        }
        else {
          this.props.collapsedChange!(collapsed);
        }
      }

      private getLocalOrRemoteState() : boolean{
        return this.props.collapsed ?? this.state.collapsed;
      }

      toggleItem() : void{
        this.setLocalOrRemoteState(!this.getLocalOrRemoteState());
      }

      openItem() : void {
        this.setLocalOrRemoteState(false);
      }

      closeItem() : void {
        this.setLocalOrRemoteState(true);
      }

      onClick() {
        this.toggleItem();
      }

      render() {
        let container = [];

        if (this.props.additionalButtonSvg != null){
          container.push(<a href="#" style="margin-left: auto; margin-right: 0" onClick={ (e)=> { if (this.props.onAdditionalButtonClicked != null) this.props.onAdditionalButtonClicked(this.props.tag); e.stopPropagation()}} ><svg class="bi pe-none" width="24" height="24" role="img"><use xlink:href={`#${this.props.additionalButtonSvg}`}></use></svg></a>);
        }

        return (<div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class={`accordion-button ${this.getLocalOrRemoteState() ? "collapsed" : ""} ${container.length > 0 ? "accordion-button-no-left-margin":""}`} onClick={() => this.onClick()}>
                            {this.props.headerText}
                            {container}
                        </button>
                    </h2>
                    <div>
                        <div class="accordion-body" style={this.getLocalOrRemoteState() ? 'display:none' : ''}>
                            {this.props.children}
                        </div>
                    </div>
                </div>);
      }
}

export default AccordionItem;