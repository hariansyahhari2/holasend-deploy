import React from 'react';
import './input.scss';

const Input = ({label, required, ...rest}) => { //rest artinya semua property di dalam input juga termasuk untuk dijadikan props, contohnya value onChange, dll
    return (
        <div className="input-wrapper">
            <p className="label">{label} {required ? <span style={{color: 'red'}}>*</span> : null} </p>
            <input className="input" {...rest} />
        </div>
    )
}

export default Input;
