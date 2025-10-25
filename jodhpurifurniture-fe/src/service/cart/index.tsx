import { createSelector } from "@reduxjs/toolkit";
import { useMutation, useQuery, useQueryClient } from "react-query";
import appService, { IAppServiceParams } from "../appService";
import { AppStore } from "../store";

//add cart  witout login
const getCartReducer = (store: AppStore) => store.cart;
const getCartLocalReducer = (store: AppStore) => store.carts;

export const selectCartWithoutLogin = createSelector(
  getCartReducer,
  (cart) => cart?.withoutLogin ?? []
);

export const selectCartSuccess = createSelector(
  getCartReducer,
  (cart) => cart?.addCart?.response
);

export const selectUserAddress = createSelector(
  getCartReducer,
  (cart) => cart?.userAddress ?? []
);

export const selectAddressID = createSelector(
  getCartReducer,
  (cart) => cart?.addressId ?? ""
);
export const selectBillId = createSelector(
  getCartReducer,
  (cart) => cart?.billingId ?? ""
);

export const selectLocalCart = createSelector(
  getCartLocalReducer,
  (carts) => carts?.cartItems ?? []
);

export const selectAddCartLoading = createSelector(
  getCartReducer,
  (cart) => cart?.isLoading
);

export const selectUserCart = createSelector(
  getCartReducer,
  (cart) => cart?.getUserCart ?? []
);

export const useGetUserCart = (payload: any) => {
  const queryKey = [`user-cart`];

  const data: IAppServiceParams = {
    method: "GET",
    url: `/getusercart/${payload}`,
  };

  return useQuery(queryKey, () => appService(data), {});
};

// export const useAddToCart = () => {
//   const queryKey = ["add-cart"];
//   const queryClient = useQueryClient();
//   const handleCartProducts = async (body) => {
//     const data: IAppServiceParams = {
//       method: "POST",
//       url: `/addtocart`,
//       showSuccessMsg: true,
//       data: body,
//     };

//     try {
//       return await appService(data);
//     } catch (e) {
//       throw e;
//     }
//   };

//   return useMutation(queryKey, (body) => handleCartProducts(body), {
//     onSuccess: (res: any, variables: any, context: unknown) => {
//       queryClient.invalidateQueries("user-cart");
//     },
//   });
// };

export const useApplyCoupon = () => {
  const queryKey = ["cart-coupon"];

  const handleCartProducts = async (body) => {
    const data: IAppServiceParams = {
      method: "POST",
      url: `/getcouponcodebycode`,
      showSuccessMsg: true,
      data: body,
    };

    try {
      return await appService(data);
    } catch (e) {
      throw e;
    }
  };

  return useMutation(queryKey, (body) => handleCartProducts(body), {});
};

//create order
export const useCreateOrder = () => {
  const queryKey = ["create-order"];

  const handleCartProducts = async (body) => {
    const data: IAppServiceParams = {
      method: "POST",
      url: `/create-order`,
      showSuccessMsg: true,
      showErrorMsg: true,
      data: body,
    };

    try {
      return await appService(data);
    } catch (e) {
      throw e;
    }
  };

  return useMutation(queryKey, (body) => handleCartProducts(body), {
    onSuccess: (data) => {
      // yield put(cartActions.getUserCart(addresses[0]?.user_id))
    },
  });
};

//save payment order

export const useSavePayementOrder = () => {
  const queryKey = ["save-order"];

  const handleCartProducts = async (body) => {
    const data: IAppServiceParams = {
      method: "POST",
      url: `/save-payment`,
      showSuccessMsg: true,
      data: body,
    };

    try {
      return await appService(data);
    } catch (e) {
      throw e;
    }
  };

  return useMutation(queryKey, (body) => handleCartProducts(body), {});
};
