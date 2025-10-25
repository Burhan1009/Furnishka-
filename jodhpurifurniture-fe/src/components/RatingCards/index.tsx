import * as React from "react";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
//import "./css/index.css";
import { Button, Grid, Box } from "@mui/material";
import { SxProps } from "@mui/material/styles";

interface IRatingCards {
  image: any;
  name: string;
  comments: string;
  rating: any;
  boxStyle: SxProps;
  discountprize: string | number;
  title?: string;
  alt?: string;
}
const RatingCards: React.FC<IRatingCards> = (props) => {
  const { name, rating, comments, image, boxStyle, title, alt } = props;
  const [readMore, setReadMore] = React.useState("false");
  return (
    <Box
      sx={{
        maxWidth: 924,
        maxheight: 631,
        borderBottom: "1px solid #e9e9e9",
        ...boxStyle,
      }}
    >
      <div style={{ marginTop: 18 }}>
        <div style={{ display: "flex", marginBottom: 0 }}>
          <Grid
            sx={{ fontSize: { xs: 14, sm: 15, md: 15, lg: 16 } }}
            className="jost"
            style={{
              color: "#222222",

              fontWeight: "700",
            }}
          >
            {name}
          </Grid>
          <Grid
            sx={{ fontSize: { xs: 14, sm: 15, md: 15, lg: 16 } }}
            className="jost"
            style={{
              flexGrow: 1,
              marginLeft: 8,
              color: "#222222",

              fontWeight: "400",
            }}
          >
            <img src={"/static/images/verifiedUser.svg"} /> Verified Buyer
          </Grid>
        </div>
        <div style={{ marginLeft: -3, marginBottom: 24 }}>
          <Stack spacing={1}>
            {rating}
            {/* <Rating
              name="half-rating-read"
              defaultValue={2.5}
              precision={0.5}
              readOnly
            /> */}
          </Stack>
        </div>
        <div
          className="jost"
          style={{
            color: "#484848",
            fontSize: 14,
            fontWeight: "400",

            marginBottom: 20,
          }}
        >
          {comments?.length < 290
            ? comments
            : readMore != "true"
            ? comments?.slice(0, 290)
            : comments}
          {/* {readMore == 'true' ? content : } */}

          {comments?.length > 290 && readMore == "false" && (
            <Button
              className="jost"
              onClick={() => setReadMore("true")}
              style={{
                color: "#484848",
                fontSize: 14,
                fontWeight: "600",
              }}
            >
              {`...Read More`}
            </Button>
          )}
          {readMore == "true" && (
            <Button
              className="jost"
              onClick={() => setReadMore("false")}
              style={{
                color: "#484848",
                fontSize: 14,
                fontWeight: "600",
              }}
            >
              {`   Read less`}
            </Button>
          )}
        </div>
        <div>
          {image &&
            image.map((imageUrl) => (
              <CardMedia
                className="rating-image"
                sx={{
                  borderRadius: "inherit",
                  position: "-webkit-sticky",
                  zIndex: 15,

                  marginRight: 1,
                  mt: 0.3,
                  display: "inline-flex",
                }}
                title={title}
                alt={alt}
                image={imageUrl}
              />
            ))}
        </div>
      </div>
    </Box>
  );
};

export default RatingCards;
