import React from "react";
import Enzyme, { render, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { common } from "./common";
import ProductSpecsDetail from "../components/ProductSpecsDetail/index";
common();

Enzyme.configure({ adapter: new Adapter() });

describe("Testing Product Specification Detail", () => {
  let dataObject = {
    psd_hide_all_text: "Hide all specifications",
    psd_show_all_text: "View all specifications",
    psd_background_color: "ffffff",
    psd_text_color: "000000",
    psd_border_color: "cccccc",
    psd_arrow_image: null,
    psd_bottom_arrow_image: null,
    psd_mobile_arrow_image: null,
    Items: [
      {
        psdi_category_value: "Performance",
        data: {
          column_one_data: [
            {
              category_headline: "Operating System",
              value: "<p>Android&trade; 9 Pie</p>"
            },
            {
              category_headline: "Processor",
              value:
                "<p>Qualcomm&reg; Snapdragon&trade; 632 processor with 1.8 GHz octa-core CPU and Adreno 506 GPU</p>"
            },
            {
              category_headline: "Memory (RAM)",
              value: "<p>4 GB</p>"
            }
          ],
          column_two_data: [
            {
              category_headline: "Internal storage",
              value: "<p>64 GB</p>"
            },
            {
              category_headline: "Expandable storage",
              value:
                "<p>microSD Card support (up to 512 GB)<sup>&dagger;&dagger;</sup></p>"
            },
            {
              category_headline: "Security",
              value: "<p>Moto Face Unlock, fingerprint reader</p>"
            }
          ],
          column_three_data: [
            {
              category_headline: "Sensors",
              value:
                "<p>Fingerprint reader, Proximity, Accelerometer, Ambient light, Sensor hub, Gyroscope, Ultrasonic, Magnetometer (e-Compass)</p>"
            },
            {
              category_headline: "Certifications",
              value:
                '<p>Android Enterprise Recommended <a href="https://www.motorola.com/us/products/android-enterprise-recommended-smartphones"><u><strong>Learn more</strong></u></a></p>'
            }
          ]
        }
      },
      {
        psdi_category_value: "Battery",
        data: {
          column_one_data: [
            {
              category_headline: "Battery size",
              value: "<p>3000 mAh, Non-removable</p>"
            },
            {
              category_headline: "Battery life",
              value: "<p>All-day battery*</p>"
            }
          ],
          column_two_data: [
            {
              category_headline: "Charging",
              value:
                "<p>15W TurboPower&trade;, 9 hours of usage in 15 minutes of charge*</p>"
            },
            {
              category_headline: "Charger type",
              value: "<p>USB-C 15W TurboPower&trade; charger</p>"
            }
          ],
          column_three_data: []
        }
      }
    ]
  };

  const specDetail = render(<ProductSpecsDetail data={dataObject} />);

  it("Product Specification Detail : TC1 : Should initialize the Product Specification Detail ", () => {
    expect(specDetail.find(".prod-specification-detail")).toBeDefined();
  });
  it("Product Specification Detail  : TC2 : Should initialize the Product Specification Detail with Two Items", () => {
    expect(specDetail.find(".psd-items-group").length).toEqual(2);
  });
  it("Product Specification Detail  : TC3 : Should initialize the Specification View Text with Top and Bottom", () => {
    expect(specDetail.find(".psd-show-hide-label").length).toEqual(2);
  });
  it("Product Specification Detail  : TC4: Should not initialize the Product Specification Detail", () => {
    dataObject.Items = [];
    const specDetail = shallow(<ProductSpecsDetail data={dataObject} />);
    expect(specDetail.find(".prod-specification-detail")).toEqual({});
  });
});
