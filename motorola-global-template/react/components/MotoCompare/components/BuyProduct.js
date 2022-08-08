import { ProductPrice } from "vtex.store-components";
import { getRootPath } from "../../../utils/helpers";
import { FormattedMessage } from "react-intl";

function BuyProduct(props) {
  const { devices, sku, id, buy, add, addbtn, clear, na, box } = props;
  if (sku === undefined || sku === 0) {
    return (
      <div className="column box" data-productid="" id={id}>
        <button
          className={box === 0 ? "adicionar-cel disabled-btn" : "adicionar-cel"}
          name={id}
          onClick={add}
        >
          {addbtn || ""}
        </button>
      </div>
    );
  } else if (devices && sku) {
    const device = devices.find(
      dev => dev.cacheId === sku && dev.cacheId.length > 0
    );
    const link = device.linkText
      ? getRootPath + "/" + device.linkText + "/p"
      : "#";
    const item = device.items.find(i => i.sellers[0].commertialOffer.Price > 0);
    const availableItem = item ? device.items.indexOf(item) : 0;
    const productName = device.items[availableItem].nameComplete;
    const img = device.items[availableItem].images[0].imageUrl || "";
    const commercialOffer =
      device.items[availableItem].sellers[0].commertialOffer || "";

    return (
      <div className="column box" data-id={sku} id={id} name={id}>
        <button
          className="fechar-comparador"
          name={id}
          onClick={clear}
        ></button>
        <a href={link} target="_self">
          <div className="image">
            <img className="img-card" src={img} alt={productName} />
          </div>
          <h3>{productName}</h3>
          <div className="card-price">
            {(commercialOffer.AvailableQuantity > 0) ? (
              <ProductPrice
                sellingPrice={commercialOffer.Price}
                listPrice={commercialOffer.ListPrice}
                installments={commercialOffer.Installments}
              />
            ) : (
              <div className="out-of-stock">
                <FormattedMessage id="store/moto-compare.out-of-stock" />
              </div>
            )}
          </div>
        </a>
        <div className="price">
          <a className="btn buy-button" href={link} target="_self">
            {buy || ""}{" "}
          </a>
        </div>
      </div>
    );
  } else {
    return (
      <div className="column box empty-buy" data-id={sku} id={id}>
        <p>
          <strong>{na}</strong>
        </p>
      </div>
    );
  }
}

export default BuyProduct;
