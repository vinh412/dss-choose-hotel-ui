import { Box } from "@mui/material";
import React from "react";
import HotelCard from "./HotelCard";

function HotelList({ hotelList }) {
  return (
    <Box
      sx={{ p: "0px 16px", width: "75%" }}
      display="flex"
      flexDirection="column"
      rowGap="16px"
    >
      {hotelList.map((hotel) => (
        <HotelCard hotel={hotel} />
      ))}
    </Box>
  );
}

export default HotelList;
