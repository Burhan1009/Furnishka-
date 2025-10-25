import { useFormik } from "formik";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { CustomFurnitureFormchema } from "@/common/validations";
import { TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { LoadingButton } from "@mui/lab";
import { useCustomFurniture } from "@/service/customfurniture";

export default function CustomFurnitureForm() {
  const initialValues = {
    requirement_img: "",
    full_name: "",
    email: "",
    pincode: "",
    phone: "",
    city: "",
    descriptions: "",
    source_code: 2,
  };

  const { data: message, mutate: CustomFurniture } = useCustomFurniture();

  const handleSubmit = (values) => {
    const newValues = {
      ...values,
    };
    const formData = new FormData();
    Object.keys(newValues).map((key) => {
      if (key === "requirement_img") {
        let FileList: any = newValues[key];
        if (FileList && FileList?.length > 0) {
          formData.append(key, FileList[0]);
        }
      } else {
        formData.append(key, newValues[key]);
      }
    });
    CustomFurniture(formData);
  };

  const {
    errors,
    touched,
    getFieldProps,
    setFieldValue,
    handleSubmit: mySupportFormSubmit,
  } = useFormik<any>({
    validateOnMount: true,
    validationSchema: CustomFurnitureFormchema,
    initialValues: initialValues,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (message?.response == 1) {
      toast.success(message?.message);
    }
  }, [message]);

  return (
    <>
      <form onSubmit={mySupportFormSubmit}>
        <Grid sx={{ display: "flex" }}>
          <img
            src={"/static/images/Custom-Requirements.jpg"}
            className="responsive-image  mx-auto d-none d-md-block"
          ></img>

          <Grid sx={{ ml: { xs: 0, md: 2 } }}>
            <Typography
              sx={{
                textAlign: "center",
                fontSize: 16,
                fontFamily: "Jost",
                fontWeight: "500",
              }}
            >
              CUSTOM REQUIREMENTS
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                color: "#666",
                fontFamily: "Jost",
                fontWeight: "500",
              }}
            >
              We custom - Build your dream furniture
            </Typography>

            <TextField
              size="small"
              fullWidth
              placeholder=" Full Name"
              {...getFieldProps("full_name")}
              helperText={touched.full_name && errors.full_name}
              error={Boolean(touched.full_name && errors.full_name)}
              margin="normal"
            ></TextField>

            <TextField
              size="small"
              fullWidth
              placeholder="Email"
              {...getFieldProps("email")}
              helperText={touched.email && errors.email}
              error={Boolean(touched.email && errors.email)}
              margin="normal"
            ></TextField>

            <TextField
              size="small"
              fullWidth
              placeholder="Phone"
              {...getFieldProps("phone")}
              helperText={touched.phone && errors.phone}
              error={Boolean(touched.phone && errors.phone)}
              margin="normal"
            ></TextField>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Pincode"
                  {...getFieldProps("pincode")}
                  helperText={touched.pincode && errors.pincode}
                  error={Boolean(touched.pincode && errors.pincode)}
                  margin="normal"
                ></TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="City"
                  {...getFieldProps("city")}
                  helperText={touched.city && errors.city}
                  error={Boolean(touched.city && errors.city)}
                  margin="normal"
                ></TextField>
              </Grid>
            </Grid>
            <TextField
              multiline
              rows={2}
              fullWidth
              placeholder="Description"
              {...getFieldProps("descriptions")}
              helperText={touched.descriptions && errors.descriptions}
              error={Boolean(touched.descriptions && errors.descriptions)}
              margin="normal"
            ></TextField>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  type="file"
                  size="small"
                  onChange={(event) => {
                    setFieldValue("requirement_img", event.currentTarget.files);
                  }}
                  sx={{ mt: 0.5 }}
                  fullWidth
                  placeholder="Image"
                />
              </Grid>
              <Grid item xs={12} md={6}>
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
                      boxShadow: "none",
                    },
                    mt: 0.5,
                  }}
                  fullWidth
                >
                  Submit Your Request
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
