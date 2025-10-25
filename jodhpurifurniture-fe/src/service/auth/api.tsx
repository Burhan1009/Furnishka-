import { takeLatest, put, call,  } from 'redux-saga/effects';

import { authAction } from './states';
import appService, { IAppServiceParams } from '../appService';
import { cartActions } from '../cart/states';

function* loginSaga({ payload }: any) {
  const params:IAppServiceParams = {
    method: 'POST',
    url: `/login`,
    data: payload,
    SecondUrl:true,
    showErrorMsg: true,
  };
  try {
    //@ts-ignore  const auth = yield select(selectAuth);
    const data = yield call(appService, params);
    yield put(authAction.loginSuccess(data?.data));
    if (data?.data?.user_id) {
      yield put(cartActions.getUserCart(data?.data?.user_id));
      yield put(authAction.getUserDetail(data?.data?.user_id))
    }
  } catch (e: any) {
    yield put(authAction.loginError(e?.response?.data || e));
  }
}

function* getUserDetailSaga({ payload }: any) {
  const params:IAppServiceParams = {
    method: 'get',
    url: `/getuserdetails/${payload}`,
    SecondUrl:true,
  };
  try {
    //@ts-ignore  const auth = yield select(selectAuth);
    const data = yield call(appService, params);
    yield put(authAction.getUserDetailSuccess(data?.data));
  } catch (e: any) {
    yield put(authAction.getUserDetailError(e?.response?.data || e));
  }
}


function* signUpSaga({ payload }: any) {
  const params:IAppServiceParams = {
    method: 'POST',
    url: `/signup`,
    data: payload,
    SecondUrl:true,
    showSuccessMsg: true,
    showErrorMsg: true,
  };
  try {
    //@ts-ignore
    const data = yield call(appService, params);
    yield put(authAction.signUpSuccess(data?.data));
    if (data?.data?.length) {
      yield put(cartActions.getUserCart(data?.data[0]?.user_id));
      yield put(authAction.getUserDetail(data?.data[0]?.user_id))
    }
  } catch (e: any) {
    yield put(authAction.signUpError(e?.response?.data || e));
  }
}

function* socialSignUpSaga({ payload }: any) {
  const params:IAppServiceParams = {
    method: 'POST',
    url: `/socialsignup`,
    data: payload,
    SecondUrl:true,
    showSuccessMsg: true,
    showErrorMsg: true,
  };
  try {
    //@ts-ignore
    const data = yield call(appService, params);
    yield put(authAction.socialSignUpSuccess(data?.data));
    if (data?.data?.length) {
      yield put(cartActions.getUserCart(data?.data[0]?.user_id));
      yield put(authAction.getUserDetail(data?.data[0]?.user_id))
    }
  } catch (e: any) {
    yield put(authAction.socialSignUpError(e?.response?.data || e));
  }
}

export default function* authSaga() {
  yield takeLatest(authAction.loginStart.type, loginSaga);
  yield takeLatest(authAction.getUserDetail.type, getUserDetailSaga);
  yield takeLatest(authAction.signUpStart.type, signUpSaga);
  yield takeLatest(authAction.socialSignUpStart.type, socialSignUpSaga);
}
