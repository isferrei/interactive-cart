import React, { Component, Fragment } from "react";
import { Link } from "vtex.render-runtime";
import "./ProductFamily.global.css";
import IconPlus from "../../../../utils/IconPlus";
import IconMinus from "../../../../utils/IconMinus";
import IconCheck from "../../../../utils/IconCheck";

class ProductFamily extends Component {
  state = {
    open: false
  };
  openBox = () => {
    this.setState({ open: true });
  };
  closeBox = () => {
    this.setState({ open: false });
  };
  render() {
    const {
      itemTitle,
      itemLink,
      itemImage,
      itemImageAltText,
      floatImage,
      floatImageAltText,
      itemPrice,
      specifications,
      buttonText,
      buttonTextColor,
      buttonBgColor,
      buttonBorderColor
    } = this.props;

    return (
      <Fragment>
        {this.props.showModal ?
         <div className="product-family">
           <div onClick={this.closeBox} className={ this.state.open ? "family-box open-family-box" : "family-box close-family-box"}>
             <div className="family-heading">
               <IconMinus className="icon-minus" />
             </div>
             <div className="family-float-image">
               <img src={floatImage} alt={floatImageAltText} />
             </div>
             <div className="family-prices">{itemPrice}</div>
             <div className="family-specifications">
               <ul>
                 {specifications.map((specification, key) => (
                   <li key={key}>
                     <IconCheck className="icon-check" />
                     <p>{specification.specificationName}</p>
                   </li>
                 ))}
               </ul>
             </div>
             <Link
              className="family-cta"
              to={itemLink}
              style={{
                color: buttonTextColor ? buttonTextColor : '#FFFFFF',
                backgroundColor: buttonBgColor ? buttonBgColor : '#46c7e1',
                border: buttonBorderColor ? '1px solid ' + buttonBorderColor : '1px solid #46c7e1',
              }}
            >
               {buttonText}
             </Link>
           </div>

           <div onClick={this.openBox} className={this.state.open ? "family-block close-family-block" : "family-block open-family-block"}>
             <div className="family-image">
               <img src={itemImage} alt={itemImageAltText} />
             </div>
             <div className="family-details">
               <div className="family-name">{itemTitle}</div>
               <IconPlus className="icon-plus" />
             </div>
           </div>
         </div> :
         <div className="product-family without-modal">
          <div className="family-image">
            <img src={itemImage} alt={itemImageAltText} />
          </div>
          <div className="family-float-image">
            <img src={floatImage} alt={floatImageAltText} />
          </div>
          <div className="family-prices">{itemPrice}</div>
          <div className="family-specifications">
            <ul>
              {specifications.map((specification, key) => (
                <li key={key}>
                  <IconCheck className="icon-check" />
                  <p>{specification.specificationName}</p>
                </li>
              ))}
            </ul>
          </div>
          <Link
            className="family-cta"
            to={itemLink}
            style={{
              color: buttonTextColor ? buttonTextColor : '#FFFFFF',
              backgroundColor: buttonBgColor ? buttonBgColor : '#46c7e1',
              border: buttonBorderColor ? '1px solid ' + buttonBorderColor : '1px solid #46c7e1',
            }}
          >
            {buttonText}
          </Link>
        </div>}
      </Fragment>
    );
  }
}
export default ProductFamily;
