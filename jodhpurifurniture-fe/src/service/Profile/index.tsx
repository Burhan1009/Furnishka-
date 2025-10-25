import { useMutation, useQueryClient } from "react-query";

import appService, { IAppServiceParams } from "../appService";

//get Add Address
export const useCreateAddAddress = () => {
  const queryKey = ["create-address"];
  const queryClient = useQueryClient();
  const handleCreateEvent = async (body) => {
    const data: IAppServiceParams = {
      method: "POST",
      url: `/addnewaddress`,
      showErrorMsg: true,

      data: body,
    };

    try {
      return await appService(data);
    } catch (e) {
      throw e;
    }
  };

  return useMutation(queryKey, (body) => handleCreateEvent(body), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user-cart"]);
      // dispatch(cartActions.getUserAddress(guestAuthUser));
    },
  });
};

// add to wishlist

export const useAddToWishlist = () => {
  const queryKey = ["create-wislist"];
  const queryClient = useQueryClient();
  const handleCreateEvent = async (body) => {
    const data: IAppServiceParams = {
      method: "POST",
      url: `/create_wishlist`,
      showErrorMsg: true,
      SecondUrl: true,
      data: body,
    };

    try {
      return await appService(data);
    } catch (e) {
      throw e;
    }
  };

  return useMutation(queryKey, (body) => handleCreateEvent(body), {
    onSuccess: (res: any, variables: any, context: unknown) => {
      queryClient.invalidateQueries("user-wishlist");
    },
  });
};

// add product reivew

export const useAddProductReview = () => {
  const queryKey = ["create-review"];

  const handleCreateEvent = async (body) => {
    const data: IAppServiceParams = {
      method: "POST",
      url: `/addreviewratings`,
      showErrorMsg: true,
      headerCred: {
        contentType: "multipart/form-data",
      },
      data: body,
    };

    try {
      return await appService(data);
    } catch (e) {
      throw e;
    }
  };

  return useMutation(queryKey, (body) => handleCreateEvent(body), {});
};
