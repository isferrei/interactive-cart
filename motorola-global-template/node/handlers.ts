import { json } from "co-body";
import motosubscriber from "./src/motosubscriber";
import URLSearchParams = require("url-search-params");
import axios from "axios";
import { setApiHeaders } from './config/config';

const createSafeHandler = (callback: Function) => {
    return async function safeHandler(ctx: any) {
        ctx.response.set("Content-Type", "application/json");
        ctx.response.set("Cache-Control", "no-cache");
        ctx.response.set("Access-Control-Allow-Origin", "*");
        try {
            const parseQueryString = function (url: {
                replace: (
                    arg0: RegExp,
                    arg1: ($0: any, $1: any, $2: any, $3: any) => void
                ) => void;
            }) {
                var urlParams: any = {};
                url.replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"), function (
                    $0: any,
                    $1: string | number,
                    $2: any,
                    $3: any
                ) {
                    $0; // referenced just to avoid TS warnings
                    $2; // referenced just to avoid TS warnings
                    urlParams[$1] = $3;
                });
                return urlParams;
            };
            const body = await json(ctx.request);
            const data = await callback(
                body,
                ctx.vtex,
                parseQueryString(ctx.originalUrl)
            );
            ctx.response.status = 200;
            ctx.response.body = { data };
        } catch (e) {
            const errorMessage = `Error processing ${callback.name}`;
            ctx.response.status = (e.response && e.response.status) || 500;
            ctx.response.body = {
                error: (e.response && e.response.data) || e.message
            };
            console.log(errorMessage, e);
        }
    };
};

const validateCaptcha = async (ctx: any) => {
    const { response: res } = ctx;

    ctx.req.body = {};
    const params = new URLSearchParams(ctx.req._parsedUrl.query);
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=6LeZV8AUAAAAABTjC8ghzRLYuNBwhooXUzDJxtS4&response=${params.get(
        "token"
    )}`;

    try {
        const response = (
            await axios({
                method: "post",
                url,
                headers: {
                    "Cache-Control": "no-cache",
                    "Proxy-Authorization": ctx.vtex.authToken,
                    "X-Vtex-Proxy-To": url,
                    "X-Vtex-Use-Https": true
                }
            })
        ).data;
        res.status = 200;
        return (res.body = response);
    } catch (error) {
        res.status = 400;
        return (res.body = error.response.data);
    }
};

const getPricingDetails = async (ctx: any) => {
    const { response: res } = ctx;
    ctx.req.body = {};
    const params = new URLSearchParams(ctx.req._parsedUrl.query);
    const itemId = params.get('itemId');
    const accountName = params.get('account');
    const pricingApi = `https://${accountName}.myvtex.com/api/pricing/prices/${itemId}`;
    const defaultHeaders = {
        "Cache-Control": "no-cache",
        "Proxy-Authorization": ctx.vtex.authToken,
        "X-Vtex-Use-Https": true,
    };
    const apiHeaders = setApiHeaders(accountName);
    const customHeaders = { ...defaultHeaders, ...apiHeaders };

    try {
        if (itemId && accountName && (accountName === 'motorolasandbox' || accountName === 'motorolaus')) {
            await axios.get(pricingApi, {
                headers: customHeaders
            }).then(response => {
                ctx.status = response.status;
                ctx.body = response.data;
            }).catch(error => {
                console.log('error', error)
                res.status = error.status;
                res.body = error;
            })
        } else {
            res.status = 400;
            res.body = {
                error: 'request parameters invalid'
            };
        }
    } catch (error) {
        console.log(error);
        res.status = 400;
        res.body = {
            error: 'service failed'
        };
    }
}

export default {
    routes: {
        motosubscriber: createSafeHandler(motosubscriber),
        validateCaptcha,
        itemPrices: getPricingDetails
    }
};