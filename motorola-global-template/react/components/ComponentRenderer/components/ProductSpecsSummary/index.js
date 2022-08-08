import React,{ Component } from "react";
import "./productSpecsSummary.global.css";
import {imagePath} from "../../components/CommonProductLogic/index";
import LazyLoad from 'react-lazyload';

class ProductSpecsSummary extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const prodSpecStyle = {
            wrapperBackground:{
                backgroundColor:"#"+this.props.data.pss_background_color
            },
            borderStyle:{
                borderColor:"#"+this.props.data.border_color,
                color:"#"+this.props.data.pss_text_color
            },
            textStyle:{
                color:"#"+this.props.data.pss_text_color
            }
        }
        return(
            <div className="prod-specs-summary" style={prodSpecStyle.wrapperBackground}>
                <div className="prod-specs-items">
                    <div className="prod-specs-container">
                        <p className="prod-specs-heading" style={prodSpecStyle.textStyle} dangerouslySetInnerHTML={{ __html: this.props.data.pss_title }}></p>
                    </div>
                    <div className="prod-specs-wrapper row">
                        { this.props.data.pss_columns.map((specItem,index) => (
                            <div className="prod-specs-item" key={index}>
                                <div className="prod-specs-logo">
                                    { specItem.pssc_image ?
                                        <LazyLoad
                                          offset={-100}
                                          once
                                          placeholder={<img className="prod-specs-lazyload-default-img" src={imagePath + "Lazy-Load-Square-batwing-03.png"} />}
                                        >
                                            <img src={imagePath + specItem.pssc_image} alt={specItem.pssc_image_alt_text} /></LazyLoad> : null }
                                </div>
                                <div className="prod-specs-desc" style={prodSpecStyle.borderStyle} dangerouslySetInnerHTML={{ __html: specItem.pssc_description.value }}></div>
                            </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default ProductSpecsSummary