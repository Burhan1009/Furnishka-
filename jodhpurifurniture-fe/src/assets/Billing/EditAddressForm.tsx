import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useCreateAddAddress } from "@/service/Profile";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "@/service/auth/globalstate";
import { Button, TextField, Typography } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { orange } from "@mui/material/colors";
import { AddressFormSchema } from "@/common/validations";
import { useUpdateAddress } from "@/service/address";
import { LoadingButton } from "@mui/lab";
import Grid from "@mui/material/Grid";
import { useQueryClient } from "react-query";
import { cartActions } from "@/service/cart/states";
import { selectUserAddress } from "@/service/cart";

interface FormProp {
  formShow?: boolean;
  data?: any;
  addForm?: boolean;
  closeForm?: any;
  addFormClose?: any;
}
export default function EditAddressform({
  data,
  addFormClose,
  formShow,
  addForm,
  closeForm,
}: FormProp) {
  const queryClient = useQueryClient();
  const auth = useSelector(selectAuth);
  const authData = auth?.length > 0 ? auth[0] : "";
  const [pinError, setPinError] = React.useState("");
  const addresses = useSelector(selectUserAddress);

  const initialValues = {
    user_id: addresses[0]?.user_id,
    full_name: "",
    post_code: "",
    phone: "",
    default_status: "",
    house_number: "",
    street: "",
    street_address: "",
    city: "",
  };
  const { mutate: updateAddress, isLoading, isSuccess } = useUpdateAddress();
  const {
    mutate: createAddress,
    isLoading: createLoading,
    isSuccess: createSuccess,
  } = useCreateAddAddress();

  const handleSubmit = (values) => {
    const newValues = { ...values };

    setPinError("");
    if (formShow && data) {
      const updateObj = {
        addressId: data?.address_id,
        updateValues: newValues,
      };
      updateAddress(updateObj);
      setPinError("");
    } else {
      createAddress(newValues);
      setPinError("");
    }
  };

  const {
    handleSubmit: addressHandleSubmit,
    touched,
    errors,
    values,
    setValues,
    getFieldProps,
    setFieldValue,
    resetForm,
  } = useFormik<any>({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: AddressFormSchema,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess || createSuccess) {
      queryClient.invalidateQueries("address-details");
      dispatch(cartActions.getUserAddress(addresses[0]?.user_id));
    }
  }, [isSuccess, createSuccess]);

  const handleBillingCheck = (id: number, action: "add" | "remove") => {
    if (action == "add") {
      setFieldValue("default_status", id);
      return;
    }
    if (action == "remove") {
      setFieldValue("default_status", 0);
    }
  };

  useEffect(() => {
    if (addForm) {
      resetForm();
    }
  }, [addForm]);

  useEffect(() => {
    if (formShow && data) {
      for (let key in initialValues) {
        if (key in data) {
          initialValues[key] = data[key] ?? "";
        }
      }

      setValues(initialValues);
    }
  }, [data, formShow]);

  const handleClose = () => {
    closeForm(false);
    addFormClose(false);
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
    <>
      {formShow || addForm ? (
        <div
          className="form-border"
          style={{
            marginTop: 18,
            overflow: "hidden",
          }}
        >
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
                    error={Boolean(
                      touched.street_address && errors.street_address
                    )}
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
                  <label className="font-14 color-222222 jost fw-500">
                    House No
                  </label>
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
                  <label className="font-14 color-222222 jost fw-500">
                    City
                  </label>
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
                  sx={{ mt: 2 }}
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
                  label="Billing address is same as the Shipping addres"
                />
              </FormGroup>
              <Grid>
                <LoadingButton
                  className="button-text12"
                  type="submit"
                  loading={formShow ? isLoading : createLoading}
                  style={{
                    fontWeight: "500",
                    fontFamily: "Jost",
                  }}
                  sx={{
                    background: "#f15a21",
                    color: "#fff",
                    fontSize: { xs: 14, sm: 15, md: 15, lg: 16 },
                    "&:hover": {
                      background: "#f15a21",
                      color: "#fff",
                    },
                    mt: 3,
                    mr: 3,
                    width: { sm: 180 },
                    height: { xs: "35px", sm: "40px", md: "45px", lg: "50px" },
                  }}
                  fullWidth
                >
                  Save
                </LoadingButton>
                <Button
                  className="button-text12"
                  onClick={handleClose}
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
                    width: { sm: 180 },
                    height: { xs: "35px", sm: "40px", md: "45px", lg: "50px" },
                  }}
                  fullWidth
                >
                  Cancel
                </Button>
              </Grid>
            </div>
          </form>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
