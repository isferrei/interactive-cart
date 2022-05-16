import axios from 'axios';

function validateField(name, value, props, errors) {
    if (!name) {
        return;
    }

    switch (name) {
        case 'firstName':
        case 'lastName':
            if (props[name].isMandatory && value.length === 0) {
                errors[name] = props[name].errorMessageMandatory;
            } else if (value.length > 100) {
                errors[name] = props[name].errorMessageTooLong;
            } else {
                errors[name] = '';
            }
            break;
        case 'email':
            if (value.length === 0) {
                errors[name] = props.email.errorMessageMandatory;
            } else if (value.length > 255) {
                errors[name] = props.email.errorMessageTooLong;
            } else {
                const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
                errors[name] = validEmailRegex.test(value) ? '' : props.email.errorMessageIncorrect;
            }
            break;
        case 'optIn':
            let valueToValidate = typeof value === 'boolean' ? value : value === 'Y';
            errors.optIn = !valueToValidate ? props.optIn.errorMessage : '';
            break;
        case 'ageConfirm':
            if (props.ageCheck.isMandatory) {
                errors.ageConfirm = value ? '' : props.ageCheck.errorMessage;
            } else {
                errors.ageConfirm = '';
            }   
            break;
        default:
            break;
    }
}

function handleChangeGlobal(state, props, targetName, targetValue) {
    let errors = state.errors;

    if (targetName === 'ageConfirm') {
        targetValue = !state.form.ageConfirm;
    }

    const valueToApply = targetName === 'optIn'
        ? targetValue === 'Y'
        : targetValue;

    validateField(targetName, targetValue, props, errors);

    return {
        errors,
        form: {
            ...state.form,
            [targetName]: valueToApply
        }
    };
}

function validateFormGlobal(state, props) {
    let errors = state.errors;
    let isValid = Object.entries(state.form).reduce(function(acc, [name, value]) {
        validateField(name, value, props, errors);
        return acc && !errors[name];
    }, true);

    isValid = isValid
        && !!props.prefLanguage
        && !!props.webCampaign
        && !!props.billToCountry;

    return {
        isValid,
        errors
    };
}

function sendFormGlobal(formState, props) {
    return axios({
        // url: `/motosubscriber`,  // !!! TO DEBUG LINKED APP ONLY !!!
        // url: `${props.accountUrl}/motosubscriber`,
        url: `${window.location.origin + (("undefined" != typeof __RUNTIME__ && null !== __RUNTIME__ ? __RUNTIME__.rootPath : void 0) || "")}/motosubscriber`,
        method: 'post',
        data: {
            ...formState,
            optIn: formState.optIn ? 'Y' : 'N',
            ageConfirm: formState.ageConfirm ? 'Y' : 'N',
            prefLanguage: props.prefLanguage,
            webCampaign: props.webCampaign,
            billToCountry: props.billToCountry,
        }
    });
}

function prepareAccountUrl(baseUrl) {
    if (!baseUrl || baseUrl === '/') {
        return '';
    }

    const url = baseUrl.replace(/\/$/, '');
    const urlToGo = checkMapAccount(url);

    return `https://${urlToGo}`;
}

const accountsList = {
    'motorolabu.myvtex.com': 'www.motorola.com/bg',
    'motorolacaen.myvtex.com': 'www.motorola.ca',
    'motorolacafr.myvtex.com': 'fr.motorola.ca',
    'motorolabenl.myvtex.com': 'www.motorola.com/be/nl',
    'motorolabefr.myvtex.com': 'www.motorola.com/be/fr',
    'motoroladk.myvtex.com': 'www.motorola.com/dk',
    'motorolafr.myvtex.com': 'www.motorola.fr',
    'motorolade.myvtex.com': 'www.motorola.de',
    'motorolait.myvtex.com': 'www.motorola.it',
    'motorolanl.myvtex.com': 'www.motorola.com/nl',
    'motorolapl.myvtex.com': 'www.motorola.com/pl',
    'motorolaro.myvtex.com': 'www.motorola.com/ro',
    'motorolars.myvtex.com': 'www.motorola.com/rs/sr',
    'motorolask.myvtex.com': 'www.motorola.com/sk/sk',
    'motorolaes.myvtex.com': 'www.motorola.es',
    'motorolase.myvtex.com': 'www.moto.com/se',
    'motorolauk.myvtex.com': 'www.motorola.co.uk',
    'motorolaus.myvtex.com': 'www.motorola.com/us',
    'motorolaroe.myvtex.com': 'www.motorola.com/we',
    'motorolaat.myvtex.com': 'www.motorola.com/at',
    'motorolaau.myvtex.com': 'www.motorola.com.au',
    'motorolain.myvtex.com': 'www.motorola.in',
    'motorolajp.myvtex.com': 'www.motorola.co.jp',
    'motorolanz.myvtex.com': 'www.motorola.com/nz',
    // '': 'motorola.com/mea',
    // '': 'motorola.com/tw/zh',
    // '': 'motorola.co.th',
    // '': 'motorola.com/ru',
    '': 'motorola.com/we'
};

function checkMapAccount(currentAccount) {
    return Object.keys(accountsList).includes(currentAccount) ? accountsList[currentAccount] : currentAccount;
}

function accountsTest(currentAccount) {
    const testAccounts = {
        'undefined': undefined,
        // 'empty': '',         // !! uncomment when all the cookies are in place
        '/': '/',
        'CURRENT ACCOUNT': currentAccount
    }

    Object.keys(accountsList).forEach(function(key) {
        console.log(`${key} => ${prepareAccountUrl(accountsList[key])}/motosubscriber`);
    });
    Object.keys(testAccounts).forEach(function(key) {
        console.log(`${key} => ${prepareAccountUrl(accountsList[key])}/motosubscriber`);
    });
}

export {
    handleChangeGlobal,
    validateFormGlobal,
    sendFormGlobal,
    prepareAccountUrl,
    accountsTest
};