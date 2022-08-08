import React, { Component } from "react";
import "./MotoGiftWithPurchaseBanner.global.css"

class MotoGiftWithPurchaseBanner extends React.Component {

    static schema = {
        title: "Gift with Purchase Banner",
        description: "Gift with Purchase Banner",
        type: "object",
        properties: {
            gwpBanerImage: {
                title: "Gift with Purchase Banner Image",
                type: "string",
                description: "Gift with Purchase Banner Image",
                widget: {
                    'ui:widget': 'image-uploader',
                  }
            },
            gwpBanerImageAltText:  {
                default: "",
                title: "Banner Image alt text",
                type: "string"
              },
            gwpdescription: {
                title: "Description",
                type: "string",
                default: ""
            },
            gwpdescriptionSubHead: {
                title: "Description sub head",
                type: "string",
                default: ""
            }
        }
    }

   render() {
    const {gwpBanerImage,gwpBanerImageAltText,gwpdescription,gwpdescriptionSubHead} = this.props;
       return (
        <>
        <div className="gwp-banner">
        <div className="gwp-banner-background">
          <img src={gwpBanerImage} alt={gwpBanerImageAltText ? gwpBanerImageAltText : gwpBanerImage}/>
        </div>
        <div className="description-container">
        {gwpdescription ? (
              <div
                className="gwp-banner-description"
                dangerouslySetInnerHTML={{ __html: gwpdescription }}
              ></div>
            ) : null}
        {gwpdescriptionSubHead ? (
              <div
                className="gwp-banner-description-sub-head"
                dangerouslySetInnerHTML={{ __html: gwpdescriptionSubHead }}
              ></div>
            ) : null}
        </div>
        </div>
        </>
    )   
}
}

export default MotoGiftWithPurchaseBanner

