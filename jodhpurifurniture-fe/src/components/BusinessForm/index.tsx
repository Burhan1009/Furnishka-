import { useFormik } from "formik";
import { MyPBusinessFormchema } from "@/common/validations";
import { Box, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

interface IPageHeaderRequiredProps {
  forUpdate?: boolean;
}

export default function BusinessForm({ forUpdate }: IPageHeaderRequiredProps) {
  const initialValues = {
    gst: "",
    company_name: "",
    company_address: "",
  };

  const handleSubmit = (values) => {
    const newValues = {
      ...values,
    };
  };

  const {
    errors,
    touched,
    getFieldProps,
    handleSubmit: myBuinessFormSubmit,
    isSubmitting,
  } = useFormik<any>({
    validateOnMount: true,
    validationSchema: MyPBusinessFormchema,
    initialValues: initialValues,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={myBuinessFormSubmit}>
      <Typography
        sx={{
          color: "#222222",
          fontSize: 20,
          textAlign: { xs: "center", md: "left" },
          fontWeight: "500",
          flexWrap: "wrap",
          mt: 5,
          ml: 1,
        }}
        className="jost"
      >
        Buying For Your Business?
      </Typography>
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
        <Typography
          sx={{
            flexWrap: "wrap",
            display: { md: "flex" },
          }}
        >
          <Typography>
            <Typography
              sx={{
                color: "#222222",
                fontSize: 14,
                fontWeight: "550",
                mt: 2.5,
                mb: -1,
              }}
              className="jost"
            >
              GST Number
            </Typography>
            <TextField
              inputProps={{
                style: {
                  height: 43,
                  padding: "0 14px",
                },
              }}
              sx={{ width: { md: 346 }, mr: { md: 2 } }}
              fullWidth
              placeholder="GST Number"
              {...getFieldProps("gst")}
              helperText={touched.gst && errors.gst}
              error={Boolean(touched.gst && errors.gst)}
              margin="normal"
            ></TextField>
          </Typography>
          <Typography>
            <Typography
              className="jost"
              sx={{
                color: "#222222",
                fontSize: 14,
                fontWeight: "550",
                mt: 2.5,
                mb: -1,
              }}
            >
              Company Name
            </Typography>
            <TextField
              inputProps={{
                style: {
                  height: 43,
                  padding: "0 14px",
                },
              }}
              sx={{ width: { md: 346 } }}
              fullWidth
              placeholder=" Company Name"
              {...getFieldProps("company_name")}
              helperText={touched.company_name && errors.company_name}
              error={Boolean(touched.company_name && errors.company_name)}
              margin="normal"
            ></TextField>
          </Typography>
        </Typography>
        <Typography>
          <Typography
            className="jost"
            sx={{
              color: "#222222",
              fontSize: 14,
              fontWeight: "550",
              mt: 2.5,
              mb: -1,
            }}
          >
            Address
          </Typography>
          <TextField
            multiline
            maxRows={5}
            fullWidth
            placeholder=" Address"
            {...getFieldProps("company_address")}
            helperText={touched.company_address && errors.company_address}
            error={Boolean(touched.company_address && errors.company_address)}
            margin="normal"
          ></TextField>
        </Typography>
        <Typography
          sx={{
            alignSelf: "center",
          }}
        >
          <LoadingButton
            className="jost"
            type="submit"
            style={{
              fontSize: 16,
              fontWeight: "500",
            }}
            sx={{
              background: "#f15a21",
              color: "#fff",

              "&:hover": {
                background: "#f15a21",
                color: "#fff",
              },
              mt: 3,
              mr: 3,
              width: { md: 180 },
            }}
            fullWidth
          >
            Submit
          </LoadingButton>
        </Typography>
      </Box>
    </form>
  );
}
