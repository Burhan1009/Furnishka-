import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  productDetail: undefined,
  productReview: undefined,
  similarProducts: undefined,
};

const ProductDetailSlice = createSlice({
  name: "productDetail",
  initialState: initialState,
  reducers: {
    getProductDetail: (state) => {
      return {
        ...state,
        isLoading: true,
        productDetail: undefined,
      };
    },
    
    getProductDetailSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        productDetail: action.payload,
      };
    },
    getProductDetailError: (state) => {
      return {
        ...state,
        isLoading: false,
        productDetail: undefined,
      };
    },
    getProductDetailReview: (state) => {
      return {
        ...state,
        isLoading: true,
        productReview: undefined,
      };
    },
    getProductDetailReviewSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        productReview: action.payload,
      };
    },
    getProductDetailReviewError: (state) => {
      return {
        ...state,
        isLoading: false,
        productReview: undefined,
      };
    },
    getSimilarProduct: (state) => {
      return {
        ...state,
        isLoading: true,
        similarProducts: undefined,
      };
    },
    getSimilarProductSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        similarProducts: action.payload,
      };
    },
    getSimilarProductError: (state) => {
      return {
        ...state,
        isLoading: false,
        similarProducts: undefined,
      };
    },
    getProductDetailReset: (state) => {
      return {
        ...state,
        productDetail: undefined,
      };
    },
  },
});

export const ProductActions = ProductDetailSlice.actions;

export default ProductDetailSlice.reducer;
