import {
  Box,
  Button,
  Modal,
  Slider,
  Divider,
  Typography,
  Rating,
} from "@mui/material";
import * as React from "react";
import Map from "./Map";
import CheckboxGroup2 from "./CheckboxGroup2";
import NumberInput from "./NumberInput";
import { numberWithDot } from "../ultis/helper";

const minPrice = 0;
const maxPrice = 66000000;
const minDistance = 0;
const stepPrice = 10;

const priceText = (price) => {
    return `${numberWithDot(price)}đ`;
};

function FilterSearch() {
  const [metadata, setMetadata] = React.useState(null);
  const [bedTypes, setBedTypes] = React.useState({});
  const [userChoice, setUserChoice] = React.useState({
    roomServices: [],
    hotelServices: [],
    roomFacilities: [],
    roomViews: [],
  });
  const [location, setLocation] = React.useState({});
  const [price, setPrice] = React.useState([minPrice, maxPrice]);
  const [score, setScore] = React.useState(3);

  const [open, setOpen] = React.useState(false);

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
      .then((response) => setMetadata(response))
      .catch((error) => console.log(error));
  }, []);

  const handleChangeCheckBox = (event) => {
    const { value, checked, name } = event.target;
    const { roomServices, hotelServices, roomViews, roomFacilities } = userChoice;

    if (name === "roomServices") {
      if (checked) {
        setUserChoice({
          roomServices: [...roomServices, parseInt(value)],
          hotelServices,
          roomFacilities,
          roomViews,
        });
      } else {
        setUserChoice({
          roomServices: roomServices.filter((e) => e !== parseInt(value)),
          hotelServices,
          roomFacilities,
          roomViews,
        });
      }
    } else if (name === "hotelServices") {
      if (checked) {
        setUserChoice({
          roomServices,
          hotelServices: [...hotelServices, parseInt(value)],
          roomFacilities,
          roomViews,
        });
      } else {
        setUserChoice({
          roomServices,
          hotelServices: hotelServices.filter((e) => e !== parseInt(value)),
          roomFacilities,
          roomViews,
        });
      }
    } else if (name === "roomFacilities") {
      if (checked) {
        setUserChoice({
          roomServices,
          hotelServices,
          roomFacilities: [...roomFacilities, parseInt(value)],
          roomViews,
        });
      } else {
        setUserChoice({
          roomServices,
          hotelServices,
          roomFacilities: roomFacilities.filter((e) => e !== parseInt(value)),
          roomViews,
        });
      }
    } else if (name === "roomViews") {
      if (checked) {
        setUserChoice({
          roomServices,
          hotelServices,
          roomFacilities,
          roomViews: [...roomViews, value],
        });
      } else {
        setUserChoice({
          roomServices,
          hotelServices,
          roomFacilities,
          roomViews: roomViews.filter((e) => e !== value),
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
      score: score,
    };
    console.log(requestBody);
  };
  return (
    <Box sx={{ width: "25%", p: '0px 16px'}} >
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
        <Box display='flex' flexDirection='row' justifyContent='space-between'>
          <Typography fontSize={12}>{`${numberWithDot(price[0])}đ`}</Typography>
          <Typography fontSize={12}>{`${numberWithDot(price[1])}đ`}</Typography>
        </Box>
      </Box>

      {metadata !== null && (
        <form onSubmit={handleSubmit}>
          <Box>
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
              name="roomViews"
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
          </Box>
          <Button type="submit" variant="contained" size="small">
            Submit
          </Button>
        </form>
      )}
    </Box>
  );
}

export default FilterSearch;
