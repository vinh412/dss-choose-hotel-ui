import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import CustomCheckbox from "./CustomCheckbox";

function SeeAllCheckbox({ metadata, onChange }) {
  
  return (
    <Box>
      <Box p="8px">
        <Typography>Hotel Services</Typography>
        <Box p='16px'>
          <Grid container spacing={2}>
            {metadata.hotelServices.map((service, index) => (
                index >= 10 &&
              <Grid xs={4}>
                <CustomCheckbox
                  name="hotelServices"
                  item={service}
                  onChange={onChange}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Box p="8px">
        <Typography>Room Facilities</Typography>
        <Box p='16px'>
          <Grid container spacing={2}>
            {metadata.roomFacilities.map((service, index) => (
                index >= 10 &&
              <Grid xs={4}>
                <CustomCheckbox
                  name="roomFacilities"
                  item={service}
                  onChange={onChange}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Box p="8px">
        <Typography>Room View</Typography>
        <Box p='16px'>
          <Grid container spacing={2}>
            {metadata.roomViews.map((service, index) => (
                index >= 10 && 
              <Grid xs={4}>
                <CustomCheckbox
                  name="roomView"
                  item={service}
                  onChange={onChange}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default SeeAllCheckbox;
