import { all, fork, spawn } from 'redux-saga/effects';

import authSaga from '../auth/api'
import cartSaga from '../cart/api';
import ProductSaga from '../detail/api';
import OtherCatSaga from '../listing/api';

export default function* rootSaga() {
  //add your saga here...
  const sagas = [
    authSaga,
    OtherCatSaga,
    ProductSaga,
    cartSaga

  ];

  const runSaga = sagas.map((saga) =>
    spawn(function* () {
      while (true) {
        try {
          yield fork(saga);
          break;
        } catch (e) {
          // console.log('RootSagaError: ', e);
        }
      }
    })
  );

  yield all(runSaga);
}
