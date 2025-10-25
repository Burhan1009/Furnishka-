import {
  alpha,
  Box,
  Card,
  Avatar,
  darken,
  Grid,
  CardMedia,
  Typography,
  IconButton,
  Button,
  styled,
  useTheme,
} from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import AccountBoxTwoToneIcon from "@mui/icons-material/AccountBoxTwoTone";

const CardActions = styled(Box)(
  ({ theme }) => `
      position: absolute;
      right: ${theme.spacing(2)};
      bottom: ${theme.spacing(2)};
      z-index: 7;
    `
);

const Label = styled(Box)(
  ({ theme }) => `
      background: ${theme.palette.success.main};
      color: ${theme.palette.success.contrastText};
      text-transform: uppercase;
      font-size: ${theme.typography.pxToRem(10)};
      font-weight: bold;
      line-height: 23px;
      height: 22px;
      padding: ${theme.spacing(0, 1.2)};
      border-radius: 50px;
    `
);

const BgComposed = styled(Box)(
  ({ theme }) => `
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      transition: ${theme.transitions.create(["opacity"])};
      background: ${darken(alpha(theme.colors.primary.main, 0.9), 0.8)};
      z-index: 6;
      opacity: 0;
      box-shadow: inset 0 0 2.3rem 0.5rem ${darken(
        theme.colors.primary.main,
        0.9
      )};
    `
);

function Block4() {
  const theme = useTheme();

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <Card
          sx={{
            textAlign: "center",
            position: "relative",
            transition: `${theme.transitions.create([
              "box-shadow",
              "transform",
            ])}`,
            transform: "translateY(0px)",

            "&:hover": {
              transform: `translateY(-${theme.spacing(0.5)})`,

              "& .MuiBgComposed": {
                opacity: 1,
              },
            },
          }}
        >
          <BgComposed
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            className="MuiBgComposed"
          >
            <Button
              sx={{
                px: 2.5,
                mt: 15,
                borderRadius: 10,
                transform: "scale(1)",
                transition: `${theme.transitions.create(["all"])}`,
                boxShadow: `${theme.colors.shadows.info}`,

                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: `${theme.colors.shadows.info}`,
                },
                "&:active": {
                  boxShadow: "none",
                },
              }}
              variant="contained"
              color="info"
              startIcon={<i className="fa-solid fa-cart-shopping"></i>}
            >
              Add to Cart
            </Button>
          </BgComposed>
          <CardMedia
            component="img"
            height="260"
            sx={{
              borderRadius: "inherit",
              position: "relative",
              zIndex: 5,
            }}
            image="/static/images/placeholders/covers/3.jpg"
            alt="..."
          />
          <CardActions
            sx={{
              bottom: "auto",
              top: `${theme.spacing(1.3)}`,
              right: "auto",
              left: `${theme.spacing(1.2)}`,
              display: "flex",
            }}
          >
            <Label
              sx={{
                borderRadius: "0px",
                background: `#f15a21`,
                color: `#fff`,
              }}
            >
              {"33 % off"}
            </Label>
          </CardActions>
          <CardActions
            sx={{
              bottom: "auto",
              top: `${theme.spacing(1.3)}`,
              right: `${theme.spacing(1.5)}`,
              left: `auto`,
              // display:'flex'
            }}
          >
            <button
              style={{
                padding: "4px 6px",
                width: "32px",
                height: "28px",
                background: "url(/static/images/heart.svg) no-repeat",
                backgroundColor: "white",
                borderRadius: "4px",
                border: "0px",
                color: "#767676",
                lineHeight: "1",
                backgroundSize: "20px 20px",
                backgroundPosition: "6px 4px",
              }}
              className="wishlist-btn"
            ></button>
          </CardActions>
        </Card>
        <Typography
          sx={{
            marginTop: 1,
            width: "auto",
            fontFamily: "JOST",
            fontWeight: "normal",
            fontSize: 16,
          }}
        >
          dfdfdf
        </Typography>
        <b className="font-16 jost">₹{"30000"}</b>
        <strike style={{ marginLeft: 7 }} className="font-14 color-767676 jost">
          ₹{"5000"}
        </strike>
      </Grid>
    </Grid>
  );
}

export default Block4;
