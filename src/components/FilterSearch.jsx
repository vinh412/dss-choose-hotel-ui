import {
  Box,
  Button,
  Modal,
  Slider,
  Divider,
  Typography,
  Rating,
  Link,
} from "@mui/material";
import * as React from "react";
import Map from "./Map";
import CheckboxGroup2 from "./CheckboxGroup2";
import NumberInput from "./NumberInput";
import { numberWithDot } from "../ultis/helper";
import SeeAllCheckbox from "./SeeAllCheckbox";

const minPrice = 0;
const maxPrice = 66000000;
const minDistance = 0;
const stepPrice = 10;

const priceText = (price) => {
  return `${numberWithDot(price)}đ`;
};

function FilterSearch({ setHotelList }) {
  const [metadata, setMetadata] = React.useState(null);
  const [bedTypes, setBedTypes] = React.useState({});
  const [userChoice, setUserChoice] = React.useState({
    roomServices: [],
    hotelServices: [],
    roomFacilities: [],
    roomView: [],
  });
  const [location, setLocation] = React.useState({});
  const [price, setPrice] = React.useState([minPrice, maxPrice]);
  const [score, setScore] = React.useState(3);

  const [open, setOpen] = React.useState(false);
  const [openSeeMore, setOpenSeeMore] = React.useState(false);

  const handleChangeSlider = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPrice([Math.min(newValue[0], price[1] - minDistance), price[1]]);
    } else {
      setPrice([price[0], Math.max(newValue[1], price[0] + minDistance)]);
    }
  };

  React.useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/metadata")
      .then((response) => response.json())
      .then((response) => {
        let notSame = response.hotelServices.filter((service) => {
          let isSame = false;
          response.roomFacilities.forEach((facility) => {
            if (service.name === facility.name && service.id === facility.id)
              isSame = true;
          });
          return !isSame;
        });
        response.hotelServices = notSame;
        console.log(notSame);
        return response;
      })
      .then((response) => setMetadata(response))
      .catch((error) => console.log(error));
  }, []);

  const handleChangeCheckBox = (event) => {
    const { value, checked, name } = event.target;
    const { roomServices, hotelServices, roomView, roomFacilities } =
      userChoice;

    if (name === "roomServices") {
      if (checked) {
        setUserChoice({
          roomServices: [...roomServices, parseInt(value)],
          hotelServices,
          roomFacilities,
          roomView,
        });
      } else {
        setUserChoice({
          roomServices: roomServices.filter((e) => e !== parseInt(value)),
          hotelServices,
          roomFacilities,
          roomView,
        });
      }
    } else if (name === "hotelServices") {
      if (checked) {
        setUserChoice({
          roomServices,
          hotelServices: [...hotelServices, parseInt(value)],
          roomFacilities,
          roomView,
        });
      } else {
        setUserChoice({
          roomServices,
          hotelServices: hotelServices.filter((e) => e !== parseInt(value)),
          roomFacilities,
          roomView,
        });
      }
    } else if (name === "roomFacilities") {
      if (checked) {
        setUserChoice({
          roomServices,
          hotelServices,
          roomFacilities: [...roomFacilities, parseInt(value)],
          roomView,
        });
      } else {
        setUserChoice({
          roomServices,
          hotelServices,
          roomFacilities: roomFacilities.filter((e) => e !== parseInt(value)),
          roomView,
        });
      }
    } else if (name === "roomView") {
      if (checked) {
        setUserChoice({
          roomServices,
          hotelServices,
          roomFacilities,
          roomView: [...roomView, value],
        });
      } else {
        setUserChoice({
          roomServices,
          hotelServices,
          roomFacilities,
          roomView: roomView.filter((e) => e !== value),
        });
      }
    }
  };

  const handleChoiceBedTypes = (event) => {
    const { value, id } = event.target;
    if (value !== "0") {
      setBedTypes({
        ...bedTypes,
        [id]: parseInt(value),
      });
    } else {
      delete bedTypes[id];
      setBedTypes(bedTypes);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const requestBody = {
      latitude: location.latitude,
      longitude: location.longitude,
      priceStart: price[0],
      priceEnd: price[1],
      ...userChoice,
      beds: bedTypes,
      star: score,
      roomView: userChoice.roomView.toString(),
    };

    console.log(JSON.stringify(requestBody));
    fetch("http://127.0.0.1:8000/api/v1/query", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((response) => setHotelList(response));
  };
  return (
    <Box sx={{ width: "25%", p: "0px 16px" }}>
      <Box sx={{ cursor: "pointer" }} onClick={() => setOpen(true)}>
        <img src="https://cdn6.agoda.net/images/MAPS-1214/default/property-map-entry-1.svg" />
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "800px",
            height: "600px",
          }}
        >
          <Map setLocation={setLocation} />
        </Box>
      </Modal>
      <Box>
        <Divider orientation="horizontal" />
        <Typography>Price per night</Typography>
        <Slider
          size="small"
          getAriaLabel={() => "Minimum distance"}
          value={price}
          min={minPrice}
          max={maxPrice}
          step={stepPrice}
          onChange={handleChangeSlider}
          valueLabelDisplay="auto"
          getAriaValueText={priceText}
          valueLabelFormat={priceText}
          disableSwap
        />
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Typography fontSize={12}>{`${numberWithDot(price[0])}đ`}</Typography>
          <Typography fontSize={12}>{`${numberWithDot(price[1])}đ`}</Typography>
        </Box>
      </Box>

      {metadata !== null && (
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" rowGap="8px">
            <Box>
              <Divider orientation="horizontal" />
              <Typography>Rating</Typography>
              <Rating
                value={score}
                precision={0.5}
                onChange={(event, newScore) => {
                  setScore(newScore);
                }}
              />
            </Box>
            <CheckboxGroup2
              name="roomServices"
              title="Room Services"
              array={metadata.roomServices}
              onChange={handleChangeCheckBox}
            />
            <CheckboxGroup2
              name="hotelServices"
              title="Hotel Services"
              array={metadata.hotelServices}
              onChange={handleChangeCheckBox}
            />
            <CheckboxGroup2
              name="roomFacilities"
              title="Room Facilities"
              array={metadata.roomFacilities}
              onChange={handleChangeCheckBox}
            />
            <CheckboxGroup2
              name="roomView"
              title="Room Views"
              array={metadata.roomViews}
              onChange={handleChangeCheckBox}
            />
            <NumberInput
              name="bedTypes"
              title="Bed Types"
              array={metadata.bedTypes}
              onChange={handleChoiceBedTypes}
            />
            <Link onClick={() => setOpenSeeMore(true)} variant="body2" sx={{ cursor: "pointer" }}>
              See more
            </Link>
            <Modal open={openSeeMore} onClose={() => setOpenSeeMore(false)}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "800px",
                  height: "600px",
                  bgcolor: "white",
                  overflow: 'auto',
                  borderRadius: '8px',
                }}
              >
                <SeeAllCheckbox metadata={metadata} onChange={handleChangeCheckBox}/>
              </Box>
            </Modal>
            <Button type="submit" variant="contained" size="small">
              Submit
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
}

export default FilterSearch;
