import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

interface ICustomerStoriesCard {
  image: any;
  content: string;
  name: string;
  address: string;
  title?: string;
  alt?: string;
}

const CustomerStoriesCard: React.FC<ICustomerStoriesCard> = (props) => {
  const { image, content, name, address, title, alt } = props;
  return (
    <Grid
      className="card-width"
      sx={{
        border: "1px solid #E5E5E5",
        mb: { xs: 1, sm: 5, md: 10 },
        mt: 3,
      }}
    >
      <CardMedia component="img" image={image} alt={alt} title={title} />
      <Typography
        sx={{
          textAlign: "left",
          m: 2,
          fontSize: { xs: 12, sm: 12, md: 14, lg: 15 },
          fontWeight: "400",
          fontFamily: "Jost",
          color: "#666",
        }}
      >
        {content}
      </Typography>
      <Grid sx={{ display: "flex" }}>
        <Typography
          sx={{
            textAlign: "left",
            mt: 2,
            ml: 2,
            mb: 3,
            fontSize: { xs: 12, sm: 12, md: 14, lg: 15 },
            fontWeight: "400",
            fontFamily: "Jost",
            color: "#484848",
          }}
        >
          {name},
        </Typography>
        <Typography
          sx={{
            textAlign: "left",
            mt: 2,
            ml: 0.5,
            mb: 3,
            fontSize: { xs: 12, sm: 12, md: 14, lg: 15 },
            fontWeight: "400",
            fontFamily: "Jost",
            color: "#f15a21",
          }}
        >
          {address}
        </Typography>
      </Grid>
    </Grid>
  );
};
export default CustomerStoriesCard;
