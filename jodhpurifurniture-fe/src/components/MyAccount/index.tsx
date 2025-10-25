import { useEffect } from "react";
import { useFormik } from "formik";

import { TextField, Typography } from "@mui/material";

import { MyAccountFormchema } from "@/common/validations";

import { useUpdateProfile } from "@/service/account";
import { LoadingButton } from "@mui/lab";
import Password from "../Password";
import { toast } from "react-toastify";
import { selectAuth, selectUserDetail } from "@/service/auth/globalstate";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "@/service/auth/states";
import { Grid } from "@mui/material";

export default function MyAccount() {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const authData = auth?.length > 0 ? auth[0] : "";

  const userDetail = useSelector(selectUserDetail);

  const initialValues = {
    full_name: "",

    email: "",
    phone: "",
  };

  const {
    mutate: updateprofile,
    isLoading: updateProfileLoading,
    isSuccess: updateProfileSuccess,
    data: message,
  } = useUpdateProfile();

  const handleSubmit = (values) => {
    const newValues = {
      ...values,
    };
    const updateObj = {
      userId: authData?.user_id,
      profile: newValues,
    };

    updateprofile(updateObj);
  };
  const {
    errors,
    touched,
    getFieldProps,
    setFieldValue,

    handleSubmit: myAccountFormSubmit,
  } = useFormik<any>({
    validateOnMount: true,
    validationSchema: MyAccountFormchema,
    initialValues: initialValues,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (updateProfileSuccess && message?.response == 1) {
      dispatch(authAction.getUserDetail(authData?.user_id));
      toast.success(message?.message);
    }
  }, [updateProfileSuccess, message]);

  useEffect(() => {
    if (userDetail) {
      setFieldValue("full_name", userDetail.full_name);
      setFieldValue("email", userDetail.email);
      setFieldValue("phone", userDetail.phone);
    }
  }, [userDetail]);
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
    <div>
      <Grid
        sx={{
          border: "1px solid #E5E5E5",
          padding: 2,
        }}
      >
        <form onSubmit={myAccountFormSubmit}>
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
            Personal information
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <label className="font-14 color-222222 jost fw-500">
                Full Name
              </label>
              <TextField
                sx={{ mt: 0.5, ...style }}
                fullWidth
                size="small"
                placeholder="Name"
                {...getFieldProps("full_name")}
                margin="normal"
                helperText={touched.full_name && errors.full_name}
                error={Boolean(touched.full_name && errors.full_name)}
              ></TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <label className="font-14 color-222222 jost fw-500">
                Email-Id
              </label>
              <TextField
                sx={{ mt: 0.5, ...style }}
                disabled
                fullWidth
                size="small"
                placeholder=" Email-Id"
                margin="normal"
                {...getFieldProps("email")}
                helperText={touched.email && errors.email}
                error={Boolean(touched.email && errors.email)}
              ></TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <label className="font-14 color-222222 jost fw-500">
                Mobile No
              </label>
              <TextField
                sx={{ mt: 0.5, ...style }}
                fullWidth
                size="small"
                placeholder="Mobile No"
                margin="normal"
                {...getFieldProps("phone")}
                helperText={touched.phone && errors.phone}
                error={Boolean(touched.phone && errors.phone)}
              ></TextField>
            </Grid>
          </Grid>

          <Typography
            sx={{
              flexWrap: "wrap",
              alignSelf: "center",
            }}
          >
            <LoadingButton
              loading={updateProfileLoading}
              type="submit"
              style={{
                fontWeight: "500",
                fontFamily: "Jost",
              }}
              sx={{
                fontSize: { xs: 14, sm: 15, md: 15, lg: 16 },
                background: "#f15a21",
                color: "#fff",

                "&:hover": {
                  background: "#f15a21",
                  color: "#fff",
                },
                mt: 3,
                width: { md: 180 },
              }}
              fullWidth
            >
              SAVE CHANGES
            </LoadingButton>
          </Typography>
        </form>
      </Grid>
      <Password />
    </div>
  );
}
