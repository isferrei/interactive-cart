import React, {  Component } from 'react';

class LocaleSwitcher extends Component{
    constructor(props){
        super(props);       
        this.state = { isActive: true,langCode:"en" };
        
    }

    handleClick = ()=>{
        this.setState({isActive: !this.state.isActive});
    }
    componentDidMount(){
        if(window.location){
            if(window.location.href.indexOf("www.motorola.ca/fr") > -1){
                this.setState({isActive:true,langCode:"fr"})
            }
        }
    }
 
    render(){
        return (
            <div className="vtex-locale-switcher-0-x-container w3 flex items-center justify-end ml2 mr3 relative">
                <div className="vtex-locale-switcher-0-x-relativeContainer relative">
                <button className="vtex-locale-switcher-0-x-button link pa0 bg-transparent bn flex items-center pointer mr3 c-on-base" onClick={() => this.handleClick()}>
                    <svg fill="none" width="16" height="16" viewBox="0 0 16 16" className=" vtex-locale-switcher-0-x-globeIcon" xmlns="http://www.w3.org/2000/svg" >
                        <use href="#mpa-globe" >
                        </use>
                    </svg>
                    <span className="vtex-locale-switcher-0-x-buttonText pl2 t-action--small order-1">{this.state.langCode}</span>
                </button>                        
                <ul className="vtex-locale-switcher-0-x-list absolute z-5 list top-1 w3 ph0 mh0 mt4 bg-base" hidden={this.state.isActive} >
                     {this.state.langCode == "en"?
                    <li role="link" tabindex="-1" className="vtex-locale-switcher-0-x-listElement t-action--small pointer f5 pa3 hover-bg-muted-5 tc">
                        <a href="https://www.motorola.ca/fr" className="vtex-locale-switcher-0-x-localeIdText w-100">fr</a>
                    </li>:""}
                    {this.state.langCode == "fr"?
                    <li role="link" tabindex="-1" className="vtex-locale-switcher-0-x-listElement t-action--small pointer f5 pa3 hover-bg-muted-5 tc">
                        <a href="https://www.motorola.ca/en" className="vtex-locale-switcher-0-x-localeIdText w-100">en</a>
                    </li>:""}
                </ul>
                </div>
            </div>
        )
    }
}

export default LocaleSwitcher;