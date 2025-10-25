import {
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector
  } from 'react-redux';
  import type { TypedUseSelectorHook } from 'react-redux';
  import type { ThunkAction } from 'redux-thunk';
  import { configureStore } from '@reduxjs/toolkit';
  import type { Action } from '@reduxjs/toolkit';
  import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
  import rootReducer from './slice';
  import rootSaga from './saga';
  import logger from 'redux-logger';
  import { persistReducer, persistStore } from 'reduxjs-toolkit-persist';
  import autoMergeLevel1 from 'reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1';
  import storage from './storage';
  let store: any;
  const sagaMiddleware = createSagaMiddleware();
  
  const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel1,
    blacklist : ['productDetail']

  };
  
  function initStore() {
    const middleware = [sagaMiddleware as SagaMiddleware];
    //@ts-ignore
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    // let devTools = false;
    if (process.env.NODE_ENV === 'development') {
      middleware.push(logger as any);
      // devTools = true;
    }
  
    return configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({
          immutableCheck: false,
          serializableCheck: false
        }),
        ...middleware
      ],
    //   devTools
    });
  }
  export const initializeStore = () => {
    let _store = store ?? initStore();
  
    _store.sagaTask = sagaMiddleware.run(rootSaga);
    _store.persistor = persistStore(_store);
  
    return _store;
  };
  
  export const appStore = initializeStore();
  
  export type RootState = ReturnType<typeof store.getState>;
  
  export type AppStore = ReturnType<typeof rootReducer>;
  
  export type AppDispatch = typeof store.dispatch;
  
  export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
  
  export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
  
  export const useDispatch = () => useReduxDispatch<AppDispatch>();
  