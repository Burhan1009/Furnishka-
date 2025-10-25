import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { WishListCard } from "@/components";
import SideNav from "./SideNavigation";
import { useDeleteWishlist, useGetWishlist } from "@/service/wishlist";
import { selectAuth } from "@/service/auth/globalstate";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectUserCart } from "@/service/cart";
import { cartActions } from "@/service/cart/states";
import { useGetHeaderCoupon } from "@/service/home";

const Wishlist = () => {
  
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const authData = auth?.length > 0 ? auth[0] : "";
  const { data } = useGetWishlist(authData.user_id);
  const [deleteId, setDeleteId] = React.useState();
  const getUserCart = useSelector(selectUserCart);
  const storeWishlist = data?.data ?? [];
  const { data: headerDiscount1 } = useGetHeaderCoupon();
  const headerDiscount = headerDiscount1?.data ?? {};

  
  const {
    mutate: deleteWishlist,
    isLoading: deleteWishlistLoading,
    data: message,
  } = useDeleteWishlist();

  useEffect(() => {
    if (message?.response == 1) {
      toast.success(message?.message);
    }
  }, [message]);

  const slugKeyHandle = (slug_key) => {
    window.open("/" + slug_key);
  };

  const handleWishlistDelete = (product_id) => {
    const body = {
      user_id: authData?.user_id,
      product_id: product_id,
    };
    deleteWishlist(body);
  };

  const handleCart = (product_id) => {
    const attributeValues =
      getUserCart?.length > 0 &&
      getUserCart?.filter((val) => val.product_id == product_id);

    const qtyAdd =
      getUserCart?.length &&
      getUserCart?.filter((item) => {
        return attributeValues?.find(
          (val) => val.product_id == item.product_id
        );
      });

    const cartLogin = {
      product_id: product_id ?? "",
      qty: 1,
      user_id: authData?.user_id ?? "",
    };

    const addNew = {
      product_id: qtyAdd[0]?.product_id ?? "",
      qty: qtyAdd[0]?.qty + 1 ?? "",
      user_id: authData?.user_id ?? "",
    };

    if (qtyAdd?.length) {
      dispatch(cartActions.addCart(addNew));
    } else {
      dispatch(cartActions.addCart(cartLogin));
    }
    toast.success("Product added to cart");
  };

  return (
    <div className="container2">
      <Grid
        sx={{
          mt: { xs: 3, md: 4 },
          display: "flex",
          gap: 3,
          justifyContent: { xs: "center", md: "left" },
        }}
      >
        <Grid
          sx={{
            width: 290,
            display: { xs: "none", sm: "none", md: "inline" },
          }}
        >
          <SideNav />
        </Grid>

        <Grid>
          <h1 className="font-2543 fw-500 jost">My Wishlist</h1>
          <Grid
            sx={{
              display: "flex",
              gap: 3,

              justifyContent: { xs: "center", md: "left" },
              flexWrap: "wrap",
              mt: 2,
            }}
          >
            {storeWishlist.length > 0 &&
              storeWishlist?.map((item: any) => {
                const afterCoupnPrize = headerDiscount?.rate
                  ? headerDiscount?.coupon_code_type == 2
                    ? item.sale_price -
                      (item.sale_price * headerDiscount?.rate) / 100
                    : item.sale_price - headerDiscount?.rate
                  : item.sale_price;
                return (
                  <WishListCard
                    handleslugKey={() => slugKeyHandle(item.slug_key)}
                    isLoading={
                      deleteId == item.product_id
                        ? deleteWishlistLoading
                        : false
                    }
                    content={item.product_name}
                    handleDelete={() => handleWishlistDelete(item.product_id)}
                    image={item.base_image}
                    title={item.product_name}
                    alt={item.image_alt_tag}
                    prize={
                      afterCoupnPrize
                        .toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })
                        .split(".")[0]
                    }
                    discountprize={
                      item.regular_price
                        .toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })
                        .split(".")[0]
                    }
                    handleAddCart={() => handleCart(item.product_id)}
                  />
                );
              })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Wishlist;
