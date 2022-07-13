import React from "react";
const Input = ({ type = "text", name, label, value, errors, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        className="form-control"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
      {errors && <p className="alert-danger px-2">{errors[name]}</p>}
    </div>
  );
};

export default Input;
