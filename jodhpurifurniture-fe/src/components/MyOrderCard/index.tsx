import * as React from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
//import "./css/index.css";
import { Button, CardActionArea, CardActions, Box } from "@mui/material";
import { Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";

interface IMyOrderCard {
  orderId: string | number;
  orderPlacedDate: string | number;
  discountprize: string | number;
  prize?: number;
  state: string;
  handleViewDetail?: any;
  isLoading?: any;
}
const MyOrderCard: React.FC<IMyOrderCard> = (props) => {
  const {
    orderId,
    state,
    handleViewDetail,
    orderPlacedDate,
    prize,
    isLoading,
  } = props;

  return (
    <Grid
      sx={{
        border: "1px solid #E5E5E5",
        mt: 3,
      }}
    >
      <Grid
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Grid
          sx={{
            marginRight: { xs: 2, sm: 10, md: 20, lg: 25 },
          }}
        >
          <CardContent>
            <div style={{ marginBottom: 16 }}>
              <text
                className="jost"
                style={{
                  fontFamily: "Jost",
                  backgroundColor: " rgba(235, 119, 0, 0.07)",
                  borderRadius: 20,
                  paddingBlock: 4,
                  paddingLeft: 8,
                  color: "#f15a21",
                  paddingRight: 8,
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                #{orderId}
              </text>
            </div>

            <Typography
              color="#767676"
              sx={{
                alignItems: "center",
                fontFamily: "Jost",
                fontSize: 13,
                fontWeight: 400,
              }}
            >
              Order Placed : {orderPlacedDate}
            </Typography>
          </CardContent>
        </Grid>

        <Grid
          className="myorder-card-reponse"
          sx={{
            display: "flex",
            alignItems: "center",

            flexWrap: "wrap",
            justifyContent: "space-between",

            marginRight: 1,
          }}
        >
          <Typography
            color="#222222"
            sx={{
              marginRight: { xs: 2, sm: 7, md: 3, lg: 6 },
              marginLeft: { xs: 2, sm: 0, md: 2, lg: 0 },
              fontSize: { xs: 14, sm: 15, md: 16, lg: 17 },
              fontWeight: 600,
              fontFamily: "Jost",
            }}
          >
            ₹{prize}
          </Typography>

          <Typography
            sx={{ marginRight: { xs: 2, sm: 7, md: 1, lg: 6 } }}
            style={{
              color: "#4CAF50",

              fontFamily: "Jost",
              backgroundColor: " rgba(76, 175, 80, 0.1)",
              borderRadius: 20,
              paddingBlock: 2,
              paddingLeft: 8,
              paddingRight: 8,
              fontSize: 13,
              fontWeight: 400,
            }}
            className="jost"
          >
            {state}
          </Typography>

          <CardActions
            sx={{
              flexWrap: "wrap",
              marginLeft: { sm: 1, lg: 0 },
            }}
          >
            <LoadingButton
              loading={isLoading}
              onClick={handleViewDetail}
              style={{ fontSize: 13, fontWeight: 500 }}
              sx={{
                backgroundColor: "transparent",
                color: "#f15a21",
                border: "1px solid #f15a21",
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                  background: "#f15a21",
                  color: "#fff",
                  border: "1px solid #f15a21",
                },
              }}
              variant="contained"
              fullWidth
              className="jost"
            >
              VIEW DETAILS
            </LoadingButton>
          </CardActions>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default MyOrderCard;
