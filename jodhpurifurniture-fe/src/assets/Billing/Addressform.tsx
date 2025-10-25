import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useCreateAddAddress } from "@/service/Profile";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken, selectAuth } from "@/service/auth/globalstate";
import { Button, TextField, Typography } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { orange } from "@mui/material/colors";
import { useRouter } from "next/router";
import { LoadingButton } from "@mui/lab";
import Grid from "@mui/material/Grid";
import { useQueryClient } from "react-query";
import { cartActions } from "@/service/cart/states";
import { selectUserAddress } from "@/service/cart";
import { addToCart } from "@/service/cart/cart";
import { RootState } from "@/service/store";
import { clearCart } from "@/service/cart/cart";

export default function AddressForm() {
  const queryClient = useQueryClient();
  const auth = useSelector(selectAuth);
  const authData = auth?.length > 0 ? auth[0] : "";
  const addresses = useSelector(selectUserAddress);
  const token = useSelector(selectAccessToken);
  const { cartItems } = useSelector((state: RootState) => state.carts);
  const phoneRegExp =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  const initialValues = {
    user_id: authData.user_id ? authData.user_id : "",
    full_name: "",
    post_code: "",
    phone: "",
    default_status: "",
    house_number: "",
    street: "",
    street_address: "",
    city: "",
  };
  const [pinError, setPinError] = React.useState("");

  const addressSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(phoneRegExp, "not valid format")
      .max(14)
      .min(10)
      .required("Phone number field is required"),
    full_name: Yup.string()
      .required("Name field is required")
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        "Name can only contain Latin letters."
      ),

    post_code: Yup.string().required("Postal code field is required"),
    house_number: Yup.string().required("House no. field is required"),
    street: Yup.string().required("Society name field is required"),
    street_address: Yup.string().required("Street address field is required"),
    city: Yup.string()
      .required("City field is required")
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        "City can only contain Latin letters."
      ),
  });

  const {
    mutate: createAddress,
    isLoading,
    isSuccess,
    data,
  } = useCreateAddAddress();

  console.log({ data });
  const handleSubmit = (values) => {
    const newValues = { ...values };

    setPinError("");
    createAddress(newValues);
  };
  const guestAuthUser = authData?.user_id
    ? authData?.user_id
    : data?.data?.user_id;
  console.log({ guestAuthUser });
  const {
    handleSubmit: addressHandleSubmit,
    touched,
    errors,
    values,
    getFieldProps,
    setFieldValue,
    resetForm,
  } = useFormik<any>({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: addressSchema,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      resetForm();
      queryClient.invalidateQueries("address-details");
      dispatch(cartActions.getUserAddress(guestAuthUser));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!token && cartItems.length > 0 && guestAuthUser) {
      cartItems.map((item) => {
        const val = {
          product_id: item.product_id ?? "",
          qty: item.qty ?? "",
          user_id: guestAuthUser ?? "",
        };
        dispatch(cartActions.addCart(val));
      });

      dispatch(clearCart());
    }
  }, [cartItems, isSuccess]);

  const handleBillingCheck = (id: number, action: "add" | "remove") => {
    if (action == "add") {
      setFieldValue("default_status", id);
      return;
    }
    if (action == "remove") {
      setFieldValue("default_status", 0);
    }
  };
  const style = {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#DDDDDD",
        borderWidth: 1,
      },
      background: "white",
    },
  };
  return (
    <form onSubmit={addressHandleSubmit}>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <label className="font-14 color-222222 jost fw-500">
              Full Name
            </label>
            <TextField
              sx={{ mt: 0.5, ...style }}
              fullWidth
              size="small"
              placeholder="Full Name"
              {...getFieldProps("full_name")}
              helperText={touched.full_name && errors.full_name}
              error={Boolean(touched.full_name && errors.full_name)}
            />
          </Grid>
          {!authData?.user_id && (
            <Grid item xs={12} md={6}>
              <label className="font-14 color-222222 jost fw-500">
                Email Address
              </label>
              <TextField
                sx={{ mt: 0.5, ...style }}
                fullWidth
                size="small"
                placeholder="Email Address"
                {...getFieldProps("email")}
                helperText={touched.email && errors.email}
                error={Boolean(touched.email && errors.email)}
              />
            </Grid>
          )}

          <Grid item xs={12} md={6}>
            <label className="font-14 color-222222 jost fw-500">
              Mobile No
            </label>
            <TextField
              sx={{ mt: 0.5, ...style }}
              fullWidth
              size="small"
              placeholder="Mobile No"
              {...getFieldProps("phone")}
              helperText={touched.phone && errors.phone}
              error={Boolean(touched.phone && errors.phone)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label className="font-14 color-222222 jost fw-500">
              Street Address
            </label>
            <TextField
              sx={{ mt: 0.5, ...style }}
              fullWidth
              size="small"
              placeholder="Street Address"
              {...getFieldProps("street_address")}
              helperText={touched.street_address && errors.street_address}
              error={Boolean(touched.street_address && errors.street_address)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label className="font-14 color-222222 jost fw-500">
              Postal Code
            </label>
            <TextField
              sx={{ mt: 0.5, ...style }}
              fullWidth
              size="small"
              placeholder=" Postal Code"
              {...getFieldProps("post_code")}
              helperText={touched.post_code && errors.post_code}
              error={Boolean(touched.post_code && errors.post_code)}
            />

            <Typography
              sx={{
                width: { xs: "auto", md: 300 },
                fontSize: 12,
                fontFamily: "Jost",
                fontWeight: 400,
                color: "red",
                mt: 0.8,
              }}
            >
              {pinError}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <label className="font-14 color-222222 jost fw-500">House No</label>
            <TextField
              sx={{ mt: 0.5, ...style }}
              fullWidth
              size="small"
              placeholder="House No"
              {...getFieldProps("house_number")}
              helperText={touched.house_number && errors.house_number}
              error={Boolean(touched.house_number && errors.house_number)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label className="font-14 color-222222 jost fw-500">
              Society Name
            </label>
            <TextField
              sx={{ mt: 0.5, ...style }}
              fullWidth
              size="small"
              placeholder=" Society Name"
              {...getFieldProps("street")}
              helperText={touched.street && errors.street}
              error={Boolean(touched.street && errors.street)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label className="font-14 color-222222 jost fw-500">City</label>
            <TextField
              sx={{ mt: 0.5, ...style }}
              fullWidth
              size="small"
              placeholder="City"
              {...getFieldProps("city")}
              helperText={touched.city && errors.city}
              error={Boolean(touched.city && errors.city)}
            />
          </Grid>
        </Grid>
        <FormGroup>
          <FormControlLabel
            sx={{ mt: 2, fontFamily: "Jost", fontSize: 12 }}
            control={
              <Checkbox
                onChange={() =>
                  handleBillingCheck(
                    1,
                    values.default_status != 1 ? "add" : "remove"
                  )
                }
                checked={values.default_status == 1 ? true : false}
                size="small"
                sx={{
                  color: "default",
                  "&.Mui-checked": {
                    color: "#f15a21",
                  },
                }}
              />
            }
            label="Billing address is same as the Shipping address"
          />
        </FormGroup>
        <Grid>
          <LoadingButton
            type="submit"
            loading={isLoading}
            // disabled={!authData?.user_id}
            style={{
              fontWeight: "500",
              fontFamily: "Jost",
            }}
            sx={{
              background: "#f15a21",
              color: "#fff",
              fontSize: { xs: 14, sm: 15, md: 15, lg: 16 },
              "&:hover": {
                background: " #f15a21",
                color: "#fff",
              },
              mt: 3,
              mr: 3,
              width: { md: 180 },
              height: 50,
            }}
            fullWidth
          >
            Save
          </LoadingButton>
          <Button
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
              width: { md: 180 },
              height: 50,
            }}
            fullWidth
          >
            Cancel
          </Button>
        </Grid>
      </div>
    </form>
  );
}
