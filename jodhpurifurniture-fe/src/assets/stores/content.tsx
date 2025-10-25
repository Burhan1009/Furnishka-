import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { useGetStoreAvailable } from "@/service/home";

function Content() {
  const { data } = useGetStoreAvailable();
  const storeLoacation = data?.data ?? [];
  return (
    <>
      <Grid className="container">
        <h1
          style={{
            fontSize: 32,
            marginTop: 90,
            fontFamily: "jost",
            textAlign: "center",
            fontWeight: "400",
          }}
        >
          #Furnishka
        </h1>
        <Typography fontSize={24} mt={0} fontFamily={"Jost"} align="center">
          Our Offline Furniture Experience Stores
        </Typography>

        <Grid container justifyContent="center" gap={6} mt={5}>
          {storeLoacation?.length > 0 &&
            storeLoacation?.map((item: any) => (
              <Card
                sx={{
                  maxWidth: 380,
                  boxShadow: "none",
                  border: "1px solid #E5E5E5",
                }}
                key={item.store_id}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    sx={{ height: { xs: 200, md: 300 } }}
                    image={item.store_image}
                    title={item.image_title}
                    alt={item.image_alt_tag}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      fontFamily={"Jost"}
                      component="div"
                    >
                      {item.store_name}
                    </Typography>
                    <Typography
                      fontFamily={"Jost"}
                      variant="body2"
                      color="text.secondary"
                    >
                      {item.store_address}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions sx={{ p: 2 }}>
                  <Button
                    href={item.store_map}
                    target="_blank"
                    sx={{
                      background: "transparent",
                      border: "1px solid #f15a21",

                      boxShadow: "none",
                      color: "#f15a21",
                      "&:hover": {
                        background: "#f15a21",
                        color: "white",
                        boxShadow: "none",
                      },
                      fontFamily: "Jost",
                    }}
                    variant="contained"
                    size="large"
                  >
                    {" "}
                    Get Direction
                  </Button>
                </CardActions>
              </Card>
            ))}
        </Grid>
      </Grid>
    </>
  );
}

export default Content;
