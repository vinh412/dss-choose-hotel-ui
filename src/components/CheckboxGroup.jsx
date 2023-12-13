import {
  Box,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";

function CheckboxGroup({ metadata }) {
  return (
    <Box>
      {Object.keys(metadata).map((key) => (
        <Box key={key}>
          <Divider orientation="horizontal" />
          <Box>
            <Typography>{metadata[key].title}</Typography>
          </Box>
          <Box display="flex" flexDirection="column">
            {metadata[key].content.map((item) =>
              typeof item === "object" ? (
                <div>
                  <input
                    style={{ width: 10, height: 10 }}
                    type="checkbox"
                    id={item.name + item.id}
                    name={key}
                    value={item.id}
                  />
                  <label htmlFor={item.name + item.id} style={{ fontSize: 12 }}>
                    {item.name}
                  </label>
                </div>
              ) : (
                <div>
                  <input
                    style={{ width: 10, height: 10 }}
                    type="checkbox"
                    id={item}
                    name={key}
                    value={item}
                  />
                  <label htmlFor={item} style={{ fontSize: 12 }}>
                    {item}
                  </label>
                </div>
              )
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default CheckboxGroup;
