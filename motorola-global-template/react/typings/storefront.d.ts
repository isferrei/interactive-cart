import { FC } from "react";

declare global {
  interface StorefrontFunctionComponent<P = Object> extends FC<P> {
    getSchema?(props: P): Object;
    schema?: Object;
    defaultProps?: Object;
    title?: String;
  }
}
