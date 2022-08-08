import React, { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import CaretLeft from "@vtex/styleguide/lib/icon/CaretLeft";
import CaretRight from "@vtex/styleguide/lib/icon/CaretRight";

import { handleResize } from "../ComponentRenderer/common/js/deviceDetection";
import styles from "./ComparisonTable.module.css";
import { schemaComparisonTable } from "./schema";
import { ICTProps } from "./interfaces";

const ComparisonTable: StorefrontFunctionComponent<ICTProps> = ({ data }) => {
  const imgURL = "https://motorolaimgrepo.vteximg.com.br/arquivos/";
  const [checkDevice, setCheckdevice] = useState(handleResize());
  const ref = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState<number>(0);

  useEffect(() => {
    window.addEventListener(
      "resize",
      debounce(() => {
        setCheckdevice(handleResize());
      }, 500)
    );
  }, []);

  const scrollToLeft = element => {
    if (element.scrollLeft > 0) {
      setLeft(left - 80);
    }

    element.scrollLeft = left;
  };

  const scrollToRight = element => {
    const offSetLimit: number = element.scrollWidth - element.offsetWidth;
    const calcScroll: number = left === 0 ? 100 : (left * 100) / offSetLimit;

    if (left < 0) {
      setLeft(100);
    } else if (left < offSetLimit) {
      setLeft(left + calcScroll);
    }

    element.scrollLeft = left;
  };

  return (
    <div className={`${styles["comparison-table"]} relative`}>
      <div className={`${styles["comparison-table-title"]} flex items-center`}>
        <h3 className="white">{data?.ct_title}</h3>
        {checkDevice.isMobile || checkDevice.isTablet ? (
          <div className={`${styles["comparison-icons"]} ml5`}>
            <button
              className="br-100 mr5"
              onClick={() => scrollToLeft(ref.current)}
              type="button"
            >
              <CaretLeft size="12" color="#ffffff" orientation="center" />
            </button>
            <button
              className="br-100"
              type="button"
              onClick={() => scrollToRight(ref.current)}
            >
              <CaretRight size="12" color="#ffffff" orientation="center" />
            </button>
          </div>
        ) : null}
      </div>
      <div className={styles["comparison-table-content"]} ref={ref}>
        <table className="w-100 white">
          <thead>
            <tr>
              {!checkDevice.isMobile ? <th /> : null}
              {data?.ct_image_columns.map((columnsHead, i) => {
                return (
                  <th key={i}>
                    <div className={styles["comparison-table-col"]}>
                      <div className={styles["comparison-table-col-logo"]}>
                        <img
                          src={
                            columnsHead.ct_image_logo_upload
                              ? columnsHead.ct_image_logo_upload
                              : `${imgURL}${columnsHead.ct_image_logo}`
                          }
                          alt={columnsHead.ct_image_logo_alt_text}
                        />
                      </div>
                      <div
                        className={styles["comparison-table-col-smartphone"]}
                      >
                        <img
                          src={
                            columnsHead.ct_image_phone_upload
                              ? columnsHead.ct_image_phone_upload
                              : `${imgURL}${columnsHead.ct_img_phone}`
                          }
                          alt={columnsHead.ct_img_phone_alt_text}
                        />
                      </div>
                      {columnsHead.ct_cta_text ? (
                        <div className={styles["comparison-table-col-cta"]}>
                          <a
                            className="white b--white br-pill ba"
                            href={columnsHead.ct_cta_link}
                          >
                            {columnsHead.ct_cta_text}
                          </a>
                        </div>
                      ) : null}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data?.ct_rows.map((row, i) => {
              const checks = row.ct_col_check.split(",");

              return (
                <tr className="bb b--white-10" key={i}>
                  {!checkDevice.isMobile ? (
                    <td
                      className="tc br b--white-10 pa8"
                      dangerouslySetInnerHTML={{
                        __html: row.ct_name_row
                      }}
                    />
                  ) : null}

                  {checks.map((check, index) => {
                    return (
                      <td key={index} className="tc br b--white-10 pa8">
                        {checkDevice.isMobile && check === "true" ? (
                          <div className="flex flex-column items-center">
                            <div
                              style={{ fontSize: "11px" }}
                              className="pb3"
                              dangerouslySetInnerHTML={{
                                __html: row.ct_name_row
                              }}
                            />
                            <div className={styles["ct-checked"]}>
                              <img src={`${imgURL}Check.svg`} alt="check" />
                            </div>
                          </div>
                        ) : null}

                        {!checkDevice.isMobile && check === "true" ? (
                          <div className={styles["ct-checked"]}>
                            <img src={`${imgURL}Check.svg`} alt="check" />
                          </div>
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

ComparisonTable.schema = schemaComparisonTable;
export default ComparisonTable;
