import React from 'react'

const DropdownList = ({value, required, data, placeholder, label, handleDropdown, disabled}) => {

    const handleChange = (e) => {
        handleDropdown(e.target.value)
    } 

    return (
        <div className="input-wrapper">
            <p className="label">{label} {required ? <span style={{color: 'red'}}>*</span> : null} </p>
            <select
                value={value}
                className="form-control"
                onChange={(e) => handleChange(e)}
                disabled={disabled}>
                <option value="">{placeholder}</option>
                {data.map((item, key) => (
                    <option
                        key={key}
                        value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default DropdownList
