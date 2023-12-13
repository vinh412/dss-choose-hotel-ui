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

function HotelCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: "100%" }}>
      <Box display="flex">
        <CardMedia
          component="img"
          image="https://i.ebayimg.com/images/g/pR4AAOSwTpZdrjl9/s-l1200.webp"
          sx={{ width: "200px" }}
        />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <CardContent>
            <Typography variant="h5">JW Marriott Hotel Hanoi</Typography>
            <Rating value={3.5} precision={0.5} readOnly />
            <Box display="flex">
              <PlaceIcon />
              <Typography variant="body2" sx={{ alignSelf: "center" }}>
                Từ Liêm, Hà Nội
              </Typography>
            </Box>
            <Box display="flex" flexWrap="wrap" gap="4px" mt="8px">
              <Tag content="Giường đôi" />
              <Tag content="Phòng tập" />
              <Tag content="Bể bơi" />
              <Tag content="TV" />
              <Tag content="Tủ lạnh" />
              <Tag content="Wifi" />
            </Box>
          </CardContent>
          <Box display="flex" justifyContent="space-between" pl="16px">
            <Typography alignSelf="center" color='red' variant="body1">Có 3 phòng phù hợp</Typography>
            <ExpandMore expand={expanded} onClick={handleExpandClick}>
              <ExpandMoreIcon />
            </ExpandMore>
          </Box>
        </Box>
      </Box>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Box display="flex">
            <CardMedia
              component="img"
              image="https://i.ebayimg.com/images/g/pR4AAOSwTpZdrjl9/s-l1200.webp"
              sx={{ width: "100px" }}
            />
            <Box display="flex" justifyContent="space-between" width="100%">
              <CardContent>
                <Typography>Tên Phòng</Typography>
                <Box display="flex" flexWrap="wrap" gap="4px" mt="8px">
                  <Tag content="Giường đôi" />
                  <Tag content="Phòng tập" />
                  <Tag content="Bể bơi" />
                  <Tag content="TV" />
                  <Tag content="Tủ lạnh" />
                  <Tag content="Wifi" />
                </Box>
              </CardContent>
              <Box display='flex' flexDirection='column' alignSelf='center'>
                <Typography alignSelf='center' className="strikethrough">{numberWithDot(2000000)}đ</Typography>
                <Typography fontSize='20px' fontWeight='bold' color='red'>{numberWithDot(1565000)}đ</Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
        <CardContent>
          <Box display="flex">
            <CardMedia
              component="img"
              image="https://i.ebayimg.com/images/g/pR4AAOSwTpZdrjl9/s-l1200.webp"
              sx={{ width: "100px" }}
            />
            <Box display="flex" justifyContent="space-between" width="100%">
              <CardContent>
                <Typography>Tên Phòng</Typography>
                <Box display="flex" flexWrap="wrap" gap="4px" mt="8px">
                  <Tag content="Giường đôi" />
                  <Tag content="Phòng tập" />
                  <Tag content="Bể bơi" />
                  <Tag content="TV" />
                  <Tag content="Tủ lạnh" />
                  <Tag content="Wifi" />
                </Box>
              </CardContent>
              <Box display='flex' flexDirection='column' alignSelf='center'>
                <Typography alignSelf='center' className="strikethrough">{numberWithDot(2000000)}đ</Typography>
                <Typography fontSize='20px' fontWeight='bold' color='red'>{numberWithDot(1565000)}đ</Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
        <CardContent>
          <Box display="flex">
            <CardMedia
              component="img"
              image="https://i.ebayimg.com/images/g/pR4AAOSwTpZdrjl9/s-l1200.webp"
              sx={{ width: "100px" }}
            />
            <Box display="flex" justifyContent="space-between" width="100%">
              <CardContent>
                <Typography>Tên Phòng</Typography>
                <Box display="flex" flexWrap="wrap" gap="4px" mt="8px">
                  <Tag content="Giường đôi" />
                  <Tag content="Phòng tập" />
                  <Tag content="Bể bơi" />
                  <Tag content="TV" />
                  <Tag content="Tủ lạnh" />
                  <Tag content="Wifi" />
                </Box>
              </CardContent>
              <Box display='flex' flexDirection='column' alignSelf='center'>
                <Typography alignSelf='center' className="strikethrough">{numberWithDot(2000000)}đ</Typography>
                <Typography fontSize='20px' fontWeight='bold' color='red'>{numberWithDot(1565000)}đ</Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default HotelCard;
