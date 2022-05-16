import FuelAuth from 'fuel-auth';
import FuelRest from 'fuel-rest';
import * as config from '../config/motosubscriber.json';

export default async function (args: any, vtex: any) {

    const IS_PRODUCTION = true;

    const configToUse = IS_PRODUCTION ? config.production : config.sandbox;

    const isValid = valiateInputData(args);
    if (!isValid) {
        throw {
            response: {
                status: 400
            }
        };
    }

    const vtexHeaders = {
        'Content-Type':'application/json',
        'Cache-Control': 'no-cache',
        'Proxy-Authorization': vtex.authToken,
        'X-Vtex-Use-Https': true
    };

    const clientId = configToUse.clientId;
    const clientSecret = configToUse.clientSecret;

    const authUrl = `http://${configToUse.instanceId}.auth.marketingcloudapis.com/v2/token`;

    let authClient = new FuelAuth({
        clientId: clientId,
        clientSecret: clientSecret,
        authOptions: {
            authVersion: 2
        },
        authUrl
    });

    let token;
    try {
        token = await authClient.getAccessToken({
            headers: vtexHeaders
        });
    } catch (error) {
        return error;
    }

    const restClient = new FuelRest({
        auth: {
            clientId: clientId,
            clientSecret: clientSecret,
            accessToken: token.accessToken
        },
        origin: `http://${configToUse.instanceId}.rest.marketingcloudapis.com`,
        headers: vtexHeaders
    });

    try {
        let postResponse = await restClient.post({
            uri: `/data/v1/async/dataextensions/key:${configToUse.dataTableKey}/rows`,
            json: true,
            body: {
                items: [{
                    'EMAIL_ADDRESS': args.email,
                    'MOTO_DATE_LAST_UPDATED': new Date().toLocaleString('en-US', { hour12: false }),  // '11/08/2019 10:37:00',
                    'FIRST_NAME': args.firstName,
                    'LAST_NAME': args.lastName,
                    'EMAIL_OPT_IN': args.optIn,
                    'PREF_LANGUAGE': args.prefLanguage,
                    'WEB_CAMPAIGN_NAME': args.webCampaign,
                    'BILL_TO_COUNTRY': args.billToCountry,
                    'DATA_SOURCE': 'VTEX'
                }]
            }
        });
        console.log('POST response', postResponse.body);
    } catch (error) {
        console.log('POST err', error);
        return error;
    }
}

function valiateInputData(args: any) {

    const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

    return (!args.firstName || (args.firstName && args.firstName.length < 100))
        && (!args.lastName || (args.lastName && args.lastName.length < 100))
        && !!args.email && args.email.length < 254 && validEmailRegex.test(args.email)
        && args.optIn === 'Y'
        && !!args.prefLanguage
        && !!args.webCampaign
        && !!args.billToCountry;
}