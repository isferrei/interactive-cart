import { Component } from 'react';
import Radium from 'radium';
import radiumStyles from '../../Common/radiumStyles.json';

class FormGroupInputText extends Component {
    constructor(props) {
        super(props);

        this.hasExternalStyles =
            props.externalStyles
            && (Object.keys(props.externalStyles).length > 0);

        this.customStyles = {
            formGroup: {
                marginBottom: '15px'
            },
            inputText: {
                display: 'block',
                padding: '6px 12px',
                fontSize: '14px',
                lineHeight: '1.42857143',
                color: '#1a1a1a',
                backgroundImage: 'none',
                WebkitBoxShadow: 'inset 0 1px 1px rgba(0,0,0,0.075)',
                MozBoxShadow: 'inset 0 1px 1px rgba(0,0,0,0.075)',
                boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.075)',
                WebkitTransition: 'border-color ease-in-out .15s,box-shadow ease-in-out .15s',
                OTransition: 'border-color ease-in-out .15s,box-shadow ease-in-out .15s',
                transition: 'border-color ease-in-out .15s,box-shadow ease-in-out .15s',
                marginBottom: '25px',
                borderRadius: '4px',
                border: '1px solid #d9d9d9',
                height: '35px',
                opacity: '1',
                backgroundColor: '#fff',
                width: '100%'
            },
            input: {
                ':focus': {
                    outline: '0',
                    boxShadow: 'none'
                }
            },
            inputTextError: {
                border: '1px solid #ffa2a2',
                backgroundColor: '#fff2f2'
            }
        };
    }

    render() {
        return (
            <div style={radiumStyles.formElement}>
                <div style={this.customStyles.formGroup}>
                    <input
                        name={this.props.id}
                        id={this.props.id}
                        type="text"
                        placeholder={this.props.placeholder}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        style={[
                            this.customStyles.inputText,
                            this.customStyles.input,
                            !!this.props.errorMessage && this.customStyles.inputTextError,
                            this.props.additionalStyles
                        ]}
                    />
                </div>
                <div style={[
                    radiumStyles.errorMessage,
                    this.hasExternalStyles && this.props.externalStyles.errorMessage
                ]}>{this.props.errorMessage}</div>
            </div>
        );
    }
}

export default Radium(FormGroupInputText);