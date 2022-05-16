import React from 'react';
import parse from 'html-react-parser';


const DescriptionComponent = (props) => {

  let checkDesciptionContent = (descObj) => {
    if(descObj && descObj.value) {
      return true;
    }
    return false;
  };

  if(props && !checkDesciptionContent(props.desktopDescription) && !checkDesciptionContent(props.mobileDescription)) {
    return <></>;
  }

  return (
    <div className={"review-description-container padding-left-right " + props.class}
          style={{width: (props.width) + '%' , textAlign: (props.postion == "center" ? "center" : props.textAlign)}}>
          <div className="review-desktop-desc">{parse(props.desktopDescription.value)}</div>
          <div className="review-mobile-desc">{parse(props.mobileDescription.value)}</div>

    </div>

  );
}

export default DescriptionComponent;