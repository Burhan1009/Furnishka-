import { useFormik } from "formik";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { MySupportFormchema } from "@/common/validations";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import { LoadingButton } from "@mui/lab";
import { useSupportForm } from "@/service/support";
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

  return (
    <>
      <form onSubmit={mySupportFormSubmit}>
        <Grid
          sx={{
            padding: { xs: 2.5, md: 6 },
            mt: -10,
          }}
        >
          <h1
            className="font-2543 fw-500 jost"
            style={{ textAlign: "center", lineHeight: 1.5 }}
          >
            Get in touch for your order-related queries
          </h1>{" "}
          <Grid item xs={12} md={6} mt={2}>
            <label className="font-14 color-222222 jost fw-500">
              Order Id*
            </label>
            <TextField
              sx={{
                mt: 0.5,
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#ddd",
                    borderWidth: 1,
                  },
                },
              }}
              size="small"
              fullWidth
              placeholder=" Order Id"
              {...getFieldProps("order_id")}
              helperText={touched.order_id && errors.order_id}
              error={Boolean(touched.order_id && errors.order_id)}
              margin="normal"
            ></TextField>
          </Grid>
          <label className="font-14 color-222222 jost fw-500">Message*</label>
          <TextField
            multiline
            rows={5}
            sx={{
              mt: 0.5,
              mb: 2,
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#ddd",
                  borderWidth: 1,
                },
              },
            }}
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
            sx={{
              mt: 0.5,
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#ddd",
                  borderWidth: 1,
                },
              },
            }}
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
              background: "#f15a21",
              color: "#fff",
              fontSize: { xs: 14, sm: 15, md: 15, lg: 16 },

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
        </Grid>
      </form>
    </>
  );
}
