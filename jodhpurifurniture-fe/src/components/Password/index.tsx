import { useFormik } from "formik";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { MyPasswordFormchema } from "@/common/validations";
import { TextField } from "@mui/material";
import { useUpdatePassword } from "@/service/account";
import { useSelector } from "react-redux";
import { selectAuth } from "@/service/auth/globalstate";
import Grid from "@mui/material/Grid";
import { LoadingButton } from "@mui/lab";

interface IPageHeaderRequiredProps {
  forUpdate?: boolean;
}

export default function Password({ forUpdate }: IPageHeaderRequiredProps) {
  const auth = useSelector(selectAuth);
  const authData = auth?.length > 0 ? auth[0] : "";

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const {
    mutate: updatepassword,
    isLoading: updatePasswordLoading,
    data: message,
  } = useUpdatePassword();

  const handleSubmit = (values) => {
    const newValues = {
      ...values,
    };
    if (newValues.password == newValues.confirmPassword) {
      const updateObj = {
        password: newValues.password,
        userId: authData.user_id,
      };
      updatepassword(updateObj);
    }
  };

  const {
    errors,
    touched,
    getFieldProps,
    resetForm,
    handleSubmit: myPasswordSubmit,
  } = useFormik<any>({
    validateOnMount: true,
    validationSchema: MyPasswordFormchema,
    initialValues: initialValues,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (message?.response == 1) {
      toast.success(message?.message);
      resetForm();
    }
  }, [message]);

  const style = {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#ddd",
        borderWidth: 1,
      },
      background: "white",
    },
  };
  return (
    <form onSubmit={myPasswordSubmit}>
      <Grid
        sx={{
          border: "1px solid #E5E5E5",
          padding: 2,
          mt: 3,
        }}
      >
        <Grid
          className="jost"
          sx={{
            color: "#222222",
            fontSize: { xs: 18, sm: 18, md: 19, lg: 20 },
            textAlign: { xs: "center", md: "left" },
            fontWeight: "500",
            flexWrap: "wrap",
            fontFamily: "Jost",
            mb: 2.2,
          }}
        >
          Change your password
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <label className="font-14 color-222222 jost fw-500">
              New Password
            </label>
            <TextField
              sx={{ mt: 0.5, ...style }}
              size="small"
              fullWidth
              type="password"
              placeholder="New Password"
              {...getFieldProps("password")}
              helperText={touched.password && errors.password}
              error={Boolean(touched.password && errors.password)}
              margin="normal"
            ></TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <label className="font-14 color-222222 jost fw-500">
              Confirm Password
            </label>
            <TextField
              sx={{ mt: 0.5, ...style }}
              fullWidth
              size="small"
              placeholder=" Confirm Password"
              type="password"
              {...getFieldProps("confirmPassword")}
              helperText={touched.confirmPassword && errors.confirmPassword}
              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              margin="normal"
            ></TextField>
          </Grid>
        </Grid>
        <Grid xs={11.2}>
          <LoadingButton
            loading={updatePasswordLoading}
            type="submit"
            style={{
              fontWeight: "500",
              fontFamily: "Jost",
            }}
            sx={{
              fontSize: { xs: 14, sm: 15, md: 15, lg: 16 },
              background: "#E5E5E5",
              color: "#767676",

              "&:hover": {
                background: "#E5E5E5",
                color: "#767676",
              },
              mt: 3,
              width: { md: 200 },
            }}
            fullWidth
          >
            Update Password
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
}
