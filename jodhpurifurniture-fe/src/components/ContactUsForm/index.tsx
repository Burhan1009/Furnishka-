import { useFormik } from "formik";
import { MyContactUsFormchema } from "@/common/validations";
import { TextField, Typography } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import { useSelector } from "react-redux";
import { selectAuth } from "@/service/auth/globalstate";
import Grid from "@mui/material/Grid";
import { LoadingButton } from "@mui/lab";
import Link from "next/link";
import { useContactUsForm } from "@/service/contactus";
import { useEffect, useState } from "react";
import { phoneNum } from "@/common/validations/constants";

export default function ContactUsForm() {
  const [message1, setMessage1] = useState("");

  const initialValues = {
    email: "",
    enquiry: "",
    full_name: "",
    phone: "",
  };
  const { data: message, mutate: createContactUsForm } = useContactUsForm();

  const handleSubmit = (values) => {
    const newValues = {
      ...values,
    };
    const updateObj = {
      contactus: newValues,
    };

    createContactUsForm(updateObj);
  };
  useEffect(() => {
    if (message?.response == 1) {
      setMessage1(
        "Thank you for submiting your request. We will review it and get back to you shortly."
      );
    }

    resetForm();
  }, [message]);

  const {
    errors,
    touched,
    resetForm,
    getFieldProps,
    handleSubmit: myContactUsFormSubmit,
  } = useFormik<any>({
    validateOnMount: true,
    validationSchema: MyContactUsFormchema,
    initialValues: initialValues,
    onSubmit: handleSubmit,
  });

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
      <Grid
        className="displat-flex-contactus"
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <Grid
          className="m-r-c"
          sx={{
            maxHeight: 420,
            border: "1px solid #E5E5E5",
            padding: 2,
            mt: 3,
          }}
        >
          <Typography
            sx={{
              color: "#222222",
              fontSize: { xs: 17, md: 16, lg: 18 },
              textAlign: "left",
              fontWeight: "600",
              fontFamily: "Jost",
              mb: 2.2,
            }}
          >
            CONTACT US
          </Typography>
          <Typography
            sx={{
              color: "green",
              fontSize: { xs: 15, md: 15, lg: 16 },
              textAlign: "left",
              fontFamily: "Jost",
              mb: 2.2,
            }}
          >
            {message1}
          </Typography>
          <Grid sx={{ mb: 1, display: "flex" }}>
            <LocationOnIcon sx={{ color: "#f15a21", mr: 2 }} />
            <Typography
              sx={{
                fontSize: { xs: 15, md: 15, lg: 16 },
                color: "#222222",
                fontWeight: "500",
                fontFamily: "Jost",
              }}
            >
              ADDRESS
            </Typography>
          </Grid>
          <Grid
            sx={{
              width: 250,
              ml: 5,
              mb: 5,
              fontSize: { xs: 15, md: 15, lg: 16 },
            }}
          >
            <Link
              target={"_blank"}
              href="https://www.google.com/maps/place/Jodhpuri+Furniture+Sheesham+Wood+Store+-+Marthahalli/@12.9691615,77.6991139,17z/data=!4m8!1m2!2m1!1sJodhpuri+Furniture,+No.65,+LRDE+Layout,+Marathahalli,+Bengaluru,+Karnataka,+560037!3m4!1s0x3bae13fbdf9fee19:0x7dbed9d9edba1ed3!8m2!3d12.9691691!4d77.7012947?hl=en-US"
              style={{ fontFamily: "Jost" }}
              className="link-hover"
            >
              Jodhpuri Furniture, No.65, LRDE Layout, Marathahalli, Bengaluru,
              Karnataka, 560037{" "}
            </Link>
          </Grid>

          <Grid sx={{ mb: 1, display: "flex" }}>
            <CallIcon sx={{ color: "#f15a21", mr: 2 }} />
            <Typography
              sx={{
                fontSize: { xs: 15, md: 15, lg: 16 },
                color: "#222222",
                fontWeight: "500",
                fontFamily: "Jost",
              }}
            >
              PHONE NUMBER
            </Typography>
          </Grid>
          <Grid
            sx={{
              width: 250,
              ml: 5,
              mb: 5,
              fontSize: { xs: 15, md: 15, lg: 16 },
            }}
          >
            <a
              href={`tel:${phoneNum}`}
              style={{ fontFamily: "Jost" }}
              className="link-hover"
            >
              Call Us : {phoneNum}
            </a>
          </Grid>
          <Grid sx={{ mb: 1, display: "flex" }}>
            <EmailIcon sx={{ color: "#f15a21", mr: 2 }} />
            <Typography
              sx={{
                fontSize: { xs: 15, md: 15, lg: 16 },
                color: "#222222",
                fontWeight: "500",
                fontFamily: "Jost",
              }}
            >
              EMAIL ADDERSS
            </Typography>
          </Grid>
          <Grid
            sx={{
              width: 250,
              ml: 5,
              mb: 1,
              fontSize: { xs: 15, md: 15, lg: 16 },
            }}
          >
            <a
              href="mailto:info@jodhpurifurniture.com"
              style={{ fontFamily: "Jost" }}
              className="link-hover"
            >
              info@jodhpurifurniture.com
            </a>
          </Grid>
          <Grid>
            <a
              href="https://www.facebook.com/jodhpurifurniture/"
              target="_blank"
              className="link-hover"
              style={{ marginRight: 17 }}
            >
              <i className="fa-brands fa-square-facebook"></i>
            </a>
            <a
              href="https://www.instagram.com/jodhpuri.furniture/?hl=en"
              target="_blank"
              className="link-hover"
              style={{ marginRight: 17 }}
            >
              <i className="fa-brands fa-square-instagram"></i>
            </a>
            <a
              href="https://in.pinterest.com/riyajodhpurifurniture/"
              target="_blank"
              className="link-hover"
              style={{ marginRight: 17 }}
            >
              <i className="fa-brands fa-pinterest"></i>
            </a>
          </Grid>
        </Grid>

        <form onSubmit={myContactUsFormSubmit}>
          <Grid
            sx={{
              border: "1px solid #E5E5E5",
              flexWrap: "wrap",
              padding: 2,
              mt: 3,
              mb: 10,
            }}
          >
            <h1
              className="heading-other"
              style={{
                color: "#222222",

                textAlign: "left",
                fontWeight: "600",
                fontFamily: "Jost",
                marginBottom: 9,
              }}
            >
              LEAVE US A MESSAGE
            </h1>

            <label className="font-14 color-222222 jost fw-500">Name</label>
            <TextField
              sx={{ mt: 0.5, mb: 2, ...style }}
              size="small"
              fullWidth
              placeholder=" Name"
              {...getFieldProps("full_name")}
              helperText={touched.full_name && errors.full_name}
              error={Boolean(touched.full_name && errors.full_name)}
              margin="normal"
            ></TextField>
            <label className="font-14 color-222222 jost fw-500">Phone</label>
            <TextField
              sx={{ mt: 0.5, mb: 2, ...style }}
              size="small"
              fullWidth
              placeholder=" Phone"
              {...getFieldProps("phone")}
              helperText={touched.phone && errors.phone}
              error={Boolean(touched.phone && errors.phone)}
              margin="normal"
            ></TextField>
            <label className="font-14 color-222222 jost fw-500">Email</label>
            <TextField
              sx={{ mt: 0.5, mb: 2, ...style }}
              size="small"
              fullWidth
              placeholder=" Email"
              {...getFieldProps("email")}
              helperText={touched.email && errors.email}
              error={Boolean(touched.email && errors.email)}
              margin="normal"
            ></TextField>
            <label className="font-14 color-222222 jost fw-500">Enquiry</label>
            <TextField
              multiline
              rows={5}
              sx={{ mt: 0.5, mb: 2, ...style }}
              fullWidth
              placeholder="Enquiry"
              {...getFieldProps("enquiry")}
              helperText={touched.enquiry && errors.enquiry}
              error={Boolean(touched.enquiry && errors.enquiry)}
              margin="normal"
            ></TextField>

            <LoadingButton
              type="submit"
              style={{
                fontSize: 16,
                fontWeight: "500",
                fontFamily: "Jost",
              }}
              sx={{
                background: "#f15a21",
                color: "#fff",

                "&:hover": {
                  backgroundColor: "#f15a21",
                  color: "#fff",
                },
                mt: 3,
                width: { md: 180 },
              }}
              fullWidth
            >
              Submit
            </LoadingButton>
          </Grid>
        </form>
      </Grid>

      <div>
        <div className="map" style={{ marginBottom: 70 }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d124422.36133059407!2d77.6773413!3d12.9591278!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13fbdf9fee19%3A0x7dbed9d9edba1ed3!2sJodhpuri%20Furniture%20-%20Solid%20Sheesham%20Wood%20Furniture%20Store!5e0!3m2!1sen!2sin!4v1686377739369!5m2!1sen!2sin"
            width="100%"
            height="650"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </>
  );
}
