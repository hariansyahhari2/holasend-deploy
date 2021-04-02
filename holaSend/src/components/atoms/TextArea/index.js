import React from "react";

const TextArea = ({label, ...rest}) => {
  return (
    <div class="form-group">
      <p className="label">{label}</p>
      <textarea
        class="form-control"
        rows="3" {...rest}
      ></textarea>
    </div>
  );
};

export default TextArea;
