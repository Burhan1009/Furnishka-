import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { createMuiTheme } from "@material-ui/core/styles";
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Grid, TextField, InputAdornment } from "@mui/material";
import { useFormik } from "formik";
import { authAction } from "@/service/auth/states";
import { useDispatch, useSelector } from "@/service/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

import {
  selectAccessToken,
  selectAuth,
  selectAuthData,
  selectErrorMessage,
  selectLoginLoading,
  selectLoginSuccess,
  selectSignUpSuccess,
  selectSocialSignUpSuccess,
} from "@/service/auth/globalstate";
import SignUp from "./SignUp";
import SocialButton from "./SocialButton";
import FbButton from "./FbButton";
import { loginFormSchema } from "@/common/validations";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Script from "next/script";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { cartActions } from "@/service/cart/states";
import LoginByNumber from "./LoginByNumber";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
let TogglePass = styled(BsEyeSlash)(
  () => `
      color : rgba(34, 51, 84, 0.5);
      height: 20px     
  `
);

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 2,
            top: 0,
            color: "black",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

interface IPageHeaderRequiredProps {
  isAddDialogOpened?: boolean;

  handleCloseDialog?: any;
}
export default function Login({
  isAddDialogOpened,
  handleCloseDialog,
}: IPageHeaderRequiredProps) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [isLoginByNo, setIsLoginByNo] = React.useState(false);
  const [isOTPScreen, setIsOTPScreen] = React.useState("");
  const loginLoading = useSelector(selectLoginLoading);
  const isLogin = useSelector(selectLoginSuccess);
  const isSignUpSuccess = useSelector(selectSignUpSuccess);
  const isSocialLogin = useSelector(selectSocialSignUpSuccess);
  const errMessage = useSelector(selectErrorMessage);
  const auth = useSelector(selectAuth);
  const authData = auth?.length > 0 ? auth[0] : "";

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values) => {
    const newValues = {
      ...values,
    };

    dispatch(authAction.loginStart(newValues));
  };

  const {
    handleSubmit: formikHandleSubmit,
    touched: formikTouched,
    errors: formikErrors,
    values: formikValues,
    setValues: formikSetValues,
    getFieldProps: formikGetFieldProps,
    setFieldValue: formikSetFieldValue,

    resetForm,
  } = useFormik<any>({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: loginFormSchema,
  });

  const handleClose = () => {
    handleCloseDialog(false);
    setIsSignUp(false);
    resetForm();
  };

  const handleIsSignup = () => {
    isSignUp ? setIsSignUp(false) : setIsSignUp(true);
  };

  React.useEffect(() => {
    if (isSignUpSuccess || isLogin || isSocialLogin) {
      handleClose();
      queryClient.invalidateQueries("user-cart");
      queryClient.invalidateQueries(`user-wishlist`);
      queryClient.invalidateQueries("address-details");
    }
  }, [isLogin, isSignUpSuccess, isSocialLogin]);
  const [passwordShown, setPasswordShown] = React.useState(false);
  // const [otp, setOtp] = React.useState(new Array(initialValues.otp).fill([]));
  // const [otpError, setOtpError] = React.useState(null);
  // const otpBoxReference = React.useRef([]);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
    if (passwordShown) {
      TogglePass = styled(BsEyeSlash)(
        () => `
          color : rgba(34, 51, 84, 0.5);
          height: 20px     
      `
      );
    } else {
      TogglePass = styled(BsEye)(
        () => `
            color : rgba(34, 51, 84, 0.5);
            height: 20px     
        `
      );
    }
  };
  const style = {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#DDDDDD",
      },
      background: "white",
    },
  };
  const theme = createMuiTheme({
    typography: {
      fontFamily: "Jost",
      body1: {
        fontFamily: "Jost", // your chosen Google Font
      },
      // You can also set the font family for other typography variants, like body2, h1, h2, etc.
    },
  });
  const loginByNumber = () => {
    console.log("hhhhhhh");
    setIsLoginByNo(true);
  };
  const handleLoginBack = () => {
    setIsLoginByNo(false);
  };
  const handleOTPSubmit = () => {
    setIsOTPScreen(formikHandleSubmit);
  };

  return (
    <>
      {" "}
      <GoogleOAuthProvider clientId="256018168919-98aldpfk937ho2hm9odl5tjc34hrhf12.apps.googleusercontent.com">
        <div className="dialog-class">
          <Dialog
            className="dialog-class"
            onClose={handleClose}
            maxWidth="auto"
            disableScrollLock
            open={isAddDialogOpened}
            PaperProps={{
              style: { borderRadius: 0 },
            }}
          >
            <form
              onSubmit={formikHandleSubmit}
              className="dialog-class otp-conatiner"
            >
              <Grid
                sx={{
                  width: { xs: "auto", md: 818 },
                  height: 568,

                  display: "flex",
                }}
              >
                <Box
                  sx={{
                    display: { xs: "none", md: "inline" },
                    position: "relative",
                    // backgroundImage: `url('/static/images/rectangle124 1.jpg')`,
                    width: 408,
                  }}
                >
                  <img
                    src={"/static/images/rectangle124 1.jpg"}
                    alt="A study table in a room with a chair and a computer"
                    title="Wooden Study Table"
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      paddingLeft: "60px",
                    }}
                  >
                    <Typography
                      mt={3}
                      fontFamily="Jost"
                      fontWeight={600}
                      fontSize={22}
                      color="#222222"
                      textTransform="uppercase"
                      align="center"
                    >
                      end of season
                    </Typography>
                    <Typography
                      mt={-4}
                      fontFamily="Jost"
                      fontWeight={700}
                      fontSize={96}
                      color="#f15a21"
                      textTransform="uppercase"
                      align="center"
                    >
                      Sale
                    </Typography>
                    <Typography
                      mt={-4}
                      fontFamily="Jost"
                      fontWeight={600}
                      fontSize={30}
                      color="#222222"
                      textTransform="uppercase"
                      align="center"
                    >
                      get Upto 55% off
                    </Typography>
                    <Typography
                      fontFamily="Jost"
                      fontWeight={600}
                      fontSize={20}
                      color="#f15a21"
                      textTransform="uppercase"
                      align="center"
                    >
                      + extra 20% off
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                  ></BootstrapDialogTitle>{" "}
                  <Grid
                    mt={-4.5}
                    sx={{ width: { xs: "auto", md: 410 }, p: { xs: 2, md: 3 } }}
                  >
                    <Typography
                      fontFamily="Jost"
                      fontWeight={600}
                      color="#222222"
                      sx={{ fontSize: { xs: 18, sm: 24 }, mb: { xs: 0.5 } }}
                    >
                      {isSignUp
                        ? "Sign up to your account"
                        : "Login to Your account"}
                    </Typography>
                    <Typography
                      fontFamily="Jost"
                      fontWeight={400}
                      sx={{ fontSize: { xs: 13, sm: 16 } }}
                      color="#767676"
                    >
                      {isSignUp
                        ? "Already have an account?"
                        : "Don’t have an account?"}

                      <Typography
                        sx={{ cursor: "pointer", fontSize: { xs: 14, sm: 16 } }}
                        onClick={handleIsSignup}
                        fontFamily="Jost"
                        fontWeight={400}
                        component="span"
                        color="#f15a21"
                      >
                        {isSignUp ? " Log in" : " Sign Up"}
                      </Typography>
                    </Typography>
                    <Grid mt={3}>
                      {isSignUp ? (
                        <SignUp />
                      ) : (
                        <>
                          {!isLoginByNo ? (
                            <>
                              {" "}
                              <TextField
                                sx={style}
                                error={Boolean(
                                  formikTouched.email && formikErrors.email
                                )}
                                helperText={
                                  formikTouched.email && formikErrors.email
                                }
                                size="small"
                                placeholder="Email ID"
                                {...formikGetFieldProps("email")}
                                fullWidth
                              ></TextField>
                              <TextField
                                sx={{ ...style }}
                                margin="normal"
                                size="small"
                                error={Boolean(
                                  formikTouched.password &&
                                    formikErrors.password
                                )}
                                type={passwordShown ? "text" : "password"}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <TogglePass
                                        onClick={togglePassword}
                                        style={{
                                          cursor: "pointer",
                                          color: "rgba(34, 51, 84, 0.5)",
                                        }}
                                      ></TogglePass>
                                    </InputAdornment>
                                  ),
                                }}
                                helperText={
                                  formikTouched.password &&
                                  formikErrors.password
                                }
                                {...formikGetFieldProps("password")}
                                placeholder="Password"
                                fullWidth
                              ></TextField>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Typography
                                  onClick={loginByNumber}
                                  mt={1}
                                  fontFamily="Jost"
                                  fontWeight={500}
                                  sx={{
                                    fontSize: { xs: 13, sm: 16 },
                                    cursor: "pointer",
                                  }}
                                  color="#f15a21"
                                  align="right"
                                >
                                  Login Using OTP
                                </Typography>

                                <Typography
                                  mt={1}
                                  fontFamily="Jost"
                                  fontWeight={500}
                                  sx={{ fontSize: { xs: 13, sm: 16 } }}
                                  color="#f15a21"
                                  align="right"
                                >
                                  Forgot Password?
                                </Typography>
                              </div>
                              <LoadingButton
                                type="submit"
                                loading={loginLoading}
                                sx={{
                                  boxShadow: "none",
                                  mt: 2.5,
                                  fontSize: { xs: 14, sm: 16 },
                                  fontFamily: "Jost",
                                  background: "#f15a21",
                                  borderRadius: "4px",
                                  height: 44,
                                  "&:hover": {
                                    backgroundColor: "#f15a21",
                                    color: "#fff",
                                    boxShadow: "none",
                                  },
                                }}
                                variant="contained"
                                fullWidth
                              >
                                Login
                              </LoadingButton>
                              <Typography
                                mt={3}
                                display={"flex"}
                                align="center"
                                className="bottom-border-login"
                              >
                                <Typography
                                  sx={{
                                    ml: { sm: 8, md: 2.5 },
                                    mr: { sm: 10, md: 2 },
                                  }}
                                  fontFamily="Jost"
                                  fontWeight={500}
                                  fontSize={13}
                                  color="#767676"
                                  align="center"
                                >
                                  <span>Or login with</span>
                                </Typography>
                              </Typography>
                            </>
                          ) : (
                            <>
                              {" "}
                              {!isOTPScreen ? (
                                <LoginByNumber />
                              ) : (
                                <div style={{ display: "flex" }}>
                                  <Typography
                                    onClick={handleLoginBack}
                                    mt={1}
                                    fontFamily="Jost"
                                    fontWeight={500}
                                    sx={{
                                      fontSize: { xs: 13, sm: 16 },
                                      cursor: "pointer",
                                    }}
                                    color="#f15a21"
                                    align="right"
                                  >
                                    Log in by Email
                                  </Typography>
                                </div>
                              )}
                              <div style={{ display: "flex" }}>
                                <Typography
                                  onClick={handleLoginBack}
                                  mt={1}
                                  fontFamily="Jost"
                                  fontWeight={500}
                                  sx={{
                                    fontSize: { xs: 13, sm: 16 },
                                    cursor: "pointer",
                                  }}
                                  color="#f15a21"
                                  // align="right"
                                >
                                  Log in by Email
                                </Typography>
                              </div>
                            </>
                          )}
                        </>
                      )}
                      <Grid
                        sx={{
                          display: "flex",
                          gap: 2,
                          ml: 0.5,
                          mt: 3.5,
                          justifyContent: "center",
                        }}
                      >
                        <SocialButton />

                        <FbButton />
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </form>
          </Dialog>
        </div>
      </GoogleOAuthProvider>
    </>
  );
}
