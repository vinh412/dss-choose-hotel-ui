import { Box, Container } from "@mui/material";
import React from "react";
import FilterSearch from "../components/FilterSearch";
import Map from "../components/Map";
import HotelList from "../components/HotelList";

function Home() {
  const [hotelList, setHotelList] = React.useState({});

  return (
    <Container maxWidth="lg" sx={{ marginTop: "16px" }}>
      <Box display="flex" flexDirection="row">
        <FilterSearch setHotelList={setHotelList} />
        {hotelList.hotels && <HotelList hotelList={hotelList.hotels} />}
      </Box>
    </Container>
  );
}

export default Home;
