import React from "react";
import "./MotoGiftWithPurchaseThankYou.global.css"

class MotoGiftWithPurchaseThankYou extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        const {formFields,formProps} = this.props;
        return (
            <div className="gwp-thank-you">
                <div className="gwp-thank-you-container">
                    {formProps.gwpthankyouheader ? (
                        <div
                            className="gwp-thankyou-header"
                            dangerouslySetInnerHTML={{ __html: formProps.gwpthankyouheader }}
                        ></div>
                    ) : null}
                    <div className="gwp-thankyou-logo-image">
                        <img src={formProps.gwpthankyouLogo} alt={formProps.gwpthankyouLogoAltText ? formProps.gwpthankyouLogoAltText : formProps.gwpthankyouLogo} />
                    </div>
                    <div className="gwp-thankyou-section">
                        {formProps.gwpthankyousectionHeading ? (
                            <div
                                className="gwp-thankyou-sectionheading"
                                dangerouslySetInnerHTML={{ __html: formProps.gwpthankyousectionHeading }}
                            ></div>
                        ) : null}
                       <div className="gwp-thankyou-formcontent">
                           <div>{formProps.firstNameLabel}: {formFields.firstName}</div>
                           <div>{formProps.lastNameLabel}: {formFields.lastName}</div>
                           <div>{formProps.address}: {formFields.address}</div>
                           <div>{formProps.city}: {formFields.city}</div>
                           <div>{formProps.province}: {formFields.province}</div>
                           <div>{formProps.postalCode}: {formFields.postalCode}</div>
                           <div>{formProps.phone}: {formFields.phone}</div>
                           <div>{formProps.serialNumber}: {formFields.serialNumber}</div>
                           <div>{formProps.dateOfPurchase}: {formFields.purchaseDate}</div>
                        </div>
                        <div className="gwp-thank-you-validate" dangerouslySetInnerHTML={{ __html: formProps.gwpthankyouvalidate }}></div>
                        <div className="gwp-thank-you-notifymail" dangerouslySetInnerHTML={{ __html: formProps.gwpthankyounotifymail }}></div>
                        <div className="gwp-thank-you-regards" dangerouslySetInnerHTML={{ __html: formProps.gwpthankyouregards }}></div>
                        <div className="gwp-thank-you-signature" dangerouslySetInnerHTML={{ __html: formProps.gwpthankyouSignature }}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MotoGiftWithPurchaseThankYou;
