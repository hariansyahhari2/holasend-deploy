import React from "react";

const TextArea = ({label, required, ...rest}) => {
  return (
    <div class="form-group">
      <p className="label">{label} {required ? <span style={{color: 'red'}}>*</span> : null} </p>
      <textarea
        class="form-control"
        rows="3" {...rest}
      ></textarea>
    </div>
  );
};

export default TextArea;
