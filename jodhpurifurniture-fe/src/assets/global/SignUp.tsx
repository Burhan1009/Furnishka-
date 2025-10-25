import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Grid, TextField, InputAdornment } from "@mui/material";
import GoogleIcon from "@/public/static/media/googleicon.svg";
import { useFormik } from "formik";
import { authAction } from "@/service/auth/states";
import { useDispatch, useSelector } from "@/service/store";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import {
  selectAccessToken,
  selectAuthData,
  selectLoginLoading,
} from "@/service/auth/globalstate";
import Login from "./Login";
import { signUpFormSchema } from "@/common/validations";
import Links from "@/Link";

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
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
interface IPageHeaderRequiredProps {
  isSignUpDialogOpen?: boolean;

  handleSignUpClose?: any;
}
export default function SignUp({
  isSignUpDialogOpen,
  handleSignUpClose,
}: IPageHeaderRequiredProps) {
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = React.useState(false);
  const loginLoading = useSelector(selectLoginLoading);

  const initialValuesSign = {
    email: "",
    password: "",
    full_name: "",
    phone: "",
  };

  const handleSubmit = (values) => {
    const newValues = {
      ...values,
    };

    dispatch(authAction.signUpStart(newValues));
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
    initialValues: initialValuesSign,
    onSubmit: handleSubmit,
    validationSchema: signUpFormSchema,
  });

  const handleClose = () => {
    handleSignUpClose(false);
    // setIsSignUp(false);
    resetForm();
  };

  const [isOpen, setIsOpen] = React.useState(false);

  const handleIsSignup = () => {
    setIsOpen(!isOpen);
    handleSignUpClose(false);
  };
  const [passwordShown, setPasswordShown] = React.useState(false);

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
  return (
    <div>
      <Box>
        <Grid mt={3}>
          <TextField
            error={Boolean(formikTouched.full_name && formikErrors.full_name)}
            helperText={formikTouched.full_name && formikErrors.full_name}
            placeholder="Name"
            size="small"
            {...formikGetFieldProps("full_name")}
            fullWidth
          ></TextField>
          <TextField
            error={Boolean(formikTouched.phone && formikErrors.phone)}
            helperText={formikTouched.phone && formikErrors.phone}
            {...formikGetFieldProps("phone")}
            sx={{ mt: 1.5 }}
            size="small"
            placeholder="Mobile Number"
            fullWidth
          ></TextField>
          <TextField
            error={Boolean(formikTouched.email && formikErrors.email)}
            helperText={formikTouched.email && formikErrors.email}
            sx={{ mt: 1.5 }}
            size="small"
            {...formikGetFieldProps("email")}
            placeholder="Email ID"
            fullWidth
          ></TextField>
          <TextField
            error={Boolean(formikTouched.password && formikErrors.password)}
            helperText={formikTouched.password && formikErrors.password}
            sx={{ mt: 1.5 }}
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
            size="small"
            {...formikGetFieldProps("password")}
            placeholder="Password"
            fullWidth
          ></TextField>
          <LoadingButton
            onClick={formikHandleSubmit}
            loading={loginLoading}
            sx={{
              mt: 2.5,
              background: "#f15a21",
              borderRadius: "4px",
              height: 44,
              "&:hover": {
                backgroundColor: "transparent",
                color: "#f15a21",
                border: "1px solid #f15a21",
              },
            }}
            variant="contained"
            fullWidth
          >
            Sign Up
          </LoadingButton>
          <Typography
            fontFamily="Jost"
            fontWeight={400}
            fontSize={14}
            mt={1}
            color="#767676"
          >
            By signing up you agree to our{" "}
            <Links href="/terms-of-use">
              {" "}
              <Typography
                sx={{ cursor: "pointer" }}
                component="span"
                fontFamily="Jost"
                fontWeight={400}
                fontSize={14}
                color="#f15a21"
              >
                Terms and Conditions
              </Typography>
            </Links>{" "}
          </Typography>

          <Typography
            mt={3}
            fontFamily="Jost"
            fontWeight={500}
            fontSize={13}
            color="
                  #767676"
            align="center"
          >
            Or sign up with
          </Typography>
        </Grid>
      </Box>
    </div>
  );
}
