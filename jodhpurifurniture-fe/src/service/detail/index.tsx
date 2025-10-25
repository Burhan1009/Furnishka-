import { useQuery } from "react-query";
import appService, { IAppServiceParams } from "../appService";
import { createSelector } from "@reduxjs/toolkit";
import { AppStore } from "../store";

const getProductReducer = (store: AppStore) => store.productDetail;

export const selectProductDetail = createSelector(
  getProductReducer,
  (productDetail) => productDetail?.productDetail?.data ?? []
);

export const selectProductFetchSuccess = createSelector(
  getProductReducer,
  (productDetail) => productDetail?.productDetail?.success ?? false
);

export const selectProductDetailReview = createSelector(
  getProductReducer,
  (productDetail) => productDetail?.productReview ?? []
);
export const selectProductLoading = createSelector(
  getProductReducer,
  (productDetail) => productDetail?.isLoading ?? false
);

export const selectSimilarProducts = createSelector(
  getProductReducer,
  (productDetail) => productDetail?.similarProducts ?? []
);
//meta detail

export const useGetMetaProductDetail = (payload) => {
  const queryKey = [`meta-product`];

  const data: IAppServiceParams = {
    method: "GET",
    url: `/getdetailbyslugkey/${payload}`,
  };

  return useQuery(queryKey, () => appService(data), {
    onError: (e: any) => {},
  });
};

export const useOfferAvailabe = () => {
  const queryKey = [`offer-available`];

  const data: IAppServiceParams = {
    method: "GET",
    url: `/getactiveoffers`,
  };

  return useQuery(queryKey, () => appService(data), {
    onError: (e: any) => {},
  });
};

export const useGetReviewsDetail = (payload, options) => {
  const queryKey = [`reviews-detail`, payload];

  const data: IAppServiceParams = {
    method: "GET",
    url: `/getreviewsbyproduct/${payload.p_id}`,
  };

  return useQuery(queryKey, () => appService(data), {
    onError: (e: any) => {},
    ...options,
  });
};

// get all pincode

// export const useGetAllPincode = () => {
//   const queryKey = [`pincodeall`];

//   const data: IAppServiceParams = {
//     method: 'GET',
//     url: `/getallpincode`,
//   };

//   return useQuery(queryKey, () => appService(data), {
//     onError: (e: any) => {

//     },
//   });
// };
