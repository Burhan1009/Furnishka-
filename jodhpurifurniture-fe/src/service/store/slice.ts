import { combineReducers } from '@reduxjs/toolkit';

import { authAction } from '../auth/states';
import authReducer from '../auth/states';
import OtherCatSlice from '../listing/states'
import ProductDetailSlice from '../detail/states'
import CartSlice from '../cart/states'
import  CartReducer from '../cart/cart'

const appMainReducers = combineReducers({
  auth: authReducer,
  otherCategory:OtherCatSlice,
  productDetail:ProductDetailSlice,
  cart:CartSlice,
  carts:CartReducer

});

const rootReducer = (state: any, action: any) => {
  if (action.type === authAction.logOut.type) {
    const { auth } = state;
    // console.log("🚀 ~ auth", auth)
    localStorage.removeItem('persist:root');
    state = { auth, message: { success: 'Logout successfully!' } };
    return appMainReducers(state, action);
  }
  return appMainReducers(state, action);
};

export default rootReducer;
