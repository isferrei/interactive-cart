import React, { FC } from "react";

import { TImages } from "../typings";
import { imagePath } from "../../../ComponentRenderer/components/CommonProductLogic/index";

type ImagesProps = {
  className: string;
  images: TImages;
  classNameImages: {
    first: string;
    second: string;
    third: string;
    mobile: string;
    main: string;
  };
  isMobileImageFull: boolean;
};

const Images: FC<ImagesProps> = ({
  className,
  images: {
    desktop: { first, second, third },
    mobile
  },
  classNameImages,
  isMobileImageFull
}) => {
  return (
    <div
      className={`${className} flex images absolute vh-100 justify-center justify-between-l o-0 w-100`}
    >
      <img
        src={`${imagePath}${first.src}`}
        alt={first.text}
        className={`${classNameImages.first} ${classNameImages.main} first-image self-center dn db-l`}
      />
      <img
        src={`${imagePath}${second.src}`}
        alt={second.text}
        className={`${classNameImages.second} ${classNameImages.main} second-image self-center w-100 h-100 dn db-l z-2`}
      />
      <img
        src={`${imagePath}${third.src}`}
        alt={third.text}
        className={`${classNameImages.third} ${classNameImages.main} third-image dn db-l`}
      />
      <img
        className={`${classNameImages.mobile} self-center w-100 h-100 dn-l`}
        style={
          isMobileImageFull
            ? {}
            : {
              maxWidth: "312px",
              maxHeight: "480px"
            }
        }
        src={`${imagePath}${mobile.src}`}
        alt={mobile.text}
      />
    </div>
  );
};

export default Images;
