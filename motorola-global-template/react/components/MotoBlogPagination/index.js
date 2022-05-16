import React, {Fragment} from "react";
import "./MotoBlogPagination.global.css";

import usePagination from './usePagination';

const MotoBlogPagination = ({ data, itemsPerPage, dataCallBackFn }) => {
  
  const { slicedData, pagination, currentPage, lastPage, prevPage, nextPage, changePage } = usePagination({ data, itemsPerPage, dataCallBackFn});

  return (
    <Fragment>
      {
        data.length <= itemsPerPage ? null :
          <div className="pagination">
            {
              currentPage > 1 ? 
                <a href="/#" className="pagination-icn pagination-prev-icn-active" onClick={prevPage}></a> :
                <a href="/#" className="pagination-icn pagination-prev-icn-disabled" disabled onClick={prevPage}></a>
            }

            <ul className="pagination-list">
              { 
                pagination.map(page => {
                  if (!page.ellipsis) {
                    return <li key={page.id} className="pagination-list-item">
                      <a
                        href="/#"
                        className={page.current ? 'pagination-link is-current' : 'pagination-link'}
                        onClick={(e) => changePage(page.id, e)}>
                        {page.id}
                      </a>
                    </li>
                  } else {
                    return <li key={page.id}><span className="pagination-ellipsis">&hellip;</span></li>
                  }
                })
              }
            </ul>

            {
              currentPage === lastPage ?  
                <a href="/#" className="pagination-icn pagination-next-icn-disabled" disabled onClick={nextPage}></a> :
                <a href="/#" className="pagination-icn pagination-next-icn-active" onClick={nextPage}></a> 
            }
          </div>  
      } 
    </Fragment>
  )
}

export default MotoBlogPagination;
