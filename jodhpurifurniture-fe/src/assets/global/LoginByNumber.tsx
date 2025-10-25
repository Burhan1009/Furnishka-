import { Children, memo, useEffect, useState } from "react";
import {
  loginByNumberFormSchema,
  loginByNumberOTPSchema,
} from "@/common/validations";
import { LoadingButton } from "@mui/lab";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useSendOTP } from "@/service/order";
import { Grid } from "@mui/material";
import { authAction } from "@/service/auth/states";
import { useDispatch, useSelector } from "@/service/store";
import { selectLoginLoading } from "@/service/auth/globalstate";

const LoginByNumber = () => {
  const {
    mutate: sendOTP,
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useSendOTP();

  const loginLoading = useSelector(selectLoginLoading);
  const dispatch = useDispatch();

  const style = {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#DDDDDD",
      },
      background: "white",
    },
  };
  const [isNumber, setIsNumber] = useState("");
  const initialValues = {
    phone: "",
  };
  const handleSubmit = (values) => {
    const newValues = {
      ...values,
    };
    setIsNumber(values?.phone);

    sendOTP(newValues);
  };
  const {
    handleSubmit: formikHandleSubmit,
    touched,
    errors,
    values,
    getFieldProps: formikGetFieldProps,
  } = useFormik<any>({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: loginByNumberFormSchema,
  });

  const initialValues1 = {
    otp: "",
    phone: isNumber,
  };

  const handleSubmit1 = (values) => {
    const newValues = {
      ...values,
    };
    newValues.phone = isNumber;

    dispatch(authAction.loginStart(newValues));
  };

  const {
    handleSubmit: formikHandlePhoneSubmit,
    touched: formikTouched,
    errors: formikErrors,
    getFieldProps,
  } = useFormik<any>({
    initialValues: initialValues1,
    onSubmit: handleSubmit1,
    validationSchema: loginByNumberOTPSchema,
  });

  const [showOTP, setShowOTP] = useState(false);

  useEffect(() => {
    if (isSuccess && data?.message == "Success") {
      setShowOTP(true);
    } else if (data?.message == "User not exist") {
      setShowOTP(false);
    }
  }, [isSuccess]);

  return (
    <>
      {!showOTP ? (
        <>
          <Grid item xs={12} md={6}>
            <label className="font-14 color-222222 jost fw-500">
              Mobile No
            </label>
            <TextField
              sx={{ mt: 0.5, ...style }}
              fullWidth
              size="small"
              placeholder="Mobile No"
              {...formikGetFieldProps("phone")}
              helperText={touched.phone && errors.phone}
              error={Boolean(touched.phone && errors.phone)}
            />
          </Grid>
          <LoadingButton
            onClick={formikHandleSubmit}
            type="submit"
            loading={isLoading}
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
            Send OTP
          </LoadingButton>
        </>
      ) : (
        <>
          <Grid item xs={12} md={3}>
            <label className="font-14 color-222222 jost fw-500">OTP</label>
            <TextField
              sx={{ mt: 0.5, ...style }}
              fullWidth
              size="small"
              placeholder="OTP"
              //   autoComplete="one-time-code"
              {...getFieldProps(`otp`)}
              helperText={formikTouched.otp && formikErrors.otp}
              error={Boolean(formikTouched.otp && formikErrors.otp)}
            />
          </Grid>
          <LoadingButton
            onClick={formikHandlePhoneSubmit}
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
            Submit
          </LoadingButton>
        </>
      )}
    </>
  );
};
export default memo(LoginByNumber);
