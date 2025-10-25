import React from "react";
import Disclaimer from "@/assets/global/Disclaimer";
import Discount from "@/assets/global/Discount";
import Footer from "@/assets/global/Footer";
import Header from "@/assets/global/Header";
import NewsLetter from "@/assets/global/NewsLetter";
import Testimonial from "@/assets/global/Testimonial";
import { Address } from "@/components";
import { Grid } from "@mui/material";
import SideNav from "@/assets/my-account/SideNavigation";
import SeoHeader from "@/components/SeoHeader";

const addressbook = () => {
  return (
    <>
      <head>
        <SeoHeader title={"Edit Address | Jodhpuri Furniture"} />
      </head>
      <Discount />
      <Header />
      <div className="container2 ">
        <Grid
          sx={{
            mt: { xs: 3, md: 5 },
            display: "flex",
            gap: 3,
            justifyContent: { xs: "center", md: "left" },
          }}
        >
          <Grid
            sx={{
              width: 290,
              display: { xs: "none", sm: "none", md: "inline" },
            }}
          >
            <SideNav />
          </Grid>

          <Grid>
            <h1 className="font-2543 fw-500 jost">Address Book</h1>
            <Address forUpdate={true} />
          </Grid>
        </Grid>
      </div>
      <Testimonial />

      <NewsLetter />
      <Footer />
      <Disclaimer />
    </>
  );
};
export default addressbook;
