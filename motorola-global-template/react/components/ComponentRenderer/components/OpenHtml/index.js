import React,{Component} from "react";
import {urlPath} from "../../common/js/globalConstants.js"
import ReactHtmlParser from "html-react-parser"
import Script from 'react-load-script';

class OpenHtml extends Component{
    constructor(props){
        super(props);
        this.state ={
            scriptLoaded:false
        }
    }

    loadcssFile(){
        if(this.props){
            const { oh_header_css } = this.props.data;
            if (oh_header_css) {
                return <link rel="stylesheet" type="text/css" href={urlPath + oh_header_css}></link>;
            }
        }
        return null;
    }

    loadJSFile(){
        if(this.props){
            const { oh_footer_js } = this.props.data
            if (oh_footer_js) {
                return <script type="text/javascript" defer src={urlPath + oh_footer_js}></script>;
            }
        }
        return null;
    }
    handleScriptCreate = () => {
        this.setState({ scriptLoaded: false });
    }

    handleScriptError = () => {
        this.setState({ scriptError: true });
    }

    handleScriptLoad = () => {
        this.setState({ scriptLoaded: true });
    }

    render(){
        return(
            <div className="open-html" style={{ backgroundColor: `#${this.props.data.oh_bg_color}`, color: `#${this.props.data.oh_text_color}` }}>
                { this.loadcssFile() }
                <Script
                url={urlPath + this.props.data.oh_footer_js}
                onCreate={this.handleScriptCreate}
                onError={this.handleScriptError}
                onLoad={this.handleScriptLoad}
                />
                <div className="oh-content">{ ReactHtmlParser(this.props.data.oh_html) }</div>
            </div>
        )
    }
}

export default OpenHtml