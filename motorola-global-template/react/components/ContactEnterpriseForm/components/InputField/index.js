import React from "react";

class InputField extends React.Component {
  state = {
    active: false,
    value: "",
    error: false,
    blank: false
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
    this.setState({
      active: false,
      blank: !e.target.value ? true : false,
      error: !this.el.checkValidity()
    });
  };

  render() {
    const {
      isRequired,
      label,
      inputId,
      inputName,
      maxLength,
      size,
      type,
      pattern
    } = this.props;

    let classes = ["contact-enteprise-float-container"];
    if (this.state.active || this.state.value) {
      classes.push("active");
    } else if (this.state.error || this.state.blank) {
      classes.push("float-container-error");
    } else {
      classes.push("contact-enteprise-float-container");
    }

    return (
      <div className="inline">
        <div className={classes.join(" ")}>
          <label htmlFor={inputName}>{label}</label>
          <input
            ref={e => (this.el = e)}
            className="form-control"
            onFocus={() => this.setState({ active: true })}
            onBlur={e => this.onBlur(e)}
            id={inputId}
            onChange={e => this.onChange(e)}
            maxLength={maxLength}
            name={inputName}
            size={size}
            type={type || "text"}
            pattern={pattern}
            required={isRequired}
          />
        </div>
        <div
          className={
            this.state.error ? "error-message visible" : "error-message"
          }
        >
          <div className="form-item form-type-item form-group">
            {this.state.blank
              ? "* This field is required."
              : "* This response is invalid. Please try again"}
          </div>{" "}
        </div>
      </div>
    );
  }
}

export default InputField;
