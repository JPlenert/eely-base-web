import { h, Component, Context } from "../../features/preact";
import { useContext } from "../../features/preact/hooks";
import { NavbarContext, NavbarContextValues, useNavbarContext } from "./navbarContext";
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
        let navBarContext= useNavbarContext();
        return (
            <li class="nav-item">
                <a class="nav-link" href="#" onClick={() => this.props.onClick() }>
                    <svg class="bi pe-none" width="24" height="24" role="img"><use xlink:href={`#${this.props.symbolName}`}></use></svg>                    
                </a>
                <NavbarContext.Consumer>
                    {t => <a></a> }
                </NavbarContext.Consumer>                    
            </li>);
      }
}

export default NavbarItem;
// <svg class="bi pe-none" width="24" height="24" role="img"><use xlink:href={this.props.navButtonSvgItemName}></use></svg> 