import { Grid } from "@mui/material";
import SideNav from "./SideNavigation";
import { MyOrderCard } from "@/components";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectAuth } from "@/service/auth/globalstate";
import { useGetOrders } from "@/service/order";

const Myorders = () => {
  const router = useRouter();
  const auth = useSelector(selectAuth);
  const authData = auth?.length > 0 ? auth[0] : "";
  const { data } = useGetOrders(authData.user_id);
  const storeMyOrders = data?.data ?? [];

  const handleRedirect = (order_id) => {
    router.push(`/order-details/${order_id}`);
  };

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
        <Grid sx={{ width: 290, display: { xs: "none", md: "inline" } }}>
          <SideNav />
        </Grid>
        <div>
          <h1 className="font-2543 fw-500 jost">My Orders</h1>

          <Grid>
            {storeMyOrders.length > 0 &&
              storeMyOrders?.map((item: any) => {
                var IsdefaultOrder;

                switch (item.order_status) {
                  case 1:
                    IsdefaultOrder = "Placed";
                    break;
                  case 2:
                    IsdefaultOrder = "Accepted";
                    break;
                  case 3:
                    IsdefaultOrder = "In Progress";
                    break;
                  case 4:
                    IsdefaultOrder = "Dispatched";
                    break;
                  default:
                    IsdefaultOrder = "Deliverd";
                }
                const options: any = {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                };
                const event = new Date(item.created_date).toLocaleDateString(
                  undefined,
                  options
                );
                return (
                  <MyOrderCard
                    state={IsdefaultOrder}
                    handleViewDetail={() => handleRedirect(item.order_id)}
                    orderId={item.order_id}
                    orderPlacedDate={event}
                    prize={item.grand_total}
                  />
                );
              })}
          </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default Myorders;
