import * as React from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
//import "./css/index.css";
import { Button, CardActionArea, CardActions, Box, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";

interface IWishListCard {
  image: any;
  content: string;
  prize: string | number;
  discountprize: string | number;
  handleDelete: any;
  isLoading: any;
  handleslugKey: any;
  handleAddCart: any;
  alt?: string;
  title?: string;
}
const WishListCard: React.FC<IWishListCard> = (props) => {
  const {
    image,
    content,
    prize,
    discountprize,
    handleDelete,
    isLoading,
    handleslugKey,
    handleAddCart,
    alt,
    title,
  } = props;

  return (
    // <Grid className="col-xs-6 col-lg-3" >
    <Box sx={{ maxWidth: { xs: "45%", sm: "47%", md: "47%", lg: 290 } }}>
      <div style={{ display: "flex" }}>
        <div>
          <CardMedia
            onClick={handleslugKey}
            style={{ flex: 1, borderRadius: 4 }}
            title={title}
            alt={alt}
            component="img"
            sx={{
              borderRadius: "inherit",
              position: "-webkit-sticky",
              zIndex: 5,
              cursor: "pointer",
            }}
            image={image}
          />
        </div>
        <div style={{ alignItems: "center" }}>
          <LoadingButton
            onClick={handleDelete}
            loading={isLoading}
            sx={{ position: "absolute", marginLeft: -7 }}
          >
            <img
              src={"/static/images/closeIcon.svg"}
              style={{ marginTop: 3 }}
            />
          </LoadingButton>
        </div>
      </div>
      <CardContent>
        <Typography
          className="jost"
          onClick={handleslugKey}
          style={{
            marginLeft: -16,
            fontFamily: "Jost",
            marginTop: -6,
            cursor: "pointer",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "1",
            WebkitBoxOrient: "vertical",
          }}
          component="div"
          color="#222222"
          sx={{
            fontSize: { xs: 15, sm: 15, md: 15, lg: 16 },
            fontWeight: 400,
          }}
        >
          {content}
        </Typography>
        <div
          style={{ display: "flex", marginBottom: 3 }}
          className="wishlist-top"
        >
          <Typography
            className="jost"
            style={{
              marginLeft: -16,
              fontFamily: "Jost",

              color: "#222222",
              fontWeight: "600",
            }}
            sx={{ fontSize: { xs: 17, sm: 14, md: 15, lg: 16 } }}
          >
            {prize}
          </Typography>
          <Typography
            className="jost"
            style={{
              position: "-webkit-sticky",
              marginLeft: 16,
              fontFamily: "Jost",

              textAlign: "center",
              color: "#767676",
              fontWeight: "500",
              textDecorationLine: "line-through",
            }}
            sx={{
              fontSize: { xs: 14, sm: 12, md: 13, lg: 14 },
              mt: { xs: 0.2, sm: 0.3 },
            }}
          >
            {discountprize}
          </Typography>
        </div>
      </CardContent>

      <CardActions>
        <Button
          onClick={handleAddCart}
          className="jost"
          style={{
            flex: 1,
            margin: -10,
            fontSize: 14,
            fontWeight: 500,
            fontFamily: "Jost",
          }}
          sx={{
            backgroundColor: "transparent",
            color: "#f15a21",
            border: "1px solid #f15a21",
            boxShadow: "none",
            "&:hover": {
              background: "#f15a21",
              color: "#fff",
              boxShadow: "none",
            },
          }}
          variant="contained"
          fullWidth
        >
          Add To Cart
        </Button>
      </CardActions>
    </Box>
    // </Grid>
  );
};
export default WishListCard;
