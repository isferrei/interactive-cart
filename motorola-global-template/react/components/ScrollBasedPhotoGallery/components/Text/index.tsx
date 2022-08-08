import React, { FC } from "react";

import styles from "./Text.css";

type TextProps = {
  className: string;
};

const Text: FC<TextProps> = ({ children, className }) => {
  return (
    <div
      className={`${className} ${styles.textWrapper} h-100 flex items-end absolute ma0 o-0`}
    >
      <p className={`${styles.text} white fw6 ttu tc ma0`}>{children}</p>
    </div>
  );
};

export default Text;
