import React, { useState } from "react";

export const Input = (props) => {
  const [query, setQuery] = useState('');

  const onChange = (e) => {
    const nextQuery = e.target.value;
    setQuery(nextQuery);
    props.onChange(nextQuery);
  };

  return (
    <div class="input-group">
      <input type="text" class="form-control" value={query} onChange={onChange} />
    </div>
  );
};
