import { Grid } from "@mui/material";
import React from "react";
import SideNav from "./SideNavigation";
import { RatingCards } from "@/components";
import Rating from "@mui/material/Rating";

const Myreviews = () => {
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
        <div>
          <Grid
            sx={{
              fontSize: 24,
              color: "#222222",
              fontWeight: "500",
              fontFamily: "jost",
            }}
          >
            My Reviews Ratings
          </Grid>
          <Grid>
            <RatingCards
              boxStyle={{ border: "1px solid #E5E5E5", p: 3, mt: 1 }}
              name="Julie G."
              rating={
                <Rating
                  size="small"
                  name="half-rating-read"
                  defaultValue={2.5}
                  //precision={0.5}
                  readOnly
                />
              }
              image={"/static/images/rectangle123.png"}
              comments="Perfect in Every Way!! Now that my sons are grown, I recently downsized to my very own apartment. I was looking for a burnt orange sofa when I found the Albany Corner Sectional. Although firm, I was completely shocked how comfortable the couch is. It’s unique, the color and design were as described. This sectional is the perfect piece for my little place, adding a lot"
            />
          </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default Myreviews;
