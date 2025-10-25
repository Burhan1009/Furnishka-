import Disclaimer from "@/assets/global/Disclaimer";
import Discount from "@/assets/global/Discount";
import Footer from "@/assets/global/Footer";
import Header from "@/assets/global/Header";
import NewsLetter from "@/assets/global/NewsLetter";
import Testimonial from "@/assets/global/Testimonial";
import { Button, Typography } from "@mui/material";


  function notFound() {
  return (
    <>
      <Discount />
      <Header key="search" />
      <div
        style={{
          background: "#F8F8F8",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 60,
          paddingLeft: 5,
          paddingRight: 5,
        }}
      >
        <Typography
          sx={{
            fontWeight: 400,
            textTransform: "uppercase",
            textAlign: "center",
            color: "#222222",
            fontSize: { xs: 16, sm: 25, md: 36 },
            paddingTop: 2,
            fontFamily: "Jost",
          }}
        >
          Oops! This furniture is getting ready
        </Typography>
        <Typography
          sx={{
            color: "#767676",
            fontFamily: "Jost",
            textAlign: "center",
            fontSize: { xs: 13, sm: 16, md: "20px" },
          }}
        >
          But We have other beautiful furniture pieces that are ready for you.
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 10,
          }}
        >
          <img
            className="hide-on-small-screen"
            src={"/static/images/404 1.svg"}
            alt="404 image"
            title="Wrong Url"
            width={355}
          />
          <img
            className="hide-on-large-screen"
            src={"/static/images/404 1.svg"}
            alt="404 image"
            title="Wrong Url"
            width={300}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 10,
          }}
        >
          <a href="/">
            <Button
              style={{
                fontWeight: "500",
                fontFamily: "Jost",
              }}
              sx={{
                fontSize: { xs: 14, sm: 15, md: 15, lg: 16 },
                background: "#f15a21",
                color: "#fff",
                textTransform: "capitalize",
                "&:hover": {
                  background: "#f15a21",
                  color: "#fff",
                },
                mt: 2,
                width: 185,
                height: 50,
              }}
              fullWidth
            >
              Visit Home Page
            </Button>
          </a>
        </div>
      </div>
      <Testimonial />
      <NewsLetter />
      <Footer />
      <Disclaimer />
    </>
  );
}

export default notFound