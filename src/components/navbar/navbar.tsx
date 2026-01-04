// Eely-Base-Web - (c) 2022-26 by Joerg Plenert | https://eely.eu

import { h, Component } from "../../features/preact";
import './navbar.css';

// Types for props
interface NavbarProps {
    headLineText: string;
    url: string;
    urlInfo: string;
};

// Types for state
interface NavbarState {};

export class Navbar extends Component<NavbarProps, NavbarState>{

    constructor(props: NavbarProps) {
        super(props);
      }

      private itemChanged(content: any) : void{
        console.log("Clicked");
      }

      render() {
        return (
        <div>        
            <nav class="navbar">
                <a class="navbar-logo" href="#">{this.props.headLineText}&nbsp;</a>
                    <div class="navbar-body" id="navbarNav">
                        <ul class="navbar-nav">{this.props.children}</ul>
                    </div>
                <a class="navbar-logo" href={this.props.url} target="_new">{this.props.urlInfo}&nbsp;</a>
            </nav>                        
        </div>);
      }
}

export default Navbar;