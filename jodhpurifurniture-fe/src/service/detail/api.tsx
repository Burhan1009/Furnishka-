import { takeLatest, put, call} from "redux-saga/effects";
import appService, { IAppServiceParams} from "../appService";
import { ProductActions } from "./states";

function* getProductReviewsSaga({ payload }: any) {
  const params = {
    method: "get",
    url: `/getreviewsbyproduct/${payload}`,
  };
  try {
    //@ts-ignore
    const data = yield call(appService, params);
    yield put(ProductActions.getProductDetailReviewSuccess(data?.data));
  } catch (e: any) {
    yield put(
      ProductActions.getProductDetailReviewError(e?.response?.data || e)
    );
  }
}

function* getSimilarProductSaga({ payload }: any) {
  const params = {
    method: "get",
    url: `/getproductbycategory/${payload}`,
  };
  try {
    //@ts-ignore
    const data = yield call(appService, params);
    yield put(ProductActions.getSimilarProductSuccess(data?.data));
  } catch (e: any) {
    yield put(ProductActions.getSimilarProductError(e?.response?.data || e));
  }
}

function* getProductDetailSaga({ payload }: any) {
  const params: IAppServiceParams = {
    method: "get",
    url: `/AllRelatedProducts/${payload}`,
    SecondUrl: true,
  };
  try {
    //@ts-ignore
    const data = yield call(appService, params);
    yield put(ProductActions.getProductDetailSuccess(data));
    if (data?.data) {
      yield put(ProductActions.getProductDetailReview(data?.data?.product_id));
      if(data?.data?.cat_slug_key){
        yield put(ProductActions.getSimilarProduct(data.data.cat_slug_key?.split(",")[0]));
      }
      
    }
  } catch (e: any) {
    yield put(ProductActions.getProductDetailError(e?.response?.data || e));
  }
}

export default function* ProductSaga() {
  yield takeLatest(ProductActions.getProductDetail.type, getProductDetailSaga);
  yield takeLatest(
    ProductActions.getSimilarProduct.type,
    getSimilarProductSaga
  );

  yield takeLatest(
    ProductActions.getProductDetailReview.type,
    getProductReviewsSaga
  );
}
