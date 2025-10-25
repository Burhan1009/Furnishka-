import { takeLatest, put, call, select } from "redux-saga/effects";

import appService, { IAppServiceParams } from "../appService";
import { cartActions } from "./states";
import { selectAuth } from "../auth/globalstate";
import { useSelector } from "react-redux";
import { selectUserAddress } from ".";

function* addCartWithoutLoginSaga({ payload }: any) {
  const params: IAppServiceParams = {
    method: "post",
    url: `/getcartproducrts/`,
    data: payload,
    SecondUrl: true,
  };
  // console.log('🚀 ~ params:', params);
  // const addresses = useSelector(selectUserAddress);
  try {
    //@ts-ignore

    const data = yield call(appService, params);
    yield put(cartActions.postCartWithoutLoginSuccess(data?.data));
    // yield put(cartActions.getUserCart(addresses[0]?.user_id));
  } catch (e: any) {
    yield put(cartActions.postCartWithoutLoginError(e?.response?.data || e));
  }
}

function* getUserAddressSaga({ payload }: any) {
  const params: IAppServiceParams = {
    method: "GET",
    url: `/getuseraddress/${payload}`,
  };

  try {
    //@ts-ignore
    const data = yield call(appService, params);
    yield put(cartActions.getUserAddressSuccess(data?.data));
  } catch (e: any) {
    yield put(cartActions.getUserAddressError(e?.response?.data || e));
  }
}

function* getUserCartSaga({ payload }: any) {
  const params: IAppServiceParams = {
    method: "get",
    url: `/getusercart/${payload}`,
    SecondUrl: true,
  };

  try {
    //@ts-ignore
    const data = yield call(appService, params);
    console.log("sghgfhg", data?.data);
    yield put(cartActions.getUserCartSuccess(data?.data));
    if (data?.data) {
      yield put(cartActions.postCartWithoutLogin(data?.data));
    }
  } catch (e: any) {
    yield put(cartActions.getUserCartError(e?.response?.data || e));
  }
}

function* addCartWithLogin({ payload }: any) {
  const params: IAppServiceParams = {
    method: "post",
    url: `/addtocart/`,
    data: payload,
    SecondUrl: true,
  };

  try {
    const auth = yield select(selectAuth);
    const authData = auth?.length > 0 ? auth[0] : "";

    //@ts-ignore
    const data = yield call(appService, params);
    yield put(cartActions.addCartSuccess(data));
    if (authData?.user_id) {
      yield put(cartActions.getUserCart(authData?.user_id));
    } else {
      yield put(cartActions.getUserCart(payload?.user_id));
    }
  } catch (e: any) {
    yield put(cartActions.addCartError(e?.response?.data || e));
  }
}

function* deleteUserCartItemSaga({ payload }: any) {
  const params: IAppServiceParams = {
    method: "get",
    url: `/removeproductcart/${payload.userId}/${payload.productId}`,
    SecondUrl: true,
  };

  try {
    const auth = yield select(selectAuth);
    const authData = auth?.length > 0 ? auth[0] : "";

    //@ts-ignore
    const data = yield call(appService, params);
    yield put(cartActions.deleteUserCartSuccess(data?.data));
    yield put(cartActions.getUserCart(authData?.user_id));
  } catch (e: any) {
    yield put(cartActions.deleteUserCartError(e?.response?.data || e));
  }
}

export default function* cartSaga() {
  yield takeLatest(
    cartActions.postCartWithoutLogin.type,
    addCartWithoutLoginSaga
  );
  yield takeLatest(cartActions.addCart.type, addCartWithLogin);
  yield takeLatest(cartActions.deleteUserCart.type, deleteUserCartItemSaga);
  yield takeLatest(cartActions.getUserCart.type, getUserCartSaga);
  yield takeLatest(cartActions.getUserAddress.type, getUserAddressSaga);
}
