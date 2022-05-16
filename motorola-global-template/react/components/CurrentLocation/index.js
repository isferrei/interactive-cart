import countrySprite from "./ico-flags-sprite.png";

const CurrentLocation = ({
  backgroundPosition,
  countryName,
  changeLocationLink,
  changeLocationText
}) => {
  return (
    <div className="checkout-footer-copy-row checkout-footer-copy-location">
      <ul>
        <li className="checkout-footer-copy-location-flag">
          <span
            style={{ backgroundPosition: backgroundPosition }}
            id="bg-image-location-flag"
            className="flag-lazy"
          ></span>
        </li>
        <li className="checkout-footer-copy-location-name">
          <p>{countryName}</p>
        </li>
        <li className="checkout-footer-copy-location-btn">
          <a href={changeLocationLink}>{changeLocationText}</a>
        </li>
      </ul>
    </div>
  );
};

CurrentLocation.schema = {
  title: "Current Location",
  description: "Country that going to show in your current country",
  type: "object",
  properties: {
    countryName: {
      type: "string",
      title: "Country name"
    },
    changeLocationLink: {
      type: "string",
      default: "https://www.motorola.com/country-selector",
      title: "Change location link"
    },
    changeLocationText: {
      type: "string",
      default: "Change Location",
      title: "Change location text",
      description: "Text that will appear in the side of the flag"
    },
    backgroundPosition: {
      type: "string",
      title: "Sprite Background Position",
      description: "Background Position CSS value",
      default: "0 -225px"
    }
  }
};

export default CurrentLocation;
