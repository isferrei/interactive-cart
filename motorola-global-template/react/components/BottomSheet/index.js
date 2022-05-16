import React, {Component, Fragment} from 'react';
import { ProductPrice } from 'vtex.store-components';
import { handleResize, debounce } from '../ComponentRenderer/common/js/deviceDetection.js'
import { getRootPath } from '../../utils/helpers.js';
import './BottomSheet.global.css';

class BottomSheet extends Component {

    constructor(props) {
        super(props);
        this.state = {
          checkDevice: handleResize(),
        };
      }

    componentDidMount(){
        let current = this;
        window.addEventListener(
            'resize',
            debounce(function() {
                current.setState({ checkDevice: handleResize() });
            }, 500)
        );
    }

    componentWillUnmount() {
        window.removeEventListener('resize', ()=>{});
    }


    render(){

        const {compareVariables, list, data, getCompare, display,bottomSheetIcon} = this.props;
        const { checkDevice: { isMobile, isTablet } } = this.state;
        let blocks =
          isMobile || isTablet || window.innerWidth <= 1024
            ? [...Array(2)]
            : [...Array(3)];

        let queryData = list.join('&fq=Id:');
        let link = compareVariables.link ? `${getRootPath}/${compareVariables.link}?fq=Id:${queryData}`: '';

        blocks.map((e,i)=>{
            if(list[i]){
                let itemData = data.find((p) => p.cacheId === list[i]);
                if(itemData){
                    let item = itemData.items.find(i => i.sellers[0].commertialOffer.Price > 0);
                    let availableIndex = item ? itemData.items.indexOf(item) : 0;
                    let commertialOffer = itemData.items[availableIndex].sellers[0].commertialOffer;
                    blocks[i] = (
                      <li key={i}>
                        <div>
                          <p onClick={getCompare} id={list[i]}></p>
                          <div className="img-block">
                            <a
                              href={`${getRootPath}/${itemData.linkText}/p`}
                              target="_self"
                            >
                              <img
                                src={
                                  itemData.items[availableIndex] != undefined
                                    ? itemData.items[availableIndex].images[0]
                                        .imageUrl
                                    : ""
                                }
                                alt={itemData.productName}
                              />
                            </a>
                          </div>
                          <div className="compare-phone-content-section">
                            <a
                              href={`${getRootPath}/${itemData.linkText}/p`}
                              target="_self"
                            >
                              <p
                                className="device-name"
                                dangerouslySetInnerHTML={{
                                  __html: itemData.productName
                                }}
                              ></p>
                              <div className="card-price">
                                <ProductPrice
                                  sellingPrice={commertialOffer.Price}
                                  listPrice={commertialOffer.ListPrice}
                                  installments={commertialOffer.Installments}
                                  showLabels={false}
                                  {...itemData.items[availableIndex]}
                                />
                              </div>
                            </a>
                          </div>
                        </div>
                      </li>
                    );
                }
            } else {
                blocks[i] = <li key={i}><div className='dashed'></div></li>;
            }
        })

        return (
          <Fragment>
            <div className="floating" onClick={display}>
              <img src={bottomSheetIcon} alt="Bottom Sheet Icon" />
            </div>
            <div className="bottom-sheet bottom-sheet-family-page">
              <div className="c-blocoComparador">
                <div>
                  <ul>{blocks}</ul>
                  <p className="trocaseta" onClick={display}>
                    {isMobile || isTablet || window.innerWidth <= 1024 ? (
                      <span className="text-desktop">
                        {compareVariables.textMobile || ""}
                      </span>
                    ) : (
                      <span className="text-mobile">
                        {compareVariables.textDesktop || ""}
                      </span>
                    )}
                    {(compareVariables.btn) ?
                    (list.length > 1 &&
                     ( <a target="_blank" href={link}>
                        {compareVariables.btn || ""}
                      </a> )
                    ): null
                    }
                  </p>
                </div>
              </div>
            </div>
          </Fragment>
        );
    }
}

export default BottomSheet;