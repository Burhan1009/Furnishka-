import { Grid } from "@mui/material";
import SideNav from "./SideNavigation";
import { MyAccount } from "@/components";

const MyProfile = () => {
  return (
    <div className="container2">
      <Grid
        sx={{
          mt: { xs: 3, md: 5 },
          display: "flex",
          gap: 5,
          justifyContent: { xs: "center", md: "left" },
        }}
      >
        <Grid
          sx={{ width: 290, display: { xs: "none", sm: "none", md: "inline" } }}
        >
          <SideNav />
        </Grid>
        <div>
          <Grid
            sx={{
              fontSize: { xs: 20, sm: 21, md: 23, lg: 25 },
              color: "#222222",
              fontWeight: "500",
              fontFamily: "Jost",
            }}
          >
            My Account
          </Grid>
          <Grid
            sx={{
              border: "1px solid #E5E5E5",
              padding: 2,
            }}
          >
            <MyAccount />
          </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default MyProfile;
