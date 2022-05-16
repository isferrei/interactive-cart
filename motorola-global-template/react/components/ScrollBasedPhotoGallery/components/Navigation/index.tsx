import React, { FC } from "react";
import { IconCaret } from "vtex.store-icons";

import styles from "./Navigation.css";

type NavigationProps = {
  height: number;
  length: number;
  isMobileImageFull: boolean;
  classNameTopButton: string;
  classNameBottomButton: string;
};

const Navigation: FC<NavigationProps> = ({
  height,
  length,
  isMobileImageFull,
  classNameTopButton,
  classNameBottomButton
}) => {
  const scrollUp = () => {
    window.scrollBy(0, -(height / length));
  };

  const scrollDown = () => {
    window.scrollBy(0, height / length);
  };

  return (
    <section
      className={`${isMobileImageFull ? "pr6 pt3" : styles.notFullWidth
        } absolute bottom-0 right-0 flex flex-column-l items-center z-max pa8-l pb4`}
    >
      <button
        type="button"
        className={`${classNameTopButton} o-20 pa5-l pa3 br-100 bn flex pointer`}
        onClick={scrollUp}
      >
        <IconCaret size="19" color="#001328" orientation="up" />
      </button>
      <button
        type="button"
        className={`${classNameBottomButton} mt5-l ml3 ml0-l o-20 pa5-l pa3 br-100 bn flex pointer`}
        onClick={scrollDown}
      >
        <IconCaret size="19" color="#001328" orientation="down" />
      </button>
    </section>
  );
};

export default Navigation;
