import { Grid } from "@mui/material";
import SideNav from "./SideNavigation";
import { Address } from "@/components";
import StickyBox from "react-sticky-box";
const AddressDetails = () => {
  return (
    <div className="container2">
      <Grid
        sx={{
          mt: { xs: 3, md: 5 },
          display: { md: "flex" },
          gap: 3,
          justifyContent: { xs: "center", md: "left" },
        }}
      >
        <StickyBox offsetTop={20} offsetBottom={20}>
          <Grid sx={{ width: 290, display: { xs: "none", md: "inline" } }}>
            <SideNav />
          </Grid>
        </StickyBox>
        <Grid>
          <h1 className="font-2543 fw-500 jost">Add Address Book</h1>

          <Grid>
            <Address />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddressDetails;
