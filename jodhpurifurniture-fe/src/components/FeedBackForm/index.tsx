import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MyFeedbackFormchema } from "@/common/validations";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { LoadingButton } from "@mui/lab";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useFeedBackForm } from "@/service/feedback";

const currencies = [
  {
    value: "Product Query",
  },
  {
    value: "Order Related Query",
  },
  {
    value: "Delivery Related Query",
  },
  {
    value: "Return Item",
  },
  {
    value: "Website Feedback",
  },
  {
    value: "Others",
  },
];

export default function FeedBackForm() {
  const [age, setAge] = useState("");

  const initialValues = {
    feedback_img: "",
    full_name: "",
    email: "",
    phone: "",
    reason: "",
    comment: "",
  };

  const {
    data: message,
    mutate: createFeedbackForm,
    isLoading,
  } = useFeedBackForm();

  const handleSubmit = (values) => {
    const newValues = {
      ...values,
    };
    const formData = new FormData();
    Object.keys(newValues).map((key) => {
      if (key === "feedback_img") {
        let FileList: any = newValues[key];
        if (FileList && FileList?.length > 0) {
          formData.append(key, FileList[0]);
        }
      } else {
        formData.append(key, newValues[key]);
      }
    });
    createFeedbackForm(formData);
  };

  const {
    errors,
    touched,
    resetForm,
    getFieldProps,
    setFieldValue,
    handleSubmit: myFeedBackFormSubmit,
  } = useFormik<any>({
    validateOnMount: true,
    validationSchema: MyFeedbackFormchema,
    initialValues: initialValues,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (message?.response == 1) {
      toast.success(message?.message);
      resetForm();
    }
  }, [message]);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
    setFieldValue("reason", event.target.value);
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
    <>
      <form onSubmit={myFeedBackFormSubmit}>
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
            Let us know what you think of our products
          </h1>{" "}
          <Grid item xs={12} md={6} mt={2}>
            <label className="font-14 color-222222 jost fw-500">Name *</label>
            <TextField
              sx={{ mt: 0.5, mb: 2, ...style }}
              size="small"
              fullWidth
              placeholder=" Name "
              {...getFieldProps("full_name")}
              helperText={touched.full_name && errors.full_name}
              error={Boolean(touched.full_name && errors.full_name)}
            ></TextField>
          </Grid>
          <label className="font-14 color-222222 jost fw-500">Email *</label>
          <TextField
            sx={{ mt: 0.5, mb: 2, ...style }}
            size="small"
            fullWidth
            placeholder=" 
            Email "
            {...getFieldProps("email")}
            helperText={touched.email && errors.email}
            error={Boolean(touched.email && errors.email)}
          ></TextField>
          <label className="font-14 color-222222 jost fw-500">
            Mobile No. *
          </label>
          <TextField
            size="small"
            sx={{ mt: 0.5, mb: 2, ...style }}
            fullWidth
            placeholder=" 
            Mobile No.  "
            {...getFieldProps("phone")}
            helperText={touched.phone && errors.phone}
            error={Boolean(touched.phone && errors.phone)}
          ></TextField>
          <label className="font-14 color-222222 jost fw-500">Reason *</label>
          <FormControl
            fullWidth
            error={Boolean(touched.reason && errors.reason)}
          >
            <Select
              size="small"
              sx={{ mt: 0.5, ...style }}
              // label='Age'
              value={age}
              onChange={handleChange}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{touched.reason && errors.reason}</FormHelperText>
          </FormControl>
          <label
            style={{ marginTop: 18 }}
            className="font-14 color-222222 jost fw-500"
          >
            File Upload
          </label>
          <TextField
            type="file"
            onChange={(event) => {
              setFieldValue("feedback_img", event.currentTarget.files);
            }}
            sx={{ mt: 0.5, mb: 2, ...style }}
            fullWidth
            placeholder="Image"
          />
          <label className="font-14 color-222222 jost fw-500">Comment*</label>
          <TextField
            multiline
            rows={5}
            sx={{ mt: 0.5, mb: 2, ...style }}
            fullWidth
            placeholder="Comment"
            {...getFieldProps("comment")}
            helperText={touched.comment && errors.comment}
            error={Boolean(touched.comment && errors.comment)}
          ></TextField>
          <LoadingButton
            type="submit"
            loading={isLoading}
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
          ></Grid>
        </Grid>
      </form>
    </>
  );
}
