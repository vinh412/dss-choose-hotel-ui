import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import CustomCheckbox from "./CustomCheckbox";

function CheckboxGroup2({ title, name, array, onChange }) {
  return (
    <Box>
      <Divider orientation="horizontal" />
      <Box>
        <Typography>{title}</Typography>
      </Box>
      {array.map((item, index) => (
        index < 10 &&
        <CustomCheckbox name={name} item={item} onChange={onChange}/>
      ))}
    </Box>
  );
}

export default CheckboxGroup2;
