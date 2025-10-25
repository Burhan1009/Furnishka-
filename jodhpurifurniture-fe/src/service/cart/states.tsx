import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  withoutLogin: [],
  addCart: undefined,
  getUserCart: undefined,
  removeUserCartItem: undefined,
  cartItems: [],
  userAddress: undefined,
  addressId: undefined,
  billingId: undefined,
};

const Cartslice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    postCartWithoutLogin: (state, action) => {
      return {
        ...state,
        isLoading: true,
        withoutLogin: undefined,
      };
    },
    postCartWithoutLoginSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        withoutLogin: action.payload,
      };
    },
    postCartWithoutLoginError: (state) => {
      return {
        ...state,
        isLoading: false,
        withoutLogin: undefined,
      };
    },
    addCart: (state) => {
      return {
        ...state,
        isLoading: false,
        addCart: undefined,
      };
    },
    addCartSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        addCart: action.payload,
      };
    },
    addCartError: (state) => {
      return {
        ...state,
        isLoading: false,
        addCart: undefined,
      };
    },
    getUserCart: (state) => {
      return {
        ...state,
        isLoading: true,
        getUserCart: undefined,
      };
    },
    getUserCartSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        getUserCart: action.payload,
      };
    },
    getUserCartError: (state) => {
      return {
        ...state,
        isLoading: false,
        getUserCart: undefined,
      };
    },
    deleteUserCart: (state) => {
      return {
        ...state,
        isLoading: true,
        removeUserCartItem: undefined,
      };
    },
    deleteUserCartSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        removeUserCartItem: action.payload,
      };
    },
    deleteUserCartError: (state) => {
      return {
        ...state,
        isLoading: false,
        removeUserCartItem: undefined,
      };
    },
    getUserAddress: (state) => {
      return {
        ...state,
        isLoading: true,
        userAddress: undefined,
      };
    },
    getUserAddressSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        userAddress: action.payload,
      };
    },
    getUserAddressError: (state) => {
      return {
        ...state,
        isLoading: false,
        userAddress: undefined,
      };
    },
    getAddressId: (state, action) => {
      return {
        ...state,
        addressId: action.payload,
      };
    },
    getBillingId: (state, action) => {
      return {
        ...state,
        billingId: action.payload,
      };
    },
    addCartLocal(state, action) {
      // console.log('🚀 ~ action:', action);
      const itemIndex = state.cartItems?.findIndex(
        (val) =>
          val.product_id == action.payload.product_id &&
          val.attribute_id == action.payload.attribute_id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].qty += 1;
      } else {
        const temp = { ...action.payload, qty: 1 };
        // state.cartItems.push(temp);
        // console.log('🚀 ~ temp:', temp);
      }
    },
  },
});

export const cartActions = Cartslice.actions;
export const { addCartLocal } = Cartslice.actions;
export default Cartslice.reducer;
