import { useState, useEffect } from "react";

import { handleResize } from "../ComponentRenderer/common/js/deviceDetection";

const usePagination = (initialState) => {
    const { data, itemsPerPage } = initialState;
    const perPage = itemsPerPage ? itemsPerPage : 10;
    const pages = Math.ceil(data.length / perPage);
    const lastPage = pages;
    const pagination = [];
    const deviceFlag = handleResize();

    const [currentPage, setCurrentPage] = useState(1);
    const [slicedData, setSlicedData] = useState([...data].slice((currentPage - 1) * perPage, currentPage * perPage));

    let ellipsisLeft = false;
    let ellipsisRight = false;

    for(let i = 1; i <= pages; i++) {
      if(i === currentPage) {
        pagination.push(
          { id: i, current: true, ellipsis: false }
        );
      }else {
        if (deviceFlag.isMobile) {
          if(i < 2 || i > pages - 1 || i === currentPage - 1 || i === currentPage + 1 || i === currentPage + 2) {
            pagination.push(
              { id: i, current: false, ellipsis: false }
            );
          }else if( i > 1 && i < currentPage && !ellipsisLeft ) {
            pagination.push(
              { id: i, current: false, ellipsis: true }
            );
            ellipsisLeft = true;
          }else if( i < pages && i > currentPage && !ellipsisRight) {
            pagination.push(
              { id: i, current: false, ellipsis: true }
            );
            ellipsisRight = true;
          }
        } else {
          if(i < 3 || i > pages - 1 || i === currentPage - 1 || i === currentPage + 1 || i === currentPage + 2 || i === currentPage + 3) {
            pagination.push(
              { id: i, current: false, ellipsis: false }
            );
          }else if( i > 2 && i < currentPage && !ellipsisLeft ) {
            pagination.push(
              { id: i, current: false, ellipsis: true }
            );
            ellipsisLeft = true;
          }else if( i < pages - 3 && i > currentPage && !ellipsisRight) {
            pagination.push(
              { id: i, current: false, ellipsis: true }
            );
            ellipsisRight = true;
          }
        }
      }
    }

    useEffect(() => {
      console.log('state changed', slicedData)
      initialState.dataCallBackFn(slicedData);
    }, [slicedData]);

    const changePage = (page, event) => {
      event.preventDefault();
      if(page !== currentPage) {
        setCurrentPage(page);
        setSlicedData([...data].slice((page - 1) * perPage, page * perPage));
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    }

    const nextPage = (event) => {
      event.preventDefault();
      setCurrentPage(prevVal => prevVal === pages ? prevVal : prevVal + 1);
      if(currentPage !== pages) {
        setSlicedData([...data].slice(currentPage * perPage, (currentPage + 1) * perPage));
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    }

    const prevPage = (event) => {
      event.preventDefault();
      setCurrentPage(prevVal => prevVal - 1 === 0 ? prevVal : prevVal - 1);
      if(currentPage !== 1) {
        setSlicedData([...data].slice((currentPage - 2) * perPage, (currentPage - 1) * perPage));
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    }

    return {slicedData, pagination, currentPage, lastPage, nextPage, prevPage, changePage};
  };

  export default usePagination;
