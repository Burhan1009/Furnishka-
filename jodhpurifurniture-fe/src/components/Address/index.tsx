import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useCreateAddAddress } from "@/service/Profile";
import { useSelector } from "react-redux";
import { selectAuth } from "@/service/auth/globalstate";
import { Button, Box, TextField, Typography, Grid } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { orange } from "@mui/material/colors";
import { AddressFormSchema } from "@/common/validations";
import { useRouter } from "next/router";
import { useGetSingleAddress, useUpdateAddress } from "@/service/address";
import { LoadingButton } from "@mui/lab";

interface IPageHeaderRequiredProps {
  forUpdate?: boolean;
}

export default function Address({ forUpdate }: IPageHeaderRequiredProps) {
  const auth = useSelector(selectAuth);
  const authData = auth?.length > 0 ? auth[0] : "";
  const router = useRouter();
  const { id } = router.query;
  const [pinError, setPinError] = React.useState("");

  const initialValues = {
    user_id: authData.user_id,
    full_name: "",
    post_code: "",
    phone: "",
    default_status: "",
    house_number: "",
    street: "",
    street_address: "",
    city: "",
  };

  const { mutate: createAddress, isLoading, isSuccess } = useCreateAddAddress();
  const {
    mutate: updateAddress,
    isLoading: updateAddressLoading,
    isSuccess: updateSuccess,
  } = useUpdateAddress();
  if (forUpdate) {
    var { data: getSingleAddressData } = useGetSingleAddress({
      addressId: id,
      userId: authData.user_id,
    });

    var singleAddress = getSingleAddressData?.data ?? {};
  }

  const handleSubmit = (values) => {
    const newValues = { ...values };

    setPinError("");
    if (forUpdate) {
      const updateObj = {
        addressId: singleAddress?.address_id,
        updateValues: newValues,
      };
      updateAddress(updateObj);
    } else {
      createAddress(newValues);
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
  } = useFormik<any>({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: AddressFormSchema,
  });

  useEffect(() => {
    if (isSuccess || updateSuccess) {
      router.replace("/my-account/address/address-book");
    }
  }, [isSuccess, updateSuccess]);

  useEffect(() => {
    if (singleAddress?.address_id && forUpdate) {
      for (let key in initialValues) {
        if (key in singleAddress) {
          initialValues[key] = singleAddress[key] ?? "";
        }
      }

      setValues(initialValues);
    }
  }, [singleAddress, forUpdate]);

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
        borderColor: "#ddd",
        borderWidth: 1,
      },
      background: "white",
    },
  };
  return (
    <form onSubmit={addressHandleSubmit}>
      <Box
        sx={{
          maxWidth: 923,
          maxheight: 456,
          border: "1px solid #E5E5E5",
          m: 1,
          mt: 3,
          p: 3,
        }}
      >
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
            label="Billing address is same as the Shipping address"
          />
        </FormGroup>
        <Grid>
          <LoadingButton
            loading={forUpdate ? updateAddressLoading : isLoading}
            type="submit"
            style={{
              fontFamily: "Jost",
              fontWeight: "500",
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
              mr: 3,
              width: { md: 180 },
              height: 50,
            }}
            fullWidth
          >
            Save
          </LoadingButton>
          <Button
            onClick={() => router.push("/my-account/address/address-book")}
            style={{
              fontFamily: "Jost",
              fontWeight: "500",
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
      </Box>
    </form>
  );
}
