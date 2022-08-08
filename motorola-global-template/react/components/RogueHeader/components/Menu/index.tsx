import React, { FC } from "react";
import { scroller as scroll } from "react-scroll";
import classNames from "classnames";
import styles from "./Menu.css";

type MenuProps = {
  showMenu: boolean;
  setShowMenu(p: boolean): void;
  className: string;
  menu: [
    {
      text: string;
      link: string;
    }
  ];
};

const Menu: FC<MenuProps> = ({ showMenu, setShowMenu, className, menu }) => {
  const scrollToElement = element => {
    setShowMenu(false);
    scroll.scrollTo(element, {
      smooth: true,
      offset: -80,
      duration: 300
    });
  };

  return (
    <ul
      className={classNames(
        className,
        styles["menu--container"],
        showMenu ? styles["menu--menu-show"] : styles["menu--menu-hide"],
        "relative-l flex-column flex-row-l w-auto-l w-100 z-2"
      )}
    >
      {menu.map((menu, index) => (
        <li
          className="mr4 mv4 mv0-l flex items-center justify-center"
          key={index}
        >
          <button
            id={`gtm_edge20_inpagenav_${menu.text.replace(/\s/g, "")}`}
            className={classNames(
              styles["menu__item"],
              "pointer link white bn bg-transparent f6 f5-l fw3"
            )}
            type="button"
            onClick={() => scrollToElement(menu.link)}
          >
            {menu.text}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
