import { h, render, FunctionComponent, Component } from "../../features/preact";
import './accordion.css';

// Types for props
interface AccordionProps {};
  
// Types for state
interface AccordionState {};
  
export class Accordion extends Component<AccordionProps, AccordionState>{
    constructor(props: AccordionProps) {
        super(props);
      }

      render() {
        return <div class="accordion">{this.props.children}</div>;
      }
}

export default Accordion;