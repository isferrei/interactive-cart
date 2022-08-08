import React from "react";
import { imagePath } from "../../CommonProductLogic/index";
// Rendering Section images (after/before) as per tab clicks according to the device
function SectionImage(props) {
  const {
    activeTabIndex,
    opacity,
    isMobile,
    field_camera_slider,
    mobile_stacked
  } = props;

  const selectedSection = field_camera_slider[activeTabIndex];

  // Extracting respective section images like: Mobile or Desktop
  const getSectionConfig = () => {
    const CONSTANT = {
      get IMAGE_URL_PROP_NAME() {
        return isMobile
          ? ["field_cs_before_image_mobile", "field_cs_after_image_mobile"]
          : ["field_cs_before_image_desktop", "field_cs_after_image_desktop"];
      }
    };

    // Getting images URLs (full image path)
    const imageUrls = [];
    CONSTANT.IMAGE_URL_PROP_NAME.forEach(urlPropName => {
      imageUrls.push(`${imagePath}${selectedSection[urlPropName]}`);
    });

    // According device size added classes like: [Mobile, Tablet and Desktop]

    let deviceClassName = "";
    if (isMobile && mobile_stacked === "1") {
      deviceClassName = "cs-stacked-images";
    } else if (isMobile) {
      deviceClassName = `cs-mobile-images ${selectedSection.field_cs_image_position_mobile}`;
    } else {
      deviceClassName = `cs-desktop-images ${selectedSection.field_cs_image_position_desktop}`;
    }
    return { imageUrls, deviceClassName };
  };

  let beforeimagealttext;
  let afterimagealttext;
  if (isMobile) { 
    beforeimagealttext = selectedSection.field_cs_before_image_mobile_alt_text ? selectedSection.field_cs_before_image_mobile_alt_text : '';
    afterimagealttext = selectedSection.field_cs_after_image_mobile_alt_text ? selectedSection.field_cs_after_image_mobile_alt_text : '';
  } else {
    beforeimagealttext = selectedSection.field_cs_before_image_desktop_alt_text ? selectedSection.field_cs_before_image_desktop_alt_text : '';
    afterimagealttext = selectedSection.field_cs_after_image_desktop_alt_text ? selectedSection.field_cs_after_image_desktop_alt_text : '';
  }
  if (activeTabIndex >= 0 && selectedSection) {
    const { imageUrls, deviceClassName } = getSectionConfig();
    return (
      <div className={deviceClassName}>
        {imageUrls.map((url, index) =>
          index === 1 ? (
            <img key={index} style={{ opacity }} src={url} alt={afterimagealttext} />
          ) : (
            <img key={index} src={url} alt={beforeimagealttext} />
          )
        )}
      </div>
    );
  }
}

export default SectionImage;
