import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isFilterLoading: false,
  otherCategory: undefined,
  otherCategoryLoading: false,
  SearchProduct: undefined,
  ProductListing: undefined,
  isProductLoading: false,
  ProductCatDetail: undefined,
  lasturl: undefined,
  couponApplied: undefined,
  searchWord: undefined,
  getFilters: undefined,
  isProductError: false
};

const OtherCatSlice = createSlice({
  name: "otherCategory",
  initialState: initialState,
  reducers: {
    getOtherCategory: (state, action) => {
      return {
        ...state,
        otherCategoryLoading: true,
        otherCategory: undefined,
        item: action.payload,
      };
    },

    getOtherCategorySuccess: (state, action) => {
      return {
        ...state,
        otherCategoryLoading: false,
        otherCategory: action.payload,
      };
    },
    getOtherCategoryError: (state) => {
      return {
        ...state,
        otherCategoryLoading: false,
        otherCategory: undefined,
      };
    },
    getSearchProduct: (state,) => {
      return {
        ...state,
        isLoading: true,
        SearchProduct: undefined,
      };
    },
    getSearchProductSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        SearchProduct: action.payload,
      };
    },
    getSearchProductError: (state) => {
      return {
        ...state,
        isLoading: false,
        SearchProduct: undefined,
      };
    },
    getProductListing: (state, action) => {
      return {
        ...state,
        isProductLoading: true,
        SearchProduct: undefined,
        items: action.payload,
        ProductListing: undefined,
        isProductError: false

      };
    },
    getProductListingSuccess: (state, action) => {
      return {
        ...state,
        isProductLoading: false,
        ProductListing: action.payload,
        isProductError: false

      };
    },
    getProductListingError: (state) => {
      return {
        ...state,
        isProductLoading: false,
        ProductListing: undefined,
        isProductError: true
      };
    },
    getProductCatDetail: (state,) => {
      return {
        ...state,
        isLoading: true,
        ProductCatDetail: undefined
      };
    },
    getProductCatDetailSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        ProductCatDetail: action.payload,
      };
    },
    getProductCatDetailError: (state) => {
      return {
        ...state,
        isLoading: false,
        ProductCatDetail: undefined,
      };
    },
    lastUrl: (state, action) => {
      return {
        ...state,
        lasturl: action.payload,
      };
    },

    lastUrlClear: (state) => {
      return {
        ...state,
        lasturl: null,
        otherCategory: [],
        ProductListing: null,
        isLoading: false,
      };
    },
    copounApplied: (state, action) => {
      return {
        ...state,
        couponApplied: action.payload,
      };
    },
    searchUrl: (state, action) => {
      return {
        ...state,
        searchWord: action.payload,
      };
    },
    //filters listing

    getAllFilter: (state, action) => {
      return {
        ...state,
        isFilterLoading: true,
        getFilters: undefined,
      };
    },
    getAllFilterSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        getFilters: action.payload,
      };
    },
    getAllFilterError: (state) => {
      return {
        ...state,
        isLoading: false,
        getFilters: undefined,
      };
    },
  },
});

export const OtherCatActions = OtherCatSlice.actions;

export default OtherCatSlice.reducer;
