import React, { useState } from "react";
import classNames from "classnames";
import { useRuntime } from "vtex.render-runtime";
import { useCssHandles, applyModifiers } from "vtex.css-handles";
import radioButton from "../../assets/radio-button-unchecked.svg";
import radioButtonChecked from "../../assets/radio-button-checked.svg";

const CSS_HANDLES = ["orderByOptionItem"];

const SelectionListItem = ({ option, onItemClick, selected, getOrder }) => {
  const handles = useCssHandles(CSS_HANDLES);
  const { setQuery } = useRuntime();

  const handleOptionClick = () => {
    onItemClick();
    getOrder(option.value);
  };
  const highlight = selected ? "bg-light-gray" : "hover-bg-muted-5 bg-base";
  return (
    <button
      className={classNames(
        highlight,
        applyModifiers(
          handles.handles.orderByOptionItem,
          selected ? "selected" : ""
        ),
        " c-on-base f5 ml-auto db no-underline pointer tl bn pv4 ph5 w-100 right-0-ns"
      )}
      key={option.value}
      onClick={handleOptionClick}
    >
      <span className="sortby-radio-options">
        <img
          className="radio-button-mobile"
          src={selected ? radioButtonChecked : radioButton}
          alt={option.label}
        />
        {option.label}
      </span>
    </button>
  );
};

export default SelectionListItem;
