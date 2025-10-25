import { useFormik } from "formik";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { MySupportFormchema } from "@/common/validations";
import { TextField, Typography } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Grid from "@mui/material/Grid";
import { LoadingButton } from "@mui/lab";
import { useSupportForm } from "@/service/support";
import Link from "next/link";
import { phoneNum } from "@/common/validations/constants";

export default function SupportForm() {
  const initialValues = {
    form_type: 1,
    grievance_img: "",
    order_id: "",
    message: "",
  };

  const { data: message, mutate: createSupportForm } = useSupportForm();

  const handleSubmit = (values) => {
    const newValues = {
      ...values,
    };
    const formData = new FormData();
    Object.keys(newValues).map((key) => {
      if (key === "grievance_img") {
        let FileList: any = newValues[key];
        if (FileList && FileList?.length > 0) {
          formData.append(key, FileList[0]);
        }
      } else {
        formData.append(key, newValues[key]);
      }
    });
    createSupportForm(formData);
  };

  const {
    errors,
    touched,
    getFieldProps,
    setFieldValue,
    handleSubmit: mySupportFormSubmit,
  } = useFormik<any>({
    validateOnMount: true,
    validationSchema: MySupportFormchema,
    initialValues: initialValues,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (message?.response == 2) {
      toast.error(message?.message);
    } else if (message?.response == 1) {
      toast.success(message?.message);
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
    <>
      <form onSubmit={mySupportFormSubmit}>
        <Grid
          sx={{
            border: "1px solid #E5E5E5",
            padding: 2,
            mt: 3,
          }}
        >
          <label className="font-14 color-222222 jost fw-500">Order Id*</label>
          <TextField
            sx={{ mt: 0.5, mb: 2, ...style }}
            size="small"
            fullWidth
            placeholder=" Order Id"
            {...getFieldProps("order_id")}
            helperText={touched.order_id && errors.order_id}
            error={Boolean(touched.order_id && errors.order_id)}
            margin="normal"
          ></TextField>

          <label className="font-14 color-222222 jost fw-500">Message*</label>
          <TextField
            multiline
            rows={5}
            sx={{ mt: 0.5, mb: 2, ...style }}
            fullWidth
            placeholder=" 
              Message"
            {...getFieldProps("message")}
            helperText={touched.message && errors.message}
            error={Boolean(touched.message && errors.message)}
            margin="normal"
          ></TextField>
          <label className="font-14 color-222222 jost fw-500">
            File Upload
          </label>
          <TextField
            type="file"
            onChange={(event) => {
              setFieldValue("grievance_img", event.currentTarget.files);
            }}
            sx={{ mt: 0.5, ...style }}
            fullWidth
            placeholder="Image"
            margin="normal"
          />

          <LoadingButton
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
                backgroundColor: "#f15a21",
                color: "#fff",
              },
              mt: 3,
            }}
            fullWidth
          >
            Submit Unresolved complaint
          </LoadingButton>
          <Grid
            sx={{
              border: "1px solid #E5E5E5",
              padding: 2,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderBottomWidth: 0,
              mt: 3,
            }}
          ></Grid>
          <Grid
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
                md: "column",
                lg: "row",
              },
              justifyContent: {
                sm: "space-evenly",
                md: "none",
                lg: "space-evenly",
              },
              flexWrap: "wrap",
            }}
          >
            <Grid sx={{ mb: 3 }}>
              <Typography
                sx={{
                  ml: 2,
                  mb: 1,
                  fontFamily: "Jost",
                  fontSize: 18,
                  fontWeight: "600",
                }}
              >
                Customer Services
              </Typography>
              <Grid sx={{ mb: 1 }}>
                <ArrowRightIcon sx={{ color: "#f15a21", ml: 1 }} />{" "}
                <Link
                  className="link-hover23"
                  href="/terms-of-use"
                  style={{ fontFamily: "Jost" }}
                >
                  Terms Of Use
                </Link>
              </Grid>
              <Grid sx={{ mb: 1 }}>
                <ArrowRightIcon sx={{ color: "#f15a21", ml: 1 }} />{" "}
                <Link
                  className="link-hover23"
                  href="/security-privacy"
                  style={{ fontFamily: "Jost" }}
                >
                  Security & Privacy
                </Link>
              </Grid>
              <Grid sx={{ mb: 1 }}>
                <ArrowRightIcon sx={{ color: "#f15a21", ml: 1 }} />{" "}
                <Link
                  className="link-hover23"
                  href="/return-refund"
                  style={{ fontFamily: "Jost" }}
                >
                  Return & Refund
                </Link>
              </Grid>
              <Grid sx={{ mb: 1 }}>
                <ArrowRightIcon sx={{ color: "#f15a21", ml: 1 }} />{" "}
                <Link
                  className="link-hover23"
                  href="/payment-policy"
                  style={{ fontFamily: "Jost" }}
                >
                  Payment Policy
                </Link>
              </Grid>
              <Grid sx={{ mb: 1 }}>
                <ArrowRightIcon sx={{ color: "#f15a21", ml: 1 }} />{" "}
                <Link
                  className="link-hover23"
                  href="/track-order"
                  style={{ fontFamily: "Jost" }}
                >
                  Track Order
                </Link>
              </Grid>
            </Grid>
            <Grid
              sx={{
                border: "1px solid #E5E5E5",
                padding: 3,
                display: { xs: "none", sm: "flex", md: "none", lg: "flex" },
                borderLeftWidth: 1,
                borderRightWidth: 0,
                borderBottomWidth: 0,
                borderTop: 0,
                mt: -1,
              }}
            ></Grid>
            <Grid sx={{ ml: { xs: 1.5, sm: 0 }, mb: 2 }}>
              <Typography
                sx={{
                  mb: { xs: 1, lg: 3.5 },
                  fontFamily: "Jost",
                  fontSize: 18,
                  fontWeight: "600",
                  textAlign: "left",
                }}
              >
                Can’t find what you are looking for ?
              </Typography>
              <CallIcon sx={{ color: "#f15a21", ml: 0.5, mr: 1.5 }} />
              <a
                className="link-hover23"
                href={`tel:${phoneNum}`}
                style={{ fontFamily: "Jost" }}
              >
                {" "}
                Call Us : {phoneNum}
              </a>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
