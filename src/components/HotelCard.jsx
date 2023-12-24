import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Collapse,
  Rating,
  Typography,
  IconButton,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import React from "react";
import Tag from "./Tag";
import { numberWithDot } from "../ultis/helper";
import "./HotelCard.css";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function HotelCard({ hotel }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: "100%" }}>
      <Box display="flex">
        <CardMedia
          component="img"
          image={hotel.image_url}
          sx={{ width: "200px" }}
        />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <CardContent>
            <Typography variant="h5">{hotel.name}</Typography>
            <Rating value={hotel.star} precision={0.5} readOnly />
            <Box display="flex">
              <PlaceIcon />
              <Typography variant="body2" sx={{ alignSelf: "center" }}>
                {hotel.address}
              </Typography>
            </Box>
            <Box display="flex" flexWrap="wrap" gap="4px" mt="8px">
              {hotel.hotelServices &&
                hotel.hotelServices.map((service) => <Tag content={service} />)}
            </Box>
          </CardContent>
          <Box display="flex" justifyContent="space-between" pl="16px">
            <Typography alignSelf="center" color="red" variant="body1">
              Có {hotel.rooms.length} phòng
            </Typography>
            <ExpandMore expand={expanded} onClick={handleExpandClick}>
              <ExpandMoreIcon />
            </ExpandMore>
          </Box>
        </Box>
      </Box>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {hotel.rooms.map((room) => (
          <CardContent>
            <Box display="flex">
              <CardMedia
                component="img"
                image={room.image_url}
                sx={{ width: "100px" }}
              />
              <Box display="flex" justifyContent="space-between" width="100%">
                <CardContent>
                  <Typography>{room.name}</Typography>
                  <Box display="flex" flexWrap="wrap" gap="4px" mt="8px">
                    {room.facilities &&
                      room.facilities.map((facilities) => (
                        <Tag content={facilities} />
                      ))}
                    {room.view && <Tag content={room.view} />}
                    {room.services &&
                      room.services.map((service) => <Tag content={service} />)}
                    {room.beds &&
                      Object.keys(room.beds).map((bedname) => {
                        if (room.beds[bedname] > 0)
                          return (
                            <Tag
                              content={bedname + " x" + room.beds[bedname]}
                            />
                          );
                      })}
                  </Box>
                </CardContent>
                <Box display="flex" flexDirection="column" alignSelf="center">
                  {room.before_discount_price && (
                    <Typography alignSelf="center" className="strikethrough">
                      {numberWithDot(room.before_discount_price)}$
                    </Typography>
                  )}
                  {room.cheapest_price && (
                    <Typography fontSize="20px" fontWeight="bold" color="red">
                      {numberWithDot(room.cheapest_price)}$
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </CardContent>
        ))}
      </Collapse>
    </Card>
  );
}

export default HotelCard;
