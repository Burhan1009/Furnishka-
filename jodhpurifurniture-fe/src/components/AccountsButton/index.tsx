import * as React from "react";

import Typography from "@mui/material/Typography";

import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectAuth } from "@/service/auth/globalstate";

interface IMyOrderCard {}
const AccountsButton: React.FC<IMyOrderCard> = () => {
  const router = useRouter();
  const auth = useSelector(selectAuth);
  const authData = auth?.length > 0 ? auth[0] : "";
  

  return (
    <Typography sx={{ display: { md: "none" }, ml: 2, mr: 2 }}>
      <Button
      onClick={() => router.push("/my-account/account/edit/"+authData.user_id)}
        sx={{
          border: "1px solid #E5E5E5",
          mt: 3,
        }}
        fullWidth
      >
        <Typography sx={{ flexDirection: "column" }}>
          <Typography
            sx={{
              mt: 3,
              fontSize: 18,
              fontWeight: "600",
              color: "black",
              fontFamily:'Jost',
              textTransform: "capitalize",
            }}
           
          >
            {" "}
            Edit Account
          </Typography>
          <Typography
            sx={{
              mb: 3,
              fontSize: 16,
              fontWeight: "400",
              color: "black",
              fontFamily:'Jost',
              textTransform: "capitalize",
            }}
           
          >
            Edit your personal details
          </Typography>
        </Typography>
      </Button>

      <Button
      onClick={() => router.push("/my-account/myorders")}
        sx={{
          border: "1px solid #E5E5E5",
          mt: 3,
          
        }}
        fullWidth
      >
        <Typography sx={{ flexDirection: "column" ,}}>
          <Typography
            sx={{
              mt: 3,
              fontSize: 18,
              fontWeight: "600",
              fontFamily:'Jost',
              color: "black",
              textTransform: "capitalize",
            }}
            
          >
            {" "}
            My Order
          </Typography>
          <Typography
            sx={{
              mb: 3,
              fontSize: 16,
              fontWeight: "400",
              color: "black",
              fontFamily:'Jost',
              textTransform: "capitalize",
            }}
            
          >
            Track your orders or buy again
          </Typography>
        </Typography>
      </Button>
      <Button
      onClick={() => router.push("/my-account/address/address-book")}
        sx={{
          border: "1px solid #E5E5E5",
          mt: 3,
        }}
        fullWidth
      >
        <Typography sx={{ flexDirection: "column" }}>
          <Typography
            sx={{
              mt: 3,
              fontFamily:'Jost',
              fontSize: 18,
              fontWeight: "600",
              color: "black",
              textTransform: "capitalize",
            }}
            
          >
            {" "}
            Address Book
          </Typography>
          <Typography
            sx={{
              mb: 3,
              fontSize: 16,
              fontWeight: "400",
              fontFamily:'Jost',
              color: "black",
              textTransform: "capitalize",
            }}
           
          >
            Edit or add address for orders
          </Typography>
        </Typography>
      </Button>
      <Button
      onClick={() => router.push("/my-account/wishlist")}
        sx={{
          border: "1px solid #E5E5E5",
          mt: 3,
        }}
        fullWidth
      >
        <Typography sx={{ flexDirection: "column" }}>
          <Typography
            sx={{
              mt: 3,
              fontSize: 18,
              fontFamily:'Jost',
              fontWeight: "600",
              color: "black",
              textTransform: "capitalize",
            }}
            
          >
            {" "}
            Wishlist
          </Typography>
          <Typography
            sx={{
              mb: 3,
              fontFamily:'Jost',
              fontSize: 16,
              fontWeight: "400",
              color: "black",
              textTransform: "capitalize",
            }}
           
          >
            Your product wishlist
          </Typography>
        </Typography>
      </Button>
      {/* <Button
      onClick={() => router.push("/my-account/myreviews")}
        sx={{
          border: "1px solid #E5E5E5",
          mt: 3,
        }}
        fullWidth
      >
        <Typography sx={{ flexDirection: "column" }}>
          <Typography
            sx={{
              mt: 3,
              fontFamily:'Jost',
              fontSize: 18,
              fontWeight: "600",
              fontFaimly: "cursive",
              color: "black",
              textTransform: "capitalize",
            }}
            
          >
            {" "}
            Review Ratings
          </Typography>
          <Typography
            sx={{
              mb: 3,
              fontFamily:'Jost',
              fontSize: 16,
              fontWeight: "400",
              color: "black",
              textTransform: "capitalize",
            }}
          
          >
            Product review ratings
          </Typography>
        </Typography>
      </Button> */}

      <Button
      onClick={() => router.push("/my-account/support")}
        sx={{
          border: "1px solid #E5E5E5",
          mt: 3,
        }}
        fullWidth
      >
        <Typography sx={{ flexDirection: "column" }}>
          <Typography
            sx={{
              mt: 3,
              fontFamily:'Jost',
              fontSize: 18,
              fontWeight: "600",
              fontFaimly: "Jost",
              color: "black",
              textTransform: "capitalize",
            }}
          
          >
            {" "}
            Support
          </Typography>
          <Typography
            sx={{
              mb: 3,
              fontSize: 16,
              fontWeight: "400",
              color: "black",
              fontFamily:'Jost',
              textTransform: "capitalize",
            }}
           
          >
            Support system
          </Typography>
        </Typography>
      </Button>
    </Typography>
  );
};
export default AccountsButton;
