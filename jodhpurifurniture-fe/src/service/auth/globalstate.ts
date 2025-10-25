import { createSelector } from '@reduxjs/toolkit';
import { AppStore } from '../store';

const getAuthSlice = (store: AppStore) => store.auth;
const getOtherCatReducer = (store: AppStore) => store.otherCategory;

export const selectAccessToken = createSelector([getAuthSlice], auth => {
  return auth?.token ?? '';
});


export const selectSearchProduct = createSelector(
  getOtherCatReducer,
  otherCategory => otherCategory?.SearchProduct ?? []
);

export const selectFilterLoading = createSelector(
  getOtherCatReducer,
  otherCategory => otherCategory?.isFilterLoading ?? false
);

//getAllFilter 
export const selectAllFilters = createSelector(
  getOtherCatReducer,
  otherCategory => otherCategory?.getFilters ?? []
);


export const selectSearchWord = createSelector(
  getOtherCatReducer,
  otherCategory => otherCategory?.searchWord ?? ""
);

export const selectProductListing = createSelector(
  getOtherCatReducer,
  otherCategory => otherCategory?.ProductListing?.data ?? []
);

export const selectProductListLoading = createSelector(
  getOtherCatReducer,
  otherCategory => otherCategory?.isLoading
);
export const selectProductListLoading1 = createSelector(
  getOtherCatReducer,
  otherCategory => otherCategory?.isProductLoading
);
export const selectProductListingAttribute = createSelector(
  getOtherCatReducer,
  otherCategory => otherCategory?.ProductListing?.attributes ?? []
);



export const selectOtherCategoryLoading = createSelector(
  getOtherCatReducer,
  otherCategory => otherCategory?.otherCategoryLoading
);


export const selectLoginLoading = createSelector(
  getAuthSlice,
  auth => auth?.isLoading ?? ''
);

export const selectOtherCategory = createSelector(
  getOtherCatReducer,
  otherCategory => otherCategory?.otherCategory ?? []
);

export const selectallcategory = createSelector(
  getOtherCatReducer,
  otherCategory => otherCategory?.ProductCatDetail ?? []
);

export const isProcutHasErr = createSelector(
  getOtherCatReducer,
  otherCategory => otherCategory?.isProductError ?? false
);


export const selectLastUrl = createSelector(
  getOtherCatReducer,
  otherCategory => otherCategory?.lasturl ?? ""
);

export const selectAppliedCoupon = createSelector(
  getOtherCatReducer,
  otherCategory => otherCategory?.couponApplied ?? 0
);

// export const selectAuthData = createSelector(
//   [getAuthSlice],
//   (auth) => {
//     return {
//       name:auth?.authUser[0]?.full_name ?? "",
//       email: auth?.authUser?.email ?? '',
//       userId: auth.authUser?.user_id ?? '',
//       phone: auth.authUser?.phone ?? '',

//     };
//   }
// );

export const selectAuth = createSelector(
  getAuthSlice,
  auth => auth?.authUser ?? []
);


export const selectUserDetail = createSelector(
  getAuthSlice,
  auth => auth?.userData ?? {}
);
export const selectAuthData = (key: string) =>
createSelector(selectAuth, auth =>
  auth && key in auth ? auth[key] : undefined
  );
  // console.log("🚀 ~ selectAuthData:", selectAuthData)

export const selectVerifyOtp = createSelector(
  getAuthSlice,
  auth => auth?.verifyOtp?.token ?? ''
);

export const selectVerfiyOtpLoading = createSelector(
  getAuthSlice,
  auth => auth.verifyOtpLoading
);


export const selectLoginSuccess = createSelector(
  getAuthSlice,
  auth => auth.loginSuccess
);


export const selectSignUpSuccess = createSelector(
  getAuthSlice,
  auth => auth.signUpSuccess
);

export const selectSocialSignUpSuccess = createSelector(
  getAuthSlice,
  auth => auth.socialLoginSuccess
);

export const selectErrorMessage = createSelector(
  getAuthSlice,
  auth => auth.error
);


export const selectIsVerifyOtpSuccess = createSelector(
  getAuthSlice,
  auth => auth.isVerifyOtpSuccess
);

export const selectCrateNewPass = createSelector(
  getAuthSlice,
  auth => auth.createNewPass
);

export const selectCrateNewPassLoading = createSelector(
  getAuthSlice,
  auth => auth.crateNewPassLoading
);

export const selctIsCreatePassSuccess = createSelector(
  getAuthSlice,
  auth => auth.isCreatePassSuccess
);
