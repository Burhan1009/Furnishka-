import {AccountsButton} from "@/components";

import { Grid } from "@mui/material";
import React from "react";
import SideNav from "./SideNavigation";

const Mypassword = () => {
  return (
    <div className="container">
      <Grid
        sx={{
          p: { md: 7.5 },
          mt: { xs: 3, md: 0 },
          display: "flex",
          gap: 5,
          justifyContent: { xs: "center", md: "left" },
        }}
      >
        <Grid sx={{ width: 290, display: { xs: "none",sm:'none', md: "inline" } }}>
          <SideNav />
        </Grid>
        <Grid></Grid>
      </Grid>
    </div>
  );
};

export default Mypassword;
