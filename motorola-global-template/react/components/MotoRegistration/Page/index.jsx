import { Component } from 'react';
import {
    handleChangeGlobal,
    validateFormGlobal,
    sendFormGlobal,
    prepareAccountUrl,
    accountsTest
} from '../Common/Handlers';
import Radium, { StyleRoot } from 'radium';
import schemaProperties from '../Common/schemaProperties.json';
import radiumStyles from '../Common/radiumStyles.json';
import FormGroupInputText from '../components/FormGroupInputText/index.jsx';
import FormGroupYesNo from '../components/FormGroupYesNo/index.jsx';
import FormGroupCheckbox from '../components/FormGroupCheckbox/index.jsx';
import Cookies from 'universal-cookie';
import '../Common/SpinnerLine.global.css';

class MotoRegPageContent extends Component {
    constructor(props) {
        super(props);

        let optInDefault = '';
        if (props.optIn) {
            switch (props.optIn.defaultValue) {
                case 'Y':
                    optInDefault = true;
                    break;
                case 'N':
                    optInDefault = false;
                    break;
                default:
                    optInDefault = '';
            }
        }

        const ageCheckValue = (props.ageCheck && props.ageCheck.defaultValue) || false;

        this.state = {
            showForm: true,
            showSpinner: false,
            accountUrl: '/',
            form: {
                firstName: '',
                lastName: '',
                email: '',
                optIn: optInDefault,
                ageConfirm: ageCheckValue
            },
            errors: {
                firstName: '',
                lastName: '',
                email: '',
                optIn: '',
                ageConfirm: ''
            }
        };

        this.customStyles = {
            mainContainer: {
                backgroundColor: 'rgb(48, 56, 76)',
                fontSize: '14px',
                lineHeight: '18px',
                fontFamily: '"Gotham A", "Gotham B", ruble, Calibri, Arial, sans-serif',

                '@media only screen and (min-width: 280px)': {
                    backgroundImage: 'none'
                },

                '@media only screen and (min-width: 768px)': {
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundImage: `url(${props.formBackgroundImageUrlTablet})`
                },

                '@media only screen and (min-width: 992px)': {
                    backgroundImage: `url(${props.formBackgroundImageUrl})`,
                }
            },
            formContainerMargin: {
                '@media only screen and (min-width: 280px)': {
                    margin: '0 auto 50px'
                },

                '@media only screen and (min-width: 768px)': {
                    margin: '30px auto 50px'
                }
            },
            registrationForm: {
                'color': '#fff',
                'maxWidth': '1200px',

                '@media only screen and (min-width: 768px)': {
                    'width': '735px',
                    'marginRight': 'auto',
                    'marginLeft': 'auto',
                    'paddingLeft': '7.5px',
                    'paddingRight': '7.5px'
                }
            },
            formContent: {
                padding: '0 30px',
                width: '100%',

                '@media only screen and (min-width: 768px)': {
                    padding: '0 33px'
                },

                '@media screen and (min-width: 992px)': {
                    padding: '0 15px'
                }
            },
            header: {
                margin: '0 auto',
                textAlign: 'inherit',
                paddingBottom: '27px',
                paddingTop: '33px'
            },
            headerDescription: {
                paddingBottom: '10px',
                fontSize: '14px'
            },
            registerFields: {
                paddingTop: '15px'
            },
            footerDisclaimer: {
                padding: '0 0 15px',
                color: '#fff',
                fontSize: '11px',
                opacity: '.4',
                marginBottom: '10px'
            },
            cta: {
                color: `${(props.ctaButton && props.ctaButton.color) || '#FFFFFF'}`,
                border: `1px solid ${(props.ctaButton && props.ctaButton.borderColor) || '#FFFFFF'}`,
                ':hover': {
                    backgroundColor: `${(props.ctaButton && props.ctaButton.bgColorHover) || 'rgba(48,56,76,1.0)'}`,
                    border: `1px solid ${(props.ctaButton && props.ctaButton.borderColorHover) || '#FFFFFF'}`
                }
            },
            adaptiveWidth: {
                '@media only screen and (min-width: 280px)': {
                    width: '100%'
                },

                '@media only screen and (min-width: 768px)': {
                    width: '240px'
                },

                '@media screen and (min-width: 992px)': {
                    width: '350px'
                }
            },
            thankYouContent: {
                backgroundImage: `url(${this.props.thankYou && this.props.thankYou.backgoundImageUrl || ''})`
            },
            thanksBtn: {
                display: "inline-block",
                verticalAlign: "middle",
                touchAction: "manipulation",
                cursor: "pointer",
                "-webkitserSelect": "none",
                "-mozUserSelect": "none",
                "-msUserSelect": "none",
                userSelect: "none",
                fontSize: "16px",
                lineHeight: "50px",
                textAlign: "center",
                textDecoration: "none",
                outline: "0 !important",
                minWidth: "130px",
                height: "50px",
                marginBottom: "0",
                whiteSpace: "nowrap",
                "WebkitBoxShadow": "none !important",
                "MozBoxShadow": "none !important",
                boxShadow: "none !important",
                borderRadius: "25px",
                padding: "0px 25px",
                fontWeight: "500",
                marginTop: "23px",
                color: `${(props.thankYouButton && props.thankYouButton.color)
                    || (props.ctaButton && props.ctaButton.color)
                    || '#FFFFFF'}`,
                border: `2px solid ${(props.thankYouButton && props.thankYouButton.borderColor)
                    || (props.ctaButton && props.ctaButton.borderColor)
                    || '#FFFFFF'}`,
                backgroundColor: 'transparent',

                ':hover': {
                    backgroundColor: `${(props.thankYouButton && props.thankYouButton.bgColorHover)
                        || (props.ctaButton && props.ctaButton.bgColorHover)
                        || 'rgba(48,56,76,1.0)'}`,
                    border: `1px solid ${(props.thankYouButton && props.thankYouButton.borderColorHover)
                        || (props.ctaButton && props.ctaButton.borderColorHover)
                        || '#FFFFFF'}`
                },

                "@media only screen and (min-width: 1024px)": {
                    ":hover": {
                        borderRadius: "25px",
                        padding: "0px 25px",
                        fontWeight: "500"
                    }
                }
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.formHandler = this.formHandler.bind(this);

        this.cookies = new Cookies();

        setTimeout(() => {
            if (window.localStorage.getItem('test') === '1') {
                accountsTest(this.cookies.get('vtex_binding_address'));
            }
        }, 3000);
    }

    formHandler(event) {
        let self = this;
        event.preventDefault();

        const { isValid, errors } = validateFormGlobal(this.state, this.props);
        this.setState({ errors });

        if (!isValid) {
            return;
        }

        const accountUrl = prepareAccountUrl(this.cookies.get('vtex_binding_address'));
        this.setState({ accountUrl, showSpinner: true });

        sendFormGlobal(this.state.form, {
            ...this.props,
            accountUrl
        }).then(function(response) {
            self.setState({ showForm: false, showSpinner: false });
            window.localStorage.setItem('regsent', '1');
        }).catch(function(error) {
            self.setState({ showSpinner: false });
            console.log(error);
        });
    }

    handleChange(event) {
        let { name, value } = event.target;
        const newState = handleChangeGlobal(this.state, this.props, name, value);
        this.setState(newState);
    }

    getFormContent() {
        return (
            <div
                className="container-fluid"
                style={this.customStyles.mainContainer}
            >
                {this.state.showSpinner &&
                    (<div className="loadingBackdrop">
                        <div className="loader"></div>
                    </div>)
                }
                <div className="row">
                    <section
                        className="col-sm-12"
                        style={this.customStyles.formContainerMargin}
                    >
                        <section id="block-system-main">
                            <form
                                id="regform"
                                onSubmit={this.formHandler}
                                style={this.customStyles.registrationForm}
                            >
                                <div className="row">
                                    <div style={radiumStyles.mobileImage}>
                                        <img src={this.props.mobileImage} 
                                            alt={this.props.formBackgroundImageAltText} />
                                    </div>
                                    <div
                                        className="col-sm-offset-7 col-sm-5 col-lg-offset-7 col-lg-5"
                                        style={this.customStyles.formContent}
                                    >
                                        <div style={this.customStyles.header}>
                                            <img src={this.props.logoImageUrl} 
                                                alt={this.props.logoImageAltText} />
                                        </div>
                                        <div style={[
                                            this.customStyles.headerDescription,
                                            this.customStyles.adaptiveWidth
                                        ]}>{this.props.formDescription}</div>
                                        <div style={[
                                            this.customStyles.registerFields,
                                            this.customStyles.adaptiveWidth
                                        ]}>
                                            <FormGroupInputText
                                                id='firstName'
                                                placeholder={(this.props.firstName && this.props.firstName.placeholder) || ''}
                                                value={this.state.form.firstName}
                                                onChange={this.handleChange}
                                                errorMessage={this.state.errors.firstName}
                                                additionalStyles={this.customStyles.adaptiveWidth}
                                            />
                                            <FormGroupInputText
                                                id='lastName'
                                                placeholder={(this.props.lastName && this.props.lastName.placeholder) || ''}
                                                value={this.state.form.lastName}
                                                onChange={this.handleChange}
                                                errorMessage={this.state.errors.lastName}
                                                additionalStyles={this.customStyles.adaptiveWidth}
                                            />
                                            <FormGroupInputText
                                                id='email'
                                                placeholder={(this.props.email && this.props.email.placeholder) || ''}
                                                value={this.state.form.email}
                                                onChange={this.handleChange}
                                                errorMessage={this.state.errors.email}
                                                additionalStyles={this.customStyles.adaptiveWidth}
                                            />
                                            <FormGroupYesNo
                                                name='optIn'
                                                idYes='optInYes'
                                                idNo='optInNo'
                                                checkedYes={this.state.form.optIn}
                                                checkedNo={this.state.form.optIn !== '' && !this.state.form.optIn}
                                                onChange={this.handleChange}
                                                labelMain={(this.props.optIn && this.props.optIn.labelMain) || ''}
                                                labelYes={(this.props.optIn && this.props.optIn.labelYes) || ''}
                                                labelNo={(this.props.optIn && this.props.optIn.labelNo) || ''}
                                                errorMessage={this.state.errors.optIn}
                                            />
                                            <FormGroupCheckbox
                                                name='ageConfirm'
                                                checked={this.state.form.ageConfirm}
                                                onChange={this.handleChange}
                                                label={(this.props.ageCheck && this.props.ageCheck.label) || ''}
                                                errorMessage={this.state.errors.ageConfirm}
                                            />
                                            <div style={[
                                                this.customStyles.footerDisclaimer,
                                                this.customStyles.adaptiveWidth
                                            ]}>{this.props.disclaimer}</div>
                                            <div style={radiumStyles.formElement}>
                                                <button
                                                    type="submit"
                                                    value="Register"
                                                    style={[
                                                        radiumStyles.cta,
                                                        this.customStyles.cta
                                                    ]}
                                                >{(this.props.ctaButton && this.props.ctaButton.mainLabel) || ''}</button>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </section>
                    </section>
                </div>
            </div>
        );
    }

    getThanksContent() {
        return (
            <div style={[
                radiumStyles.thankYouContent,
                radiumStyles.thankYouPageContent,
                this.customStyles.thankYouContent
            ]}>
                <div style={radiumStyles.thankYouTitle}>{this.props.thankYou.header}</div>
                <div style={radiumStyles.thankYouDescription}>
                    <span>{this.props.thankYou.subHeaderFirstRow}</span>
                    <p>{this.props.thankYou.subHeaderSecondRow}</p>
                </div>
                <a href={(this.props.thankYouButton && this.props.thankYouButton.url) || this.state.accountUrl}
                    target=""
                    style={this.customStyles.thanksBtn}
                >
                    <span className="cta-library-label">{(this.props.thankYouButton && this.props.thankYouButton.mainLabel) || ''}</span>
                </a>
            </div>
        );
    }

    render() {
        return (
            <div id="MotoRegPage">
                {this.state.showForm
                    ? this.getFormContent()
                    : this.getThanksContent()}
            </div>
        );
    }
}

MotoRegPageContent = Radium(MotoRegPageContent);

class MotoRegPage extends Component {
    static schema = {
        title: 'Moto Registration Page',
        description: 'Moto registration page',
        type: 'object',
        properties: schemaProperties
    };

    render() {
        return (
            <StyleRoot>
                <MotoRegPageContent {...this.props}></MotoRegPageContent>
            </StyleRoot>
        );
    }
}

export default Radium(MotoRegPage);