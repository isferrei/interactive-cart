import { Component } from 'react'
import './MainFeatures.global.css'

class MainFeatures extends Component {
    static schema = {
      title: "Main features",
      description: "main festures desc",
      type: "object",
      properties: {
        showMainFeatures: {
          type: 'boolean',
          title: 'Show main features',
          default: false
        },
       featureheading: {
          type:'string',
          title:'featureheading',
          description:'featureheading'
        },
        features: {
          items: {
            title: 'Main features Block',
            type: 'object',
            properties: {
              itemtitle:{
              type: "string",
              title: "Title"
              },
             imageFile: {
                type: "string",
                title: "Image file",
                widget: {
                  "ui:widget": "image-uploader"
             }
          },
            },
          },
          title: 'Main Features items',
          type: 'array',
          default: [],
        }
      }
      }

    render () {
       const { showMainFeatures,features } = this.props;
        if (!showMainFeatures) {
          return null
        }
        return (
          <div className="mainfeatures">
           <div className="featureTitle">{this.props.featureheading}</div>
          <div className="featuresContent">
          {features &&
            features.length > 0 &&
            features.map(item => (
               <div className="loopContent" key={item.itemtitle}>
                 <div className="content-mainfeatures">
                  <div className="featureImg"><img src = {item.imageFile} alt={item.itemtitle} /></div>
                  <div className="featuteTitle">
                  {item.itemtitle}
                    </div>
                  </div>
                  </div>
            ))
            }
            </div>
        </div>
          )
       }
   }

    export default MainFeatures