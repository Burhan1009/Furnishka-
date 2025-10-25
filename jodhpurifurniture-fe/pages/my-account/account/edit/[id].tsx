
import Disclaimer from "@/assets/global/Disclaimer";
import Discount from "@/assets/global/Discount";
import Footer from "@/assets/global/Footer";
import Header from "@/assets/global/Header";
import NewsLetter from "@/assets/global/NewsLetter";
import Testimonial from "@/assets/global/Testimonial";
import { MyAccount } from "@/components";
import { Grid } from "@mui/material";
import SideNav from "@/assets/my-account/SideNavigation";
import SeoHeader from "@/components/SeoHeader";

const profile = () => {
  return (
    <>
      <head>
        <SeoHeader title={"Edit Profile | Jodhpuri Furniture"} />
      </head>
      <Discount />
      <Header />
      <div className="container2">
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
          <div>
            <h1 className="font-2543 fw-500 jost">My Account</h1>
            <Grid sx={{ mt: 2 }}>
              <MyAccount forUpdate={true} />
            </Grid>
          </div>
        </Grid>
      </div>
      <Testimonial />

      <NewsLetter />
      <Footer />
      <Disclaimer />
    </>
  );
};
export default profile;
