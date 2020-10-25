import React, { useState } from "react";

export const Input = (props) => {
  const onChange = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <div class="input-group">
      <input type="text" class="form-control" value={props.value} onChange={onChange} />
    </div>
  );
};
