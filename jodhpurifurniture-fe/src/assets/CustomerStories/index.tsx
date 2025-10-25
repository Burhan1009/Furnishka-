import CustomerStoriesCard from "@/components/CustomerStoriesCard";
import { useGetCustomerStories } from "@/service/stories";
import { Grid } from "@mui/material";

const CustomerStoriesFooter = () => {
  const { data } = useGetCustomerStories();
  const storeCustomerDetails = data?.data ?? [];

  return (
    <>
      <Grid
        sx={{ marginTop: { xs: 3, sm: 4, md: 5, lg: 6 } }}
        className="row-reduce"
      >
        <div className="container2">
          <div className="row switch-image " style={{ marginBottom: 40 }}>
            <img
              src={"/static/assets/customer-stories.jpg"}
              width={"100%"}
              alt="jodhpuri Furniture customer stories"
              title="Customer Stories"
            />
          </div>

          <Grid
            sx={{
              mt: -3,
              gap: { xs: 2, sm: 2, md: 2, lg: 5 },
              flexWrap: "wrap",
              display: "flex",

              justifyContent: "center",
            }}
          >
            {storeCustomerDetails.length > 0 &&
              storeCustomerDetails?.map((item: any) => (
                <CustomerStoriesCard
                  title={item.image_title}
                  alt={item.image_alt_tag}
                  image={item.image}
                  content={item.review}
                  name={item.customer_name}
                  address={item.city}
                />
              ))}
          </Grid>
        </div>
      </Grid>
    </>
  );
};
export default CustomerStoriesFooter;
