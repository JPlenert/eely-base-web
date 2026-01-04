// Eely-Base-Web - (c) 2022-26 by Joerg Plenert | https://eely.eu

import { h, Component } from "../../features/preact";
import './navbar.css';

// Types for props
interface NavbarItemProps {
    symbolName: string;
    onClick: () => void;
    clearScreenOnClicked?: boolean;
    spacing? :number;    
};
  
// Types for state
interface NavbarItemState {};

export class NavbarItem extends Component<NavbarItemProps, NavbarItemState>{

    constructor(props: NavbarItemProps) {
        super(props);        
      }

      render() {
        return (
            <li class="nav-item">
                <a class="nav-link" href="#" onClick={() => this.props.onClick() }>
                    <svg class="bi pe-none" width="24" height="24" role="img"><use xlink:href={`#${this.props.symbolName}`}></use></svg>                    
                </a>
            </li>);
      }
}

export default NavbarItem;