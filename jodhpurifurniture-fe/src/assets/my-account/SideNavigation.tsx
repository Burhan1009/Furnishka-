import { Avatar, Box, ListItemAvatar, ListItemIcon } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRouter } from "next/router";
import { useDispatch } from "@/service/store";
import { authAction } from "@/service/auth/states";
import { useSelector } from "react-redux";
import { selectAuth, selectUserDetail } from "@/service/auth/globalstate";
import { clearCart } from "@/service/cart/cart";

const SideNav = () => {
  const router = useRouter();
  const path = router.asPath;
  const auth = useSelector(selectAuth);
  const authData = auth?.length > 0 ? auth[0] : "";
  const validPath = path?.split("/")[2] ?? "";
  const dispatch = useDispatch();
  const userDetail = useSelector(selectUserDetail);

  const handleLogout = () => {
    dispatch(authAction.logOut());
    dispatch(clearCart());
    router.push("/");
  };

  return (
    <Grid>
      <Box sx={{ border: "1px solid #E5E5E5", borderRadius: 2, width: 290 }}>
        <Grid sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
          <Grid>
            <Typography
              sx={{
                fontFamily: "Jost",
                fontWeight: 400,
                fontSize: 14,
                color: "#484848",
              }}
            >
              Hi,
            </Typography>
            <Typography
              sx={{
                fontFamily: "Jost",
                fontWeight: 500,
                fontSize: 18,

                color: "#222222",
                textTransform: "capitalize",
              }}
            >
              {userDetail?.full_name ?? ""}
            </Typography>
          </Grid>

          <Button
            onClick={() =>
              router.push("/my-account/account/edit/" + authData.user_id)
            }
            sx={{
              mt: 1,

              ml: 1,
              mb: 1,
              minWidth: 79,
              height: 32,
              padding: "6px 16px",
              textTransform: "capitalize",
              fontSize: 14,
              borderRadius: 0,
              fontFamily: "Jost",
              color: "#484848",
              border: "1px solid #E5E5E5",
              "&:hover": {
                background: "#FFF0EA",
                border: "1px solid #E5E5E5",
                borderRadius: 0,
              },
            }}
            startIcon={
              <Avatar
                variant="rounded"
                sx={{ width: 16, height: 16 }}
                src="/static/icon/edit.svg"
              />
            }
          >
            Edit
          </Button>
        </Grid>
        <Divider />
        <Grid>
          <List
            sx={{
              width: "100%",
              p: 0.5,
              ml: 0,
              maxWidth: 360,
              bgcolor: "#f4f9fc",
            }}
            component="nav"
          >
            <ListItemButton
              sx={{
                background: validPath == "myorders" ? "#F8F8F8" : "#f4f9fc",
              }}
              onClick={() => router.push("/my-account/myorders")}
            >
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  sx={{ width: 20, height: 20 }}
                  src={"/static/icon/shopping-bag.svg"}
                />
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{ fontFamily: "Jost" }}
                sx={{
                  color: validPath == "myorders" ? "#f15a21" : "#484848",
                  ml: -3,
                  fontSize: 16,

                  fontWeight: 400,
                }}
              >
                My Orders
              </ListItemText>

              <ArrowForwardIosIcon
                sx={{ fontSize: "medium", color: "#484848" }}
              />
            </ListItemButton>
            <Divider />
            <ListItemButton
              sx={{
                background: validPath == "address" ? "#F8F8F8" : "#f4f9fc",
              }}
              onClick={() => router.push("/my-account/address/address-book")}
            >
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  sx={{ width: 20, height: 20 }}
                  src={"/static/icon/home.svg"}
                />
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{ fontFamily: "Jost" }}
                sx={{
                  color: validPath == "address" ? "#f15a21" : "#484848",
                  ml: -3,
                  fontSize: 16,
                  fontWeight: 400,
                }}
              >
                Address Book
              </ListItemText>

              <ArrowForwardIosIcon
                sx={{ fontSize: "medium", color: "#484848" }}
              />
            </ListItemButton>
            <Divider />
            <ListItemButton
              sx={{
                background: validPath == "wishlist" ? "#F8F8F8" : "#f4f9fc",
              }}
              onClick={() => router.push("/my-account/wishlist")}
            >
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  sx={{ width: 20, height: 20 }}
                  src={"/static/icon/heart.svg"}
                />
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{ fontFamily: "Jost" }}
                sx={{
                  color: validPath == "wishlist" ? "#f15a21" : "#484848",

                  ml: -3,
                  fontSize: 16,

                  fontWeight: 400,
                }}
              >
                Wishlist
              </ListItemText>

              <ArrowForwardIosIcon
                sx={{ fontSize: "medium", color: "#484848" }}
              />
            </ListItemButton>
            <Divider />
            {/* <ListItemButton
              sx={{
                background: validPath == 'myreviews' ? '#F8F8F8' : '#f4f9fc',
              }}
              onClick={() => router.push('/my-account/myreviews')}>
              <ListItemAvatar>
                <Avatar
                  variant='rounded'
                  sx={{ width: 20, height: 20 }}
                  src={'/static/icon/starr.svg'}
                />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  color: validPath == 'myreviews' ? '#f15a21' : '#484848',

                  ml: -3,
                  fontSize: 16,
                  fontFamily: 'Jost',
                  fontWeight: 400,
                }}>
                My Reviews Ratings
              </ListItemText>

              <ArrowForwardIosIcon
                sx={{ fontSize: 'medium', color: '#484848' }}
              />
            </ListItemButton>
            <Divider /> */}

            <ListItemButton
              sx={{
                background: validPath == "support" ? "#F8F8F8" : "#f4f9fc",
              }}
              onClick={() => router.push("/my-account/support")}
            >
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  sx={{ width: 20, height: 20 }}
                  src={"/static/icon/currency.svg"}
                />
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{ fontFamily: "Jost" }}
                sx={{
                  color: validPath == "support" ? "#f15a21" : "#484848",

                  ml: -3,
                  fontSize: 16,

                  fontWeight: 400,
                }}
              >
                Support
              </ListItemText>

              <ArrowForwardIosIcon
                sx={{ fontSize: "medium", color: "#484848" }}
              />
            </ListItemButton>
            <Divider />
            <ListItemButton>
              <ListItemText sx={{ color: "#484848" }} />
            </ListItemButton>

            <ListItemButton sx={{ ml: 0.8 }} onClick={handleLogout}>
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  sx={{ width: 20, height: 20, mt: 1.2 }}
                  src={"/static/icon/log-out.svg"}
                />
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{ fontFamily: "Jost" }}
                sx={{ color: "#f15a21", mt: 1.5, ml: -3 }}
              >
                Logout
              </ListItemText>
            </ListItemButton>
          </List>
        </Grid>
      </Box>
    </Grid>
  );
};

export default SideNav;
