import React from "react";

class SelectField extends React.Component {
  state = {
    active: false,
    value: "",
    error: false
  };

  componentDidMount() {
    this.el.addEventListener("invalid", this.validate);
  }

  componentWillUnmount() {
    this.el.removeEventListener("invalid", this.validate);
  }

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
    const { isRequired, options, label, inputId, inputName } = this.props;

    let classes = ["contact-enteprise-float-container"];
    if (this.state.active || this.state.value) {
      classes.push("active");
    } else if (this.state.error) {
      classes.push("float-container-error");
    } else {
      classes.push("contact-enteprise-float-container");
    }

    if (options && !this.state.active) {
      classes.push("hidden");
    }

    return (
      <div className="inline">
        <div className={classes.join(" ")}>
          <label htmlFor={inputName}>{label}</label>
          {options.length > 0 && (
            <select
              ref={e => (this.el = e)}
              onChange={e => this.onChange(e)}
              onFocus={() => this.setState({ active: true })}
              onBlur={e => this.onBlur(e)}
              className="form-control"
              id={inputId}
              name={inputName}
              title={label}
              value={this.state.value}
              required={isRequired}
            >
              {options.map((option, key) => (
                <option key={key} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div
          className={
            this.state.error ? "error-message visible" : "error-message"
          }
        >
          <div className="form-item form-type-item form-group">
            * This field is required.
          </div>{" "}
        </div>
      </div>
    );
  }
}

export default SelectField;
