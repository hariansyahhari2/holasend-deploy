import React from 'react';
import './input.scss';

const Input = ({label, ...rest}) => { //rest artinya semua property di dalam input juga termasuk untuk dijadikan props, contohnya value onChange, dll
    return (
        <div className="input-wrapper">
            <p className="label">{label}</p>
            <input className="input" {...rest} />
        </div>
    )
}

export default Input;
