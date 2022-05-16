import React from "react";
import styles from "./option-field.css";
class OptionField extends React.Component {
  state = {
    active: false,
    value: "",
    error: false
  };

  validate = e => {
    e.preventDefault();
    this.setState({ error: true });
  };

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  onBlur = e => {
    this.setState({ active: false, error: !e.target.value ? true : false });
  };

  render() {
    const { options, label, inputName } = this.props;

    return (
      <div className={styles["option-field-container"]}>
        <div className={styles["option-field-wrapper"]}>
          <label htmlFor={inputName}>{label}</label>
          <div className={styles["options"]}>
            {options.map((option, key) => (
              <div className={styles["option"]}>
                <input
                  type="radio"
                  name={inputName}
                  key={key}
                  value={option.value}
                  id={option.name + key}
                />
                <label for={option.name + key}>{option.name}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default OptionField;
