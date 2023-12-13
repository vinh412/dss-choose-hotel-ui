import { Box, Divider, Typography } from "@mui/material";
import React from "react";

function NumberInput({ array, title, name, onChange }) {
  return (
    <Box>
      <Divider orientation="horizontal" />
      <Typography>{title}</Typography>
      {array.map((item) => (
        <Box key={item} display="flex" flexDirection="row" justifyContent="space-between" paddingBottom='4px'>
          <label style={{ fontSize: 12 }} htmlFor={item}>
            {item}
          </label>
          <input id={item} name={name} type="number" min={0} style={{ width: 36, fontSize: 12 }} defaultValue={0} onChange={onChange}/>
        </Box>
      ))}
    </Box>
  );
}

export default NumberInput;
