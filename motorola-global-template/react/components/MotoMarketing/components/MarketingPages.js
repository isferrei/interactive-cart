import React, { Suspense } from "react";
import { Spinner } from "vtex.styleguide";
import { stringToCardMapper } from "../../ComponentRenderer/components/ComponentMap.js";
import { commonProductLogic, imagePath } from "../../ComponentRenderer/components/CommonProductLogic/index";

import "../../ComponentRenderer/common/css/slick.global.css";
import "../../ComponentRenderer/common/css/slick-theme.global.css";

const MarketingPages = (props) => {

  commonProductLogic('MotoMarketing', props.heroComponentImageSrc);

  if (Object.keys(props).length > 0 && props.jsonObj) {
    return (
      <div className="basic-cards">
        {props.jsonObj.map((output, i) => {
          const cardToBePicked =
            output &&
            output.card_name &&
            stringToCardMapper[output.card_name];
          if (cardToBePicked) {
            return <CallComponent renderComponent={cardToBePicked} key={i} componentData={output.contents}></CallComponent>
          }
          return <></>;
        })}
      </div>
    );
  }
  else {
    return <></>;
  }
}

function CallComponent({renderComponent, i, componentData}) {
  const ComponentName = renderComponent;
  return (
      <Suspense
        key={i}
        fallback={
          <center>
            <Spinner />
          </center>
        }
      >
        <ComponentName key={i} data={componentData} />
      </Suspense>
  );
}

export default MarketingPages;