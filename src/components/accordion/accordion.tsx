// Eely-Base-Web - (c) 2022-26 by Joerg Plenert | https://eely.eu

import { h, Component } from "../../features/preact";
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