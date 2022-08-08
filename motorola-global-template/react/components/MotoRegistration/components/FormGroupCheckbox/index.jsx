import { Component } from 'react';
import Radium from 'radium';
import radiumStyles from '../../Common/radiumStyles.json';

class FormGroupCheckbox extends Component {
    constructor(props) {
        super(props);

        this.customStyles = {
            wrapper: {
                position: 'relative',
                display: 'block'
            },
            input: {
                cursor: 'pointer'
            },
            label: {
                minHeight: '20px',
                paddingLeft: '10px',
                marginBottom: '0',
                fontWeight: 'normal',
                cursor: 'pointer'
            }
        };

        this.hasExternalStyles =
            props.externalStyles
            && (Object.keys(props.externalStyles).length > 0);
    }

    render() {
        return (
            <div style={[
                radiumStyles.formElement,
                this.hasExternalStyles && this.props.externalStyles.checkbox
            ]}>
                <div style={this.customStyles.wrapper}>
                    <input
                        type="checkbox"
                        name={this.props.name}
                        id={this.props.name}
                        checked={this.props.checked}
                        onChange={this.props.onChange} 
                        style={this.customStyles.input}
                    />
                    <label
                        htmlFor={this.props.name}
                        style={this.customStyles.label}
                    >{this.props.label}</label>
                    <div style={[
                        radiumStyles.longErrorMessage,
                        this.hasExternalStyles && this.props.externalStyles.errorMessage
                    ]}>{this.props.errorMessage}</div>
                </div>
            </div>
        );
    }
}

export default Radium(FormGroupCheckbox);