import { createSlice } from '@reduxjs/toolkit';

const initialValues = {
  isAuthenticated: false,
  isLoading: false,
  loginSuccess: false,
  signUpSuccess: false,
  signUpUser: undefined,
  token: null,
  isVerifyOtpSuccess: false,
  socialLoginSuccess: false,
  error: false,
  verifyOtp: undefined,
  verifyOtpLoading: false,
  authUser: undefined,
  userData: undefined,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialValues,
  reducers: {
    loginStart(state) {
      return {
        ...state,
        isAuthenticated: false,
        isLoading: true,
        loginSuccess: false,
        error: false,
      };
    },

    loginSuccess(state, action) {
      // console.log('🚀 ~ action:', action.payload);
      const { verifytoken } = action.payload;

      return {
        ...state,
        isLoading: false,
        error: false,
        isAuthenticated: true,
        token: verifytoken,
        loginSuccess: true,
        authUser: [action.payload],
      };
    },
    loginError(state) {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        loginSuccess: false,
        error: true,
        token: null,
        authUser: undefined,
      };
    },
    getUserDetail(state) {
      return {
        ...state,

        isLoading: true,
      };
    },
    getUserDetailSuccess(state,action) {
      return {
        ...state,
        isLoading: false,
        userData:action.payload
      
      };
    },
    getUserDetailError(state) {
      return {
        ...state,
        userData:undefined,
        isLoading: false,
     
      };
    },
    signUpStart(state) {
      return {
        ...state,
        error: false,
        isAuthenticated: false,
        isLoading: true,
        signUpSuccess: false,
      };
    },

    signUpSuccess(state, action) {
      // console.log('🚀 ~ action:', action);

      const { payload } = action;
      const verifytoken = payload?.length ? payload[0]?.verifytoken : '';

      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        token: verifytoken,
        error: false,
        signUpSuccess: true,

        authUser: action.payload,
      };
    },
    signUpError(state) {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: true,
        token: null,
        signUpSuccess: false,

        authUser: undefined,
      };
    },

    socialSignUpStart(state) {
      return {
        ...state,
        isAuthenticated: false,
        isLoading: true,
        socialLoginSuccess: false,
        error: false,
      };
    },

    socialSignUpSuccess(state, action) {
      // console.log('🚀 ~ action:', action);

      const { payload } = action;
      const verifytoken = payload?.length ? payload[0]?.verifytoken : '';

      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        token: verifytoken,
        socialLoginSuccess: true,
        error: false,
        authUser: action.payload,
      };
    },
    socialSignUpError(state) {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        token: null,
        socialLoginSuccess: false,
        error: true,
        authUser: undefined,
      };
    },
    logOut(state) {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        token: null,
        authUser: null,
      };
    },

    verifyOtpStart: (state, action) => ({
      ...state,
      verifyOtp: undefined,
      verifyOtpLoading: true,
      isVerifyOtpSuccess: false,
    }),
    verifyOtpSuccess: (state, action) => ({
      ...state,
      verifyOtp: action.payload,
      verifyOtpLoading: false,
      isVerifyOtpSuccess: true,
    }),
    verifyOtpError: (state, action) => ({
      ...state,
      verifyOtp: action.payload,
      verifyOtpLoading: false,
      isVerifyOtpSuccess: false,
    }),
    resetOtoData: state => ({
      ...state,
      verifyOtp: undefined,
    }),
    resetOtpState: state => ({
      ...state,
      isVerifyOtpSuccess: false,
    }),
  },
});

export const authAction = { ...authSlice.actions };
export default authSlice.reducer;
