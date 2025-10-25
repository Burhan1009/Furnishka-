import { Box, Grid, CardMedia, useTheme, SxProps } from "@mui/material";
import { Typography, styled } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Links from "@/Link";

const CardActions = styled(Box)(
  ({ theme }) => `
      position: absolute;
      right: ${theme.spacing(0)};
      left: ${theme.spacing(0)};
      bottom: ${theme.spacing(1)};
      z-index: 7;
    `
);
//
const Label = styled(Box)(
  ({ theme }) => `
      background: ${theme.palette.success.main};
      color: ${theme.palette.success.contrastText};
      text-transform: uppercase;
      font-size: ${theme.typography.pxToRem(10)};
      font-weight: bold;
      padding: ${theme.spacing(0, 1.2)};
      border-radius: 50px;
    `
);

interface AddToCartInterface {
  img?: string;
  discountLable?: string;
  title?: string;
  cardStyle?: SxProps;
  addCart?: SxProps;
  imageStyle?: SxProps;
  key?: string;
  discountPrice?: string;
  costPrice?: string;
  handleWhiteList?: () => void;
  handleCart?: any;
  loading?: boolean;
  handleClick?: any;
  slug?: any;
  offer?: any;
  wishlistStyle?: any;
  handleRedirect?: any;
  alt?: string;
  imgTitle?: string;
}

function AddTocartCard({
  img,
  slug,
  imgTitle,
  discountLable,
  handleRedirect,
  title,
  wishlistStyle,
  discountPrice,
  costPrice,
  alt,
  addCart,
  handleWhiteList,
  loading,
  cardStyle,
  imageStyle,
  key,
  handleCart,
}: AddToCartInterface) {
  const theme = useTheme();

  return (
    <>
      <Grid>
        <Grid
          key={key}
          sx={{
            textAlign: "center",
            position: "relative",
            borderRadius: 0.5,
            mt: 1,
            "& .MuiBgComposed": {
              opacity: 0,
            },

            "&:hover": {
              "& .MuiBgComposed": {
                opacity: 1,
              },
            },
            ...cardStyle,
          }}
        >
          {handleCart && (
            <CardActions
              sx={{
                ...addCart,
              }}
              className="MuiBgComposed "
            >
              <LoadingButton
                sx={{
                  fontWeight: "400",
                  fontSize: { xs: 12, sm: 16 },
                  px: { sm: 2.5 },

                  p: { xs: "4px 11px", sm: "8px 20px" },
                  borderRadius: 0.4,

                  fontFamily: "Jost",
                  background: "#f15a21",
                  "&:hover": {
                    background: "#f15a21",
                  },
                  "&:active": {
                    boxShadow: "none",
                    background: "#f15a21",
                  },
                }}
                variant="contained"
                color="info"
                loading={loading}
                onClick={handleCart}
                startIcon={
                  <i className="fa-solid ">
                    <img src={"/static/icon/shopping-cart.svg"} />
                  </i>
                }
              >
                Add to Cart
              </LoadingButton>
            </CardActions>
          )}

          <Links
            href={
              handleRedirect
                ? `/${slug}?searchFor=${handleRedirect}`
                : `/${slug}` ?? "/"
            }
          >
            <div className="image-box">
              <CardMedia
                component="img"
                placeholder="blur"
                sx={{
                  transition: "300ms ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                  fontSize: { xs: 15, sm: 15, lg: 16 },
                  cursor: "pointer",
                  zIndex: 5,
                  ...imageStyle,
                }}
                image={img}
                alt={alt}
                title={imgTitle}
              />
            </div>
          </Links>
          {discountLable ? (
            <CardActions
              sx={{
                bottom: "auto",
                top: `${theme.spacing(0.9)}`,
                right: "auto",
                left: `${theme.spacing(0.9)}`,
                display: "flex",
              }}
            >
              <Label className="selling-tag">{discountLable}</Label>
            </CardActions>
          ) : (
            ""
          )}

          <CardActions
            className="MuiBgComposed "
            sx={{
              bottom: "auto",
              top: `${theme.spacing(0.9)}`,
              right: `${theme.spacing(1.5)}`,
              left: `auto`,

              ...wishlistStyle,
            }}
          >
            <button style={{ cursor: "pointer" }} className="wishlist-btnn">
              <img
                src={"/static/images/heart.svg"}
                style={{ cursor: "pointer" }}
                onClick={handleWhiteList}
              />
            </button>
          </CardActions>
        </Grid>
        <Grid>
          {title && (
            <>
              {" "}
              <Typography
                sx={{
                  marginTop: 1,
                  width: "auto",
                  fontFamily: "JOST",
                  fontWeight: "normal",
                  fontSize: 16,
                }}
              >
                {title}
              </Typography>
              <b className="font-16 jost">₹{discountPrice}</b>
              <strike
                style={{ marginLeft: 7 }}
                className="font-14 color-767676 jost"
              >
                ₹{costPrice}
              </strike>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default AddTocartCard;
