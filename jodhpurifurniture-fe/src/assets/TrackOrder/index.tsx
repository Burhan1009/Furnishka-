import { phoneNum } from "@/common/validations/constants";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";

const TrackOrderFooter = () => {
  return (
    <Grid sx={{ textAlign: "center", mt: { xs: 3, sm: 4, lg: 5 } }}>
      <h1
        style={{
          fontWeight: "600",
          fontFamily: "Jost",
        }}
        className="heading-other"
      >
        TRACK YOUR WOODEN FURNITURE ORDERS - JODHPURI FURNITURE
      </h1>
      <Typography
        sx={{
          fontSize: { xs: 15, sm: 17, md: 19, lg: 21 },
          fontWeight: "600",
          fontFamily: "Jost",
          mb: 0.5,
          textAlign: "left",
          color: "#f15a21",
        }}
      >
        Your order is as important to us as it is for you.
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: 13, sm: 14, md: 15, lg: 16 },
          fontWeight: "500",
          fontFamily: "Jost",
          color: "#767676",
          mb: 3,
          lineHeight: 2,
          textAlign: "left",
        }}
      >
        Once your order is successfully placed, you will receive an email and
        SMS notification of the same. You will also be notified at each instance
        like when the order is accepted, processed, shipped and delivered.
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: 15, sm: 17, md: 19, lg: 21 },
          fontWeight: "600",
          fontFamily: "Jost",
          mb: 0.5,
          textAlign: "left",
          color: "#f15a21",
        }}
      >
        How do I track my order?
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: 13, sm: 14, md: 15, lg: 16 },
          fontWeight: "500",
          fontFamily: "Jost",
          color: "#767676",
          mb: 10,
          lineHeight: 2,
          textAlign: "left",
        }}
      >
        1. You can track your order my signing up and visiting My Orders page.
        Over here you can view the entire order details with its current status.
        <br />
        2. In case you have any queries regarding the status of your order, you
        can reach us at {phoneNum} or drop us an email at
        info@jodhapurifurniture.com.
      </Typography>
    </Grid>
  );
};
export default TrackOrderFooter;
