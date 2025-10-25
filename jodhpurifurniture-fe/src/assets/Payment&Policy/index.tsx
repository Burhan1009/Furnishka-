import { Typography } from "@mui/material";
import { Grid } from "@mui/material";

const PaymentPolicyFooter = () => {
  return (
    <Grid sx={{ textAlign: "center", mt: { xs: 3, sm: 4, lg: 5 } }}>
      {" "}
      <h1
        style={{
          fontWeight: "600",
          fontFamily: "Jost",
        }}
        className="heading-other"
      >
        Payment Policy
      </h1>
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
        While making a payment, Jodhpuri will not be responsible nor assume any
        liability arising directly or indirectly to You due to the following
        reasons:
        <br />
        1. payment issues arising out of the transaction
        <br />
        2. Decline of transaction for any other reason(s)
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
        Which forms of payment are acceptable?
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
        Users can make payment using PayU payment gateway.
        <br />
        All payments made on the Website should be in the Indian National
        Rupees.
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
        Is there any form of additional or hidden fee?
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
        No, there is no hidden fee on purchases made by you at Jodhpuri. We also
        don’t charge any Shipping or Handling fee.
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
        How are my electronic payments processed?
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
        All valid Credit/Debit Cash cards and other payment instruments are
        processed using the payment gateway or appropriate payment system
        infrastructure. Jodhpuri does not, in any way, store the information of
        your Credit/Debit cards.
      </Typography>
    </Grid>
  );
};
export default PaymentPolicyFooter;
