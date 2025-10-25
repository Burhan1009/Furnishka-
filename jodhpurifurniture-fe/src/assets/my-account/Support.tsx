import FeedBackForm from "@/components/FeedBackForm";
import SupportForm from "@/components/SupportForm";
import { Grid } from "@mui/material";
import React from "react";
import SideNav from "./SideNavigation";

const Support = () => {
  return (
    <div className="container2" style={{ marginTop: 40 }}>
      <Grid
        sx={{
          mt: { xs: 3, md: 5 },
          display: "flex",
          gap: 5,
          justifyContent: { xs: "center", md: "left" },
        }}
      >
        <Grid
          sx={{
            width: 290,
            display: { xs: "none", sm: "none", md: "inline", lg: "inline" },
          }}
        >
          <SideNav />
        </Grid>
        <Grid>
          <h1
            className="font-2543 fw-500 jost"
            style={{ textAlign: "center", lineHeight: 1.5 }}
          >
            Get in touch for your order-related queries
          </h1>
          <Grid>
            <SupportForm />
            {/* <FeedBackForm/> */}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Support;
