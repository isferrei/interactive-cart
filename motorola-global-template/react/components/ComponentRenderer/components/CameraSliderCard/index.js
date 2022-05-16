import React from "react";
import "./cameraSliderCard.global.css";
import { handleResize, debounce } from "../../common/js/deviceDetection";
import MobileStackedComponent from "./components/MobileStackedComponent";
import TabWithImageComponent from './components/TabsWithImageComponent'

class CameraSliderCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialData: [],
      deviceType: handleResize()
    };
  }

  componentDidMount() {
    // Extracting All Tabs data
    const { data: { field_camera_slider } } = this.props;
    
    // Providing "Label" and "Content" data as (Tab Name: Label, Tab Content: Content)
    const tabs = [];
    field_camera_slider.forEach(
      ({ field_cs_headline_tab, field_cs_headline, field_cs_body_copy }) => {
        tabs.push({
          label: field_cs_headline_tab,
          content: this.renderContent(field_cs_headline, field_cs_body_copy)
        });
      }
    );
 
    // Detecting detecting device (Mobile, Tablet and Desktop)
    window.addEventListener(
      "resize",
      debounce(() => {
        this.setState({ deviceType: handleResize() });
      }, 500)
    );

    this.setState({ initialData: tabs });
  }

  // Tab Content rendering
  renderContent = (title, content) => {
    const {deviceType: {isMobile}}= this.state;
    const {data:{ field_cs_content_box_position}} = this.props
    return(
    <>
      {(isMobile || field_cs_content_box_position === 'position-right') && title ? <div className="cs-content-box-headline">{title}</div> : ""} 
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </>)
  };

  render() {
    const { initialData, deviceType: { isMobile} } = this.state;
    const { data: { field_cs_mobile_stacked_toggle, field_cs_disable_the_slider } } = this.props;
    return (
      <>
        {isMobile && field_cs_mobile_stacked_toggle === "1"  ? (
          initialData && initialData.length > 0 && initialData.map((eachTabVal, index) => (
            <MobileStackedComponent key={index}
              activeTabIndex={index}
              tabContent={eachTabVal.content}
              data={this.props.data}
              isMobile={isMobile}
              isSlider={field_cs_disable_the_slider}/>
          ))) : (
            <TabWithImageComponent
              tabs={initialData}
              data={this.props.data}
              isMobile={isMobile}
              isSlider={field_cs_disable_the_slider}
            />
          )}
      </>
    );
  }
}

export default CameraSliderCard;