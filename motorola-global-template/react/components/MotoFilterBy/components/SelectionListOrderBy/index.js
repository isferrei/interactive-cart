import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';
import { find, propEq } from 'ramda';
import { formatIOMessage } from 'vtex.native-types';
import { IconCaret } from 'vtex.store-icons';
import { useDevice } from 'vtex.device-detector';
import { useCssHandles } from "vtex.css-handles";
import SelectionListItem from '../SelectionListItem/index';
import useOutsideClick from '../../hooks/useOutsideClick';
import styles from '../../MotoFilterBy.global.css';
import sortByMobIcon from "../../assets/sort_by_mobile.svg";
import filterMobIcon from "../../assets/filter_mobile_arrow.svg";



const CSS_HANDLES = [
  'orderByButton',
  'orderByOptionsContainer',
  'orderByDropdown',
  'orderByText',
  'filterPopupTitle',
  'filterPopupArrowIcon',
]

const SelectionListOrderBy = ({
  intl,
  message = 'store/ordenation.sort-by',
  orderBy,
  options,
  getOrder
}) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const handles = useCssHandles(CSS_HANDLES)

  const orderByRef = useRef(null);
  const handleDropdownBtClick = useCallback(
    () => setShowDropdown(!showDropdown),
    [showDropdown]
  );

  const handleOutsideClick = useCallback(() => setShowDropdown(false), [])
  useOutsideClick(orderByRef, handleOutsideClick, showDropdown)
  const { isMobile } = useDevice();

  const renderOptions = orderBy => {
    return options.map(option => {
      return (
        <SelectionListItem
          key={option.value}
          onItemClick={handleOutsideClick}
          option={option}
          selected={option.value === orderBy}
          getOrder={getOrder}
        />
      );
    });
  }

  const sortByMessage = formatIOMessage({ id: message, intl })

  const getOptionTitle = useCallback(
    option => {
      const selectedOption = find(propEq('value', option), options)
      return selectedOption ? selectedOption.label : ''
    },
    [options]
  )

  const btClass = classNames(
    handles.orderByButton,
    "ph3 pv5 mv0 pointer flex items-center bg-base c-on-base t-action--small bt br bl bb-0 br2 br--top bw1 w-100 outline-0 mobile-orderby text-orderby",
    {
      "b--muted-4": showDropdown && isMobile && window.innerWidth < 1024,
      "b--transparent pl1": !showDropdown
    }
  );

  const contentClass = classNames(
    styles.orderByOptionsContainer,
    "z-1 absolute bg-base shadow-5 w-100 f5 b--muted-4 br2 ba bw1 br--bottom right-0-ns sortby-positionbox",
    {
      db: showDropdown,
      dn: !showDropdown
    },
    {
      "sort-show": showDropdown,
      "sort-hide  ": !showDropdown
    }
  );

  const dropdownSort = classNames(
    handles.orderByDropdown,
    "sortby relative pt1 text-orderby w-100 w-auto-ns ml-auto"
  );
  return (
    <div className={dropdownSort} ref={orderByRef}>
      <button onClick={handleDropdownBtClick} className={btClass}>
        <span
          className={classNames(
            handles.filterPopupTitle,
            "c-on-base t-action--small ml-auto-ns"
          )}
        >
          {isMobile && window.innerWidth < 1024 ? (
            <img className="sortByIcon" src={sortByMobIcon} alt="Sort Icon" />
          ) : (
            ""
          )}
          {isMobile && window.innerWidth < 1024 ? (
            <span
              className={classNames(handles.orderByText, "c-muted-2 ", {
                "dib-ns": orderBy === undefined ? !orderBy : !orderBy.length
              })}
            >
              {sortByMessage}
            </span>
          ) : null}

          {isMobile && window.innerWidth < 1024 ? "" : getOptionTitle(orderBy)}
        </span>
        <span className={`${handles.filterPopupArrowIcon} pt1`}>
          <IconCaret orientation={showDropdown ? "up" : "down"} size={10} />
        </span>
      </button>
      {showDropdown ? (
        <div
          className="filterBy-backdrop"
          onClick={handleDropdownBtClick}
        ></div>
      ) : (
        null
      )}
      <div className={contentClass}>
        <button
          onClick={handleDropdownBtClick}
          className="sortby-close"
          key="close"
        >
          <img className="sortByArrow" src={filterMobIcon} alt="Sort Arrow Icon" />
          {sortByMessage}
        </button>
        {renderOptions(orderBy)}
      </div>
    </div>
  );
}

SelectionListOrderBy.propTypes = {
  /** Current Ordernation  */
  orderBy: PropTypes.string,
  /** Sort Options*/
  options: PropTypes.arrayOf(
    PropTypes.shape({
      /** Label to Option */
      label: PropTypes.string,
      /** Value to value */
      value: PropTypes.string,
    })
  ),
  /** Intl to translations */
  intl: intlShape,
  /** Message to be displayed */
  message: PropTypes.string,
}

export default injectIntl(SelectionListOrderBy)