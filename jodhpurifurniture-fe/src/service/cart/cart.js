import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

if (typeof window !== 'undefined') {
  var item = localStorage.getItem('cartItems');
}
const initialState = {
  cartItems: item ? JSON.parse(localStorage.getItem('cartItems')) : [],
};

const cartSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {

    addToCart(state, action) {
      // console.log('action',action)
      const existingIndex = state.cartItems.findIndex(
        item => item.product_id == action.payload.product_id
      );

      if (existingIndex >= 0 && action.payload.qty > 1) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          qty: state.cartItems[existingIndex].qty + action.payload.qty,
        };
        // toast.success('Product added to cart');
      }
      else if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          qty: state.cartItems[existingIndex].qty + 1,
        };
        // toast.success('Product added to cart');
      } else {
        let tempProductItem = { ...action.payload };
        state.cartItems.push(tempProductItem);
        // toast.success('Product added to cart');
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        item => item.product_id == action.payload.product_id
      );

      if (state.cartItems[itemIndex].qty > 1) {
        state.cartItems[itemIndex].qty -= 1;
      } else if (state.cartItems[itemIndex].qty === 1) {
        const nextCartItems = state.cartItems.filter(
          item => item.product_id !== action.payload.product_id
        );

        state.cartItems = nextCartItems;
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      state.cartItems.map(cartItem => {
        if (cartItem.product_id === action.payload.product_id) {
          const nextCartItems = state.cartItems.filter(
            item => item.product_id !== cartItem.product_id
          );

          state.cartItems = nextCartItems;
        }
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        return state;
      });
    },
    clearCart(state, action) {
      state.cartItems = [];
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart, decreaseCart, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
