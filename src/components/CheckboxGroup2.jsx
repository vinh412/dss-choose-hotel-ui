import { Box, Divider, Typography } from "@mui/material";
import React from "react";

function CheckboxGroup2({ title, name, array, onChange }) {
  return (
    <Box>
      <Divider orientation="horizontal" />
      <Box>
        <Typography>{title}</Typography>
      </Box>
      {array.map((item) => (
        <div key={typeof item === 'object' ? item.name + item.id : item}>
          <input
            style={{ width: 10, height: 10 }}
            type="checkbox"
            id={typeof item === 'object' ? item.name + item.id : item}
            name={name}
            value={typeof item === 'object' ? item.id : item}
            onChange={onChange}
          />
          <label htmlFor={typeof item === 'object' ? item.name + item.id : item} style={{ fontSize: 12 }}>
            {typeof item === 'object' ? item.name : item}
          </label>
        </div>
      ))}
    </Box>
  );
}

export default CheckboxGroup2;
