import React from 'react';

const Input = (props) => {
    const { label, error, name, onChange, value, type } = props;
    const className = error ? "form-control is-invalid" : "form-control"
    return (
        <div className="form-group">
            <label>{label}</label>
            <input type={type} className={className} name={name} value={value} onChange={onChange} />
            <div className="invalid-feedback">
                {error}
            </div>
        </div>
    )
}

export default Input;