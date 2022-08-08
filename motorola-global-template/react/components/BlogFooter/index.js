import React from 'react';
import { Input, Button } from 'vtex.styleguide';

import axios from 'axios';
import Cookies from "universal-cookie";
import { prepareAccountUrl } from "../MotoRegistration/Common/Handlers";
  
import './BlogFooter.global.css';
import Collapsible from 'react-collapsible';
import {
    handleResize
} from "../ComponentRenderer/common/js/deviceDetection";

class BlogFooter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isMobile: false,
            landscape: false,
            loading: false,
            email: '',
            optincheck: false,
            errors: {
                email: ''
            }
        }

        this.handleChange = this.handleChange.bind(this);
    }

    isEmailValid = () => {
        let errorObj = {
            email: ''
        }

        if (this.state.email.length === 0) {
            errorObj.email = `${this.props.signup.signupEmptyEmailText}`;
            this.setState({
                errors: errorObj
            }, () => {
                return false;
            });
        } else if (this.state.email.length > 255) {
            errorObj.email = `${this.props.signup.signupTooLongText}`;
            this.setState({
                errors: errorObj
            }, () => {
                return false;
            });
        } else {
            const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

            if (validEmailRegex.test(this.state.email)) {
                return true;
            }else {
                errorObj.email = `${this.props.signup.signupInvalidEmailText}`;
                this.setState({
                    errors: errorObj
                }, () => {
                    return false;
                });
            }
        }
    }

    handleChange(e) {
        this.setState({email: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        document.getElementById('bf-sign-up-success-msg').innerHTML = '';
        document.getElementById('bf-sign-up-error-msg').innerHTML = '';

        if (this.isEmailValid()) {
            const cookies = new Cookies();
            const accountUrl = prepareAccountUrl(cookies.get("vtex_binding_address"));
            
            axios.post(
                accountUrl + '/motosubscriber',
                {   
                    "email": this.state.email,
                    "firstName": "",
                    "lastName": "",
                    "optIn": this.state.optincheck ? "Y" : "N",
                    "ageConfirm": "Y",
                    "prefLanguage": "en",
                    "webCampaign": "ECOMM_NA_US_EN_REGISTRATION_GENERIC",
                    "billToCountry": "US"
                }
            ).then(res => {
                if (res.status === 200) {
                    document.getElementById('bf-sign-up-success-msg').innerHTML = '';
                    let arr = document.getElementsByClassName('vtex-input__error');
                    for(let i = 0; i < arr.length; i++) {
                        arr[i].innerHTML = '';
                    }
                    document.getElementById('bf-sign-up-success-msg').innerHTML = `<span class="bf-signup-check-cirle-icn"></span> ${this.props.signup.signupSuccessMessageText}`;
                }
            }).catch(err => {
                if (err) {
                    document.getElementById('bf-sign-up-error-msg').innerHTML = '';
                    let arr = document.getElementsByClassName('vtex-input__error');
                    for(let i = 0; i < arr.length; i++) {
                        arr[i].innerHTML = '';
                    }
                    document.getElementById('bf-sign-up-error-msg').innerHTML = `${this.props.signup.signupErrorMessageText}`;
                }
            });
        }
    }

    componentDidMount() {
        this.findViewPort();
        window.addEventListener(
            "resize",
            this.findViewPort
        );
    }

    findViewPort = () => {
        this.setState({
            loading: true
        })
        const deviceFlags = handleResize();
        const landscapeView = (window.screen.width >= 1024 && window.screen.width < 1026) ? true : false
        if (deviceFlags.isMobile || deviceFlags.isTablet) {
            this.setState({
                isMobile: true,
                landscape: landscapeView
            }, () => {
                this.setState({
                    loading: false
                })
            });
        } else {
            this.setState({
                isMobile: false,
                landscape: landscapeView
            }, () => {
                this.setState({
                    loading: false
                })
            });
        }

    }

    componentWillUnmount() {
        window.removeEventListener(
            "resize",
            this.findViewPort
        )
    }

    static schema = {
        title: "Moto Blog Footer",
        description: "Moto Blog Footer",
        type: "object",
        properties: {
            showBlogFooter: {
                type: "boolean",
                title: "Show Blog Footer",
                default: true
            },
            lists: {
                items: {
                    title: 'Footer Link block',
                    type: 'object',
                    properties: {
                        listTitle: {
                            default: '',
                            title: 'Footer Block title',
                            type: 'string',
                        },
                        listItems: {
                            items: {
                                title: 'Footer Link',
                                type: 'object',
                                properties: {
                                    linkTitle: {
                                        default: '',
                                        title: 'Footer Link title',
                                        type: 'string',
                                    },
                                    linkPath: {
                                        default: '/',
                                        title: 'Footer Link path',
                                        type: 'string',
                                    },
                                },
                            },
                            minItems: 1,
                            title: 'Footer List items',
                            type: 'array',
                        }
                    },
                },
                minItems: 1,
                maxItems: 3,
                title: 'Footer Link blocks',
                type: 'array',
            },
            signup: {
                title: "Sign up form",
                type: "object",
                properties: {
                    signupTitle: {
                        type: 'string',
                        title: 'Sign up title'
                    },
                    signupPlaceholderText: {
                        type: 'string',
                        title: 'Sign up input placeholder'
                    },
                    signupButtonText: {
                        type: 'string',
                        title: 'Sign up button text'
                    },
                    signupPrivacyPolicyText: {
                        type: 'string',
                        title: 'sign up privacy policy text'
                    },
                    signupPrivacyPolicyHref: {
                        type: 'string',
                        title: 'Privacy Policy Link'
                    },
                    optinCheckboxLabelText: {
                        type: 'string',
                        title: 'Optin Checkbox Label Text'
                    },
                    signupSuccessMessageText: {
                        type: 'string',
                        title: 'Sign up success message text'
                    },
                    signupErrorMessageText: {
                        type: 'string',
                        title: 'Sign up error message text'
                    },
                    signupEmptyEmailText: {
                        type: 'string',
                        title: 'Sign up empty email text'
                    },
                    signupInvalidEmailText: {
                        type: 'string',
                        title: 'Sign up invalid email text'
                    },
                    signupTooLongText: {
                        type: 'string',
                        title: 'Sign up too long email text'
                    }
                }
            },
            copyrightSection: {
                title: "Copyright Section",
                type: "object",
                properties: {
                    privacyLinkText: {
                        type: 'string',
                        title: 'Privacy Link Text'
                    },
                    privacyLinkHref: {
                        type: 'string',
                        title: 'Privacy Link'
                    },
                    termsofuseText: {
                        type: 'string',
                        title: 'terms of use Text'
                    },
                    termsofuseHref: {
                        type: 'string',
                        title: 'terms of use Link'
                    },
                    copyrightText: {
                        type: 'string',
                        title: 'Copyright Text'
                    }
                }
            }
        }
    };

    render() {
        const {
            showBlogFooter,
            signup,
            lists,
            copyrightSection
        } = this.props;
        if(!showBlogFooter) {
            return null;
        }
        return (
            <>
                {!this.state.loading &&
                    <div className="blog-footer-wrapper">
                        <div className="row">
                            <div className="bf-moto-logo-container col-xs-12 col-sm-12 col-md-8 col-lg-2">
                                <div className="logo"></div>
                                {  
                                    window.innerWidth === 1024 ?
                                        <div className="row bf-moto-list-items">
                                            {
                                                lists && lists.map( item => {
                                                    return (
                                                        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-2">
                                                        <Collapsible
                                                            className="bf-footer-title"
                                                            openedClassName="bf-footer-title active"
                                                            triggerClassName="bf-footer-title"
                                                            triggerOpenedClassName="bf-footer-title active"
                                                            trigger={<p className="bf-col-heading">{item.listTitle}</p>}
                                                            triggerDisabled={!this.state.isMobile}
                                                            open={!this.state.isMobile} >
                                                            <div className="bf-link-section">
                                                                <ul>
                                                                    {
                                                                        item.listItems && item.listItems.map( listItem => {
                                                                            return (
                                                                                <li>
                                                                                <a className="bf-link" href={listItem.linkPath}>{listItem.linkTitle}</a>
                                                                            </li>
                                                                            )
                                                                        })
                                                                    }
                                                                </ul>
                                                            </div>
                                                        </Collapsible>
                                                    </div>
                                                    )
                                                })
                                            }
                                        </div> : null
                                }
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 order-lg-md-last">
                                {
                                    (!this.state.isMobile && !this.state.landscape) &&

                                    <div className="bf-sign-up-section">
                                        <p className="bf-sign-up-label">{this.props.signup.signupTitle}</p>
                                        <div className="mt5">
                                           <form onSubmit={
                                                (e) => {
                                                    e.preventDefault();
                                                    this.handleSubmit(e);
                                                }
                                            }>
                                                <div className="bf-input-btn-wrapper">
                                                    <div className="bf-input-wrapper">
                                                        <Input 
                                                            placeholder={signup.signupPlaceholderText} 
                                                            size="large"
                                                            value={this.state.email} 
                                                            onChange={this.handleChange}
                                                            errorMessage={this.state.errors.email}/>
                                                    </div>
                                                    <div className="bf-btn-wrapper">
                                                        <Button disabled={!this.state.optincheck} variation="primary" size="small" onClick={this.handleSubmit}>
                                                            {signup.signupButtonText}
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="mt-5">
                                                    <div id="bf-sign-up-success-msg" className="bf-sign-up-success-msg"></div>
                                                    <div id="bf-sign-up-error-msg" className="bf-sign-up-error-msg"></div>
                                                </div>
                                                <div className="mt-5">
                                                    <div className="bf-signup-optin-wrapper">
                                                        <label 
                                                            className="bf-privacy-label"
                                                            for="privacy-policy">
                                                            <input
                                                                className="bf-privacy-checkbox"
                                                                checked={this.state.optincheck}
                                                                type="checkbox"
                                                                id="privacy-policy"
                                                                name="privacy-policy"
                                                                onChange={e => this.setState({ optincheck: !this.state.optincheck })}
                                                            /> {signup.optinCheckboxLabelText}
                                                            <span class="checkmark"></span>
                                                            <span className="bf-privacy-link">
                                                                <a 
                                                                    className="privacy-link"
                                                                    href={signup.signupPrivacyPolicyHref}
                                                                    target="_blank">
                                                                    {signup.signupPrivacyPolicyText}
                                                                </a>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </form> 
                                        </div>
                                    </div>
                                }
                                {
                                    (this.state.isMobile || this.state.landscape) &&
                                    <div className="bf-sign-up-section">
                                        <p className="bf-sign-up-label">{signup.signupTitle}</p>
                                        <div className="mt5">
                                            <Input 
                                                placeholder={signup.signupPlaceholderText} 
                                                size="large"
                                                value={this.state.email} 
                                                onChange={this.handleChange}
                                                errorMessage={this.state.errors.email}/>
                                        </div>
                                        <div className="mt-5">
                                            <div id="bf-sign-up-success-msg" className="bf-sign-up-success-msg"></div>
                                            <div id="bf-sign-up-error-msg" className="bf-sign-up-error-msg"></div>
                                        </div>
                                        <div className="mt-5">
                                            <Button disabled={!this.state.optincheck} variation="primary" size="small" onClick={this.handleSubmit}>
                                                {signup.signupButtonText}
                                            </Button>
                                        </div>
                                        <div className="mt-5">
                                            <label 
                                                className="bf-privacy-label"
                                                for="privacy-policy">
                                                <input
                                                    className="bf-privacy-checkbox"
                                                    checked={this.state.optincheck}
                                                    type="checkbox"
                                                    id="privacy-policy"
                                                    name="privacy-policy"
                                                    onChange={e => this.setState({ optincheck: !this.state.optincheck })}
                                                /> {signup.optinCheckboxLabelText}
                                                <span className="bf-privacy-link">
                                                    <a 
                                                        className="privacy-link"
                                                        href={signup.signupPrivacyPolicyHref} 
                                                        target="_blank">
                                                        {signup.signupPrivacyPolicyText}
                                                    </a>
                                                </span>
                                                <span class="checkmark"></span>
                                            </label>
                                        </div>
                                    </div>
                                }
                            </div>

                            {  
                                window.innerWidth !== 1024 ?
                                    lists && lists.map( item => {
                                        return (
                                            <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2">
                                            <Collapsible
                                                className="bf-footer-title"
                                                openedClassName="bf-footer-title active"
                                                triggerClassName="bf-footer-title"
                                                triggerOpenedClassName="bf-footer-title active"
                                                trigger={<p className="bf-col-heading">{item.listTitle}</p>}
                                                triggerDisabled={!this.state.isMobile}
                                                open={!this.state.isMobile} >
                                                <div className="bf-link-section">
                                                    <ul>
                                                        {
                                                            item.listItems && item.listItems.map( listItem => {
                                                                return (
                                                                    <li>
                                                                    <a className="bf-link" href={listItem.linkPath}>{listItem.linkTitle}</a>
                                                                </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            </Collapsible>
                                        </div>
                                        )
                                    }) : null
                            }
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-md-3 col-lg-3 tnc-copyright-section mtop-50">
                                <a className="privacy-link" href={copyrightSection.privacyLinkHref} target="_blank">{copyrightSection.privacyLinkText}</a>
                                <span className="blog-footer-separator">|</span>
                                <a className="privacy-link" href={copyrightSection.termsofuseHref} target="_blank">{copyrightSection.termsofuseText}</a>
                            </div>
                            <div className="col-xs-12 col-md-9 col-lg-9 tnc-copyright-section mbtm-40 mtop-50">
                                <span className="copyright-text">{copyrightSection.copyrightText}</span>
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }
}

export default BlogFooter;