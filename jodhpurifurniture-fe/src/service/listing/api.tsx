import { takeLatest, put, call } from "redux-saga/effects";
import { OtherCatActions } from "./states";
import appService, { IAppServiceParams, Params } from "../appService";

function* getOtherCategorySaga({ payload }: any) {
  const params = {
    method: "get",
    url: `/getothercategories/${payload}`,

    showSuccessMsg: true,
  };
  try {
    //@ts-ignore
    const data = yield call(appService, params);
    yield put(OtherCatActions.getOtherCategorySuccess(data?.data));
  } catch (e: any) {
    yield put(OtherCatActions.getOtherCategoryError(e?.response?.data || e));
  }
}

function* getSearchSaga({ payload }: any) {
  const params: IAppServiceParams = {
    method: "get",
    url: `/getsearchproducts`,

    showSuccessMsg: true,
    params: payload,
  };
  try {
    //@ts-ignore
    const data = yield call(appService, params);
    yield put(OtherCatActions.getSearchProductSuccess(data?.data));
  } catch (e: any) {
    yield put(OtherCatActions.getSearchProductError(e?.response?.data || e));
  }
}

function* getProductListingSaga({ payload }: any) {
  const searchParams = new URLSearchParams(payload).toString();
  const params: IAppServiceParams = {
    method: "get",
    url: `/getAllProducts?${searchParams}`,
    SecondUrl: true,
  };
  try {
    //@ts-ignore
    const data = yield call(appService, params);
    yield put(OtherCatActions.getProductListingSuccess(data));
  } catch (e: any) {
    yield put(OtherCatActions.getProductListingError(e?.response?.data || e));
  }
}

function* getProductCatDetailSaga({ payload }: any) {
  const params: IAppServiceParams = {
    method: "get",
    url: `/getcategorydetails/${payload}`,
    showSuccessMsg: true,
  };
  try {
    //@ts-ignore
    const data = yield call(appService, params);
    yield put(OtherCatActions.getProductCatDetailSuccess(data));
    if (data) {
      yield put(OtherCatActions.getOtherCategory(data[0]?.sub_category_id));
    }
  } catch (e: any) {
    yield put(OtherCatActions.getProductCatDetailError(e?.response?.data || e));
  }
}

function* getAllFilterListSaga({ payload }: any) {
  const searchParams = new URLSearchParams(payload).toString();

  const params: IAppServiceParams = {
    method: "get",
    url: `/getAllFilters?${searchParams}`,
  };
  try {
    //@ts-ignore
    const data = yield call(appService, params);
    yield put(OtherCatActions.getAllFilterSuccess(data));
  } catch (e: any) {
    yield put(OtherCatActions.getAllFilterError(e?.response?.data || e));
  }
}

export default function* OtherCatSaga() {
  yield takeLatest(OtherCatActions.getOtherCategory.type, getOtherCategorySaga);
  yield takeLatest(OtherCatActions.getSearchProduct.type, getSearchSaga);
  yield takeLatest(OtherCatActions.getAllFilter.type, getAllFilterListSaga);

  yield takeLatest(
    OtherCatActions.getProductListing.type,
    getProductListingSaga
  );
  yield takeLatest(
    OtherCatActions.getProductCatDetail.type,
    getProductCatDetailSaga
  );
}
