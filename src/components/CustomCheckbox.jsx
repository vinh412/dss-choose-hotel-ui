import React from "react";

function CustomCheckbox({item, onChange, name}) {
  return (
    <div key={typeof item === "object" ? item.name + item.id : item}>
      <input
        style={{ width: 10, height: 10 }}
        type="checkbox"
        id={typeof item === "object" ? item.name + item.id : item}
        name={name}
        value={typeof item === "object" ? item.id : item}
        onChange={onChange}
      />
      <label
        htmlFor={typeof item === "object" ? item.name + item.id : item}
        style={{ fontSize: 12 }}
      >
        {typeof item === "object" ? item.name : item}
      </label>
    </div>
  );
}

export default CustomCheckbox;
