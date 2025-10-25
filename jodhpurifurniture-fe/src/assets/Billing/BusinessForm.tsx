import { useFormik } from "formik";
import { useCreateAddAddress } from "@/service/Profile";
import { useSelector } from "react-redux";
import { selectAuth } from "@/service/auth/globalstate";
import { TextField } from "@mui/material";
import { BussinessFormSchema } from "@/common/validations";
import { LoadingButton } from "@mui/lab";
import Grid from "@mui/material/Grid";

export default function BusinessForm() {
  const auth = useSelector(selectAuth);
  const authData = auth?.length > 0 ? auth[0] : "";

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

  const { mutate: createAddress } = useCreateAddAddress();

  const handleSubmit = (values) => {
    const newValues = { ...values };

    createAddress(newValues);
  };

  const {
    handleSubmit: addressHandleSubmit,
    touched,
    errors,
    getFieldProps,
  } = useFormik<any>({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: BussinessFormSchema,
  });

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
              GST Number
            </label>
            <TextField
              sx={{ mt: 0.5, ...style }}
              fullWidth
              size="small"
              placeholder="GST No."
              {...getFieldProps("gst")}
              helperText={touched.gst && errors.gst}
              error={Boolean(touched.gst && errors.gst)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <label className="font-14 color-222222 jost fw-500">
              Company Name
            </label>
            <TextField
              sx={{ mt: 0.5, ...style }}
              fullWidth
              size="small"
              placeholder="Company name"
              {...getFieldProps("company_name")}
              helperText={touched.company_name && errors.company_name}
              error={Boolean(touched.company_name && errors.phone)}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <label className="font-14 color-222222 jost fw-500">Address</label>
            <TextField
              sx={{ mt: 0.5, ...style }}
              multiline={true}
              rows={3.5}
              fullWidth
              size="small"
              placeholder="Address"
              {...getFieldProps("address")}
              helperText={touched.address && errors.address}
              error={Boolean(touched.address && errors.street_address)}
            />
          </Grid>
        </Grid>

        <Grid>
          <LoadingButton
            type="submit"
            style={{
              fontWeight: "500",
              fontFamily: "Jost",
              boxShadow: "none",
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
              width: { sm: 180 },
              height: { xs: "35px", sm: "40px", md: "45px", lg: "50px" },
            }}
            fullWidth
          >
            SUBMIT
          </LoadingButton>
        </Grid>
      </div>
    </form>
  );
}
