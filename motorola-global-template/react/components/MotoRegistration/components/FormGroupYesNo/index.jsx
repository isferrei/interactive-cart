import { Component } from 'react';
import Radium from 'radium';
import radiumStyles from '../../Common/radiumStyles.json';

class FormGroupYesNo extends Component {
    constructor(props) {
        super(props);

        this.styles = {
            label: {
                paddingLeft: '6px',
                paddingRight: '10px',
                cursor: 'pointer'
            },
            input: {
                marginLeft: '10px',
                cursor: 'pointer'
            }
        };

        this.hasExternalStyles =
            props.externalStyles
            && (Object.keys(props.externalStyles).length > 0);
    }

    render() {
        return (
            <div style={radiumStyles.formElement}>
                <label>{this.props.labelMain}</label>
                <input
                    type="radio"
                    name={this.props.name}
                    id={this.props.idYes}
                    value="Y"
                    checked={this.props.checkedYes}
                    onChange={this.props.onChange}
                    style={this.styles.input}
                />
                <label
                    htmlFor={this.props.idYes}
                    style={this.styles.label}
                >{this.props.labelYes}</label>
                <input
                    type="radio"
                    name={this.props.name}
                    id={this.props.idNo}
                    value="N"
                    checked={this.props.checkedNo}
                    onChange={this.props.onChange}
                    style={this.styles.input}
                />
                <label
                    htmlFor={this.props.idNo}
                    style={this.styles.label}
                >{this.props.labelNo}</label>
                <div style={[
                    radiumStyles.longErrorMessage,
                    this.hasExternalStyles && this.props.externalStyles.errorMessage
                ]}>{this.props.errorMessage}</div>
            </div>
        );
    }
}

export default Radium(FormGroupYesNo);