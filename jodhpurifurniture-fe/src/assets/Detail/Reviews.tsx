import React, { forwardRef } from "react";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  Skeleton,
  TextField,
} from "@mui/material";
import { LoadingButton, Rating } from "@mui/lab";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { RatingCards } from "@/components";
import StarIcon from "@mui/icons-material/Star";

import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import {
  selectProductDetail,
  selectProductFetchSuccess,
  selectProductLoading,
  useGetReviewsDetail,
} from "@/service/detail";
import { useFormik } from "formik";
import { reviewSchema } from "@/common/validations";
import { useAddProductReview } from "@/service/Profile";

import IconButton from "@mui/material/IconButton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{ mt: -1, mb: -1, ml: -1, fontFamily: "Jost", fontSize: 18 }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 3,
            "&:hover": {
              background: "transparent",
            },
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
function BootstrapDialogTitle1(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{ mt: 0, mb: 0.7, ml: 0, fontFamily: "Jost", fontSize: 18 }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 0,
            "&:hover": {
              background: "transparent",
            },
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
const Review = forwardRef((props, ref) => {
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 5;

  const product = useSelector(selectProductDetail);
  const { data, isLoading: reviewLoading } = useGetReviewsDetail(
    { p_id: product.product_id },
    {
      enabled: !!product?.product_id,
    }
  );
  const productReview1 = data?.data ?? [];
  const productReview = productReview1?.reviews;
  const reviewImages = productReview1?.all_images;

  const lastIndex = page * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const records = productReview?.slice(firstIndex, lastIndex);
  const npage = Math.ceil(productReview?.length / itemsPerPage);
  const prePage = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  };
  const nextPage = () => {
    if (page !== npage) {
      setPage(page + 1);
    }
  };

  console.log({ page });

  const [value, setValue] = React.useState<number | null>(5);

  const { mutate: addReview, isSuccess, isLoading } = useAddProductReview();

  React.useEffect(() => {
    if (isSuccess) {
      resetForm();
    }
  }, [isSuccess]);

  const initialValues = {
    review: "",
    email: "",
    full_name: "",
    product_id: "",
    grievance_img: [],
    rating: "",
  };

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
    newValues.product_id = product.product_id;
    newValues.rating = newValues.rating == "" ? 5 : newValues.rating;
    addReview(newValues);
  };

  const {
    handleSubmit: formikHandleSubmit,
    touched: formikTouched,
    errors: formikErrors,
    getFieldProps: formikGetFieldProps,
    setFieldValue: formikSetFieldValue,

    resetForm,
  } = useFormik<any>({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: reviewSchema,
  });

  const reviewsCount =
    productReview?.length &&
    productReview?.map((val) => val.rating).reduce((a, b) => a + b);
  const ratingCount = reviewsCount / productReview?.length;

  const fiveReview =
    productReview?.length &&
    productReview?.map((val) => val.rating == 5).reduce((a, b) => a + b);

  const fiveReviewPercent = Math.floor(
    (fiveReview / productReview?.length) * 100
  );

  const fourReveiw =
    productReview?.length &&
    productReview?.map((val) => val.rating == 4).reduce((a, b) => a + b);

  const fourReveiwPercent = Math.floor(
    (fourReveiw / productReview?.length) * 100
  );

  const threeReview =
    productReview?.length &&
    productReview?.map((val) => val.rating == 3).reduce((a, b) => a + b);

  const threeReviewPercent = Math.floor(
    (threeReview / productReview?.length) * 100
  );

  const twoReveiw =
    productReview?.length &&
    productReview?.map((val) => val.rating == 2).reduce((a, b) => a + b);

  const oneReveiw =
    productReview?.length &&
    productReview?.map((val) => val.rating == 1).reduce((a, b) => a + b);

  const productLoading = useSelector(selectProductLoading);
  const successFetch = useSelector(selectProductFetchSuccess);
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#f15a21",
    },
  });

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenReview = () => {
    setOpen1(true);
  };
  const handleCloseReview = () => {
    setOpen1(false);
  };

  const [showResidual, setShowResidual] = React.useState(true);
  const [residualCount, setResidualCount] = React.useState(0);
  React.useEffect(() => {
    const count = reviewImages ? Math.max(reviewImages.length - 4, 0) : 0;
    setResidualCount(count);
  }, [reviewImages]);
  const handleFourthImageClick = () => {
    setShowResidual(false);
    setResidualCount(reviewImages.length - 4);

    setOpen(true);
  };

  return (
    <>
      {productLoading ? (
        <></>
      ) : (
        <>
          {successFetch ? (
            <div className="container2" ref={ref}>
              <Grid
                className="border2 review-sec-border"
                style={{ marginTop: 40, marginBottom: -50 }}
              ></Grid>
              <Grid sx={{ mt: 12 }}>
                <section className="section-4">
                  <div>
                    <div className="d-flex justify-content-between">
                      <div>
                        <Typography
                          sx={{
                            textAlign: "left",
                            fontFamily: "Jost",
                            fontWeight: "500",
                            fontSize: { xs: 20, sm: 23, md: 22, lg: 24 },
                          }}
                        >
                          Customer Reviews
                        </Typography>
                      </div>
                    </div>
                    {productReview?.length <= 0 ? (
                      <>
                        <Button
                          onClick={handleOpenReview}
                          sx={{
                            fontFamily: "Jost",
                            fontWeight: "500",
                            background: "#f15a21",
                            borderRadius: "4px",
                            width: "248px",
                            fontSize: 16,
                            padding: "18px 0px",
                            color: "White",
                            mt: 4,
                            mb: 6,
                            "&:hover": {
                              background: "#f15a21",
                              color: "#fff",
                            },
                          }}
                        >
                          Write A Review
                        </Button>
                        <BootstrapDialog
                          onClose={handleClose}
                          aria-labelledby="customized-dialog-title"
                          open={open1}
                        >
                          {" "}
                          <BootstrapDialogTitle
                            id="customized-dialog-title"
                            onClose={handleCloseReview}
                          >
                            Write a Review
                          </BootstrapDialogTitle>
                          <DialogContent dividers>
                            <form onSubmit={formikHandleSubmit}>
                              <Grid>
                                <Grid>
                                  <InputLabel
                                    sx={{
                                      fontFamily: "Jost",
                                      fontWeight: "400",
                                    }}
                                  >
                                    Your Rating
                                  </InputLabel>
                                  <StyledRating
                                    sx={{ mt: 0.5 }}
                                    name="simple-controlled"
                                    value={value}
                                    onChange={(event, newValue) => {
                                      setValue(newValue);
                                      formikSetFieldValue("rating", newValue);
                                    }}
                                    emptyIcon={
                                      <StarIcon
                                        style={{ opacity: 0.55 }}
                                        fontSize="inherit"
                                      />
                                    }
                                  />
                                </Grid>
                                <Grid mt={2}>
                                  <InputLabel
                                    sx={{
                                      fontFamily: "Jost",
                                      fontWeight: "500",
                                      color: "#222",
                                    }}
                                  >
                                    Your Review
                                  </InputLabel>

                                  <TextField
                                    multiline={true}
                                    rows={4}
                                    error={Boolean(
                                      formikTouched.review &&
                                        formikErrors.review
                                    )}
                                    fullWidth
                                    helperText={
                                      formikTouched.review &&
                                      formikErrors.review
                                    }
                                    placeholder="Write your review here..."
                                    {...formikGetFieldProps("review")}
                                    sx={{
                                      mt: 1,

                                      input: {
                                        color: "#222",

                                        "&::placeholder": {
                                          fontFamily: "Jost",
                                        },
                                      },
                                      "& .MuiOutlinedInput-root": {
                                        "&.Mui-focused fieldset": {
                                          borderColor: "rgba(0, 0, 0, 0.23)",
                                        },
                                        "& label.Mui-focused": {
                                          borderColor:
                                            "0.5px solid rgba(0, 0, 0, 0.23)",
                                        },
                                        "&:hover fieldset": {
                                          borderColor: "rgba(0, 0, 0, 0.23)",
                                        },
                                      },
                                    }}
                                  />
                                </Grid>
                                <Grid mt={2}>
                                  <InputLabel
                                    sx={{
                                      fontFamily: "Jost",
                                      fontWeight: "500",
                                      color: "#222",
                                    }}
                                  >
                                    Name
                                  </InputLabel>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    error={Boolean(
                                      formikTouched.full_name &&
                                        formikErrors.full_name
                                    )}
                                    helperText={
                                      formikTouched.full_name &&
                                      formikErrors.full_name
                                    }
                                    placeholder="Write your name here..."
                                    {...formikGetFieldProps("full_name")}
                                    sx={{
                                      mt: 1,
                                      input: {
                                        "&::placeholder": {
                                          fontFamily: "Jost",
                                        },
                                      },
                                      "& .MuiOutlinedInput-root": {
                                        "&.Mui-focused fieldset": {
                                          borderColor: "rgba(0, 0, 0, 0.23)",
                                        },
                                        "& label.Mui-focused": {
                                          borderColor:
                                            "0.5px solid rgba(0, 0, 0, 0.23)",
                                        },
                                        "&:hover fieldset": {
                                          borderColor: "rgba(0, 0, 0, 0.23)",
                                        },
                                      },
                                    }}
                                  />
                                </Grid>
                                <Grid mt={2}>
                                  <InputLabel
                                    sx={{
                                      fontFamily: "Jost",
                                      fontWeight: "500",
                                      color: "#222",
                                    }}
                                  >
                                    Email
                                  </InputLabel>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    error={Boolean(
                                      formikTouched.email && formikErrors.email
                                    )}
                                    helperText={
                                      formikTouched.email && formikErrors.email
                                    }
                                    placeholder="Write your email here..."
                                    {...formikGetFieldProps("email")}
                                    sx={{
                                      mt: 1,
                                      input: {
                                        "&::placeholder": {
                                          fontFamily: "Jost",
                                        },
                                      },
                                      "& .MuiOutlinedInput-root": {
                                        "&.Mui-focused fieldset": {
                                          borderColor: "rgba(0, 0, 0, 0.23)",
                                        },
                                        "& label.Mui-focused": {
                                          borderColor:
                                            "0.5px solid rgba(0, 0, 0, 0.23)",
                                        },
                                        "&:hover fieldset": {
                                          borderColor: "rgba(0, 0, 0, 0.23)",
                                        },
                                      },
                                    }}
                                  />
                                </Grid>
                                <Grid mt={2}>
                                  <InputLabel
                                    sx={{
                                      fontFamily: "Jost",
                                      fontWeight: "500",
                                      color: "#222",
                                    }}
                                  >
                                    Image Upload
                                  </InputLabel>

                                  <TextField
                                    fullWidth
                                    type="file"
                                    multiple
                                    onChange={(event) => {
                                      formikSetFieldValue(
                                        "grievance_img",
                                        event.currentTarget.files
                                      );
                                    }}
                                    inputProps={{
                                      multiple: true,
                                      accept: "image/*",
                                    }}
                                    sx={{
                                      mt: 0.5,
                                      input: {
                                        "&::placeholder": {
                                          fontFamily: "Jost",
                                        },
                                        height: "unset",
                                        padding: " 8.5px 14px",
                                        background: "transparent",
                                      },

                                      "& .MuiOutlinedInput-root": {
                                        "&.Mui-focused fieldset": {
                                          borderColor: "rgba(0, 0, 0, 0.23)",
                                        },
                                        "& label.Mui-focused": {
                                          borderColor:
                                            "0.5px solid rgba(0, 0, 0, 0.23)",
                                        },
                                        "&:hover fieldset": {
                                          borderColor: "rgba(0, 0, 0, 0.23)",
                                        },
                                      },
                                    }}
                                    placeholder="Image"
                                    margin="normal"
                                  />
                                </Grid>
                                {isSuccess && (
                                  <Typography
                                    sx={{
                                      color: "green",
                                      mt: 1.5,
                                      fontFamily: "Jost",
                                    }}
                                  >
                                    Thank you for submiting your review. The
                                    review will be published once it is approved
                                    from our end.
                                  </Typography>
                                )}
                                <Grid mt={2.5}>
                                  <LoadingButton
                                    sx={{
                                      background: "#f15a21",
                                      width: 150,
                                      color: "#fff",
                                      boxShadow: "none",
                                      "&:hover": {
                                        backgroundColor: "#f15a21",
                                        color: "#fff",
                                        boxShadow: "none",
                                      },
                                      fontFamily: "Jost",
                                    }}
                                    type="submit"
                                    loading={isLoading}
                                    variant="contained"
                                  >
                                    SUBMIT
                                  </LoadingButton>
                                </Grid>
                              </Grid>
                            </form>
                          </DialogContent>
                        </BootstrapDialog>
                      </>
                    ) : (
                      ""
                    )}
                  </div>

                  {productReview?.length > 0 ? (
                    <div>
                      <Box>
                        <Grid
                          container
                          sx={{
                            // display: "flex",

                            mt: 2,
                            // gap: {xs:0,sm:12},
                            // flexWrap: { xs: "wrap", md: "nowrap" },
                          }}
                        >
                          <Grid
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            item
                            className="margin-bottom-reviews "
                            sx={{
                              mt: 2,
                            }}
                          >
                            {/* Burhan code here */}
                            <Box
                              sx={{
                                background: "#f4f9fc",
                                padding: "32px 40px 32px 32px",
                                border: "1px solid #f2f2f2",
                              }}
                            >
                              {/* Burhan code here */}
                              <Grid
                                container
                                justifyContent="space-between"
                                className="review_wrapper"
                              >
                                <Grid
                                  className="star_wrapper"
                                  item
                                  xs={12}
                                  sm={12}
                                  md={4}
                                  gap="25px"
                                  display="flex"
                                  alignItems="center"
                                >
                                  <div className="row">
                                    <div className="col-3 w100">
                                      <Grid
                                        sx={{
                                          display: "flex",
                                          gap: 1,
                                          alignItems: "center",
                                          ml: -0.8,
                                          justifyContent: "center",
                                          flexDirection: {
                                            xs: "row",
                                            sm: "column",
                                          },
                                        }}
                                      >
                                        {" "}
                                        <Typography
                                          sx={{
                                            textAlign: "center",
                                            fontWeight: 600,
                                            fontFamily: "Jost",
                                            mt: 0.3,
                                            fontSize: {
                                              xs: "46.177px",
                                              sm: "64px",
                                            },
                                            lineHeight: "1",
                                          }}
                                        >
                                          {ratingCount.toFixed(2)}
                                        </Typography>
                                        <Box
                                          display="flex"
                                          flexDirection="column"
                                        >
                                          <StyledRating
                                            sx={{ justifyContent: "center" }}
                                            readOnly
                                            precision={0.5}
                                            value={ratingCount}
                                            emptyIcon={
                                              <StarIcon
                                                style={{
                                                  opacity: 0.55,
                                                }}
                                                fontSize="inherit"
                                              />
                                            }
                                          />
                                          <Typography
                                            sx={{
                                              mt: { xs: 0, md: 1 },
                                              fontFamily: "Jost",
                                              color: "#484848",
                                              fontSize: 14,
                                              textAlign: {
                                                xs: "left",
                                                sm: "center",
                                              },
                                            }}
                                          >
                                            {productReview?.length} Reviews
                                          </Typography>
                                        </Box>
                                      </Grid>
                                    </div>
                                    <div className="col-3">
                                      <Button
                                        onClick={handleOpenReview}
                                        sx={{
                                          display: { xs: "none" },
                                          fontFamily: "Jost",
                                          fontWeight: "500",
                                          background: "#000000ff",
                                          borderRadius: "4px",
                                          minWidth: "117px",

                                          fontSize: 12,
                                          padding: "8px 8px",
                                          color: "White",
                                          mt: 1,

                                          "&:hover": {
                                            background: "#d5683a",
                                            color: "#fff",
                                          },
                                        }}
                                      >
                                        Write A Review
                                      </Button>
                                      <BootstrapDialog
                                        onClose={handleClose}
                                        aria-labelledby="customized-dialog-title"
                                        open={open1}
                                      >
                                        {" "}
                                        <BootstrapDialogTitle
                                          id="customized-dialog-title"
                                          onClose={handleCloseReview}
                                        >
                                          {" "}
                                          Write A Review
                                        </BootstrapDialogTitle>
                                        <DialogContent dividers>
                                          <form onSubmit={formikHandleSubmit}>
                                            <Grid>
                                              <Grid>
                                                <InputLabel
                                                  sx={{
                                                    fontFamily: "Jost",
                                                    fontWeight: "400",
                                                  }}
                                                >
                                                  Your Rating
                                                </InputLabel>
                                                <StyledRating
                                                  sx={{ mt: 0.5 }}
                                                  name="simple-controlled"
                                                  value={value}
                                                  onChange={(
                                                    event,
                                                    newValue
                                                  ) => {
                                                    setValue(newValue);
                                                    formikSetFieldValue(
                                                      "rating",
                                                      newValue
                                                    );
                                                  }}
                                                  emptyIcon={
                                                    <StarIcon
                                                      style={{ opacity: 0.55 }}
                                                      fontSize="inherit"
                                                    />
                                                  }
                                                />
                                              </Grid>
                                              <Grid mt={2}>
                                                <InputLabel
                                                  sx={{
                                                    fontFamily: "Jost",
                                                    fontWeight: "500",
                                                    color: "#222",
                                                  }}
                                                >
                                                  Your Review
                                                </InputLabel>

                                                <TextField
                                                  multiline={true}
                                                  rows={4}
                                                  error={Boolean(
                                                    formikTouched.review &&
                                                      formikErrors.review
                                                  )}
                                                  fullWidth
                                                  helperText={
                                                    formikTouched.review &&
                                                    formikErrors.review
                                                  }
                                                  placeholder="Write your review here..."
                                                  {...formikGetFieldProps(
                                                    "review"
                                                  )}
                                                  sx={{
                                                    mt: 1,

                                                    input: {
                                                      color: "#222",

                                                      "&::placeholder": {
                                                        fontFamily: "Jost",
                                                      },
                                                    },
                                                    "& .MuiOutlinedInput-root":
                                                      {
                                                        "&.Mui-focused fieldset":
                                                          {
                                                            borderColor:
                                                              "rgba(0, 0, 0, 0.23)",
                                                          },
                                                        "& label.Mui-focused": {
                                                          borderColor:
                                                            "0.5px solid rgba(0, 0, 0, 0.23)",
                                                        },
                                                        "&:hover fieldset": {
                                                          borderColor:
                                                            "rgba(0, 0, 0, 0.23)",
                                                        },
                                                      },
                                                  }}
                                                />
                                              </Grid>
                                              <Grid mt={2}>
                                                <InputLabel
                                                  sx={{
                                                    fontFamily: "Jost",
                                                    fontWeight: "500",
                                                    color: "#222",
                                                  }}
                                                >
                                                  Name
                                                </InputLabel>
                                                <TextField
                                                  fullWidth
                                                  size="small"
                                                  error={Boolean(
                                                    formikTouched.full_name &&
                                                      formikErrors.full_name
                                                  )}
                                                  helperText={
                                                    formikTouched.full_name &&
                                                    formikErrors.full_name
                                                  }
                                                  placeholder="Write your name here..."
                                                  {...formikGetFieldProps(
                                                    "full_name"
                                                  )}
                                                  sx={{
                                                    mt: 1,
                                                    input: {
                                                      "&::placeholder": {
                                                        fontFamily: "Jost",
                                                      },
                                                    },
                                                    "& .MuiOutlinedInput-root":
                                                      {
                                                        "&.Mui-focused fieldset":
                                                          {
                                                            borderColor:
                                                              "rgba(0, 0, 0, 0.23)",
                                                          },
                                                        "& label.Mui-focused": {
                                                          borderColor:
                                                            "0.5px solid rgba(0, 0, 0, 0.23)",
                                                        },
                                                        "&:hover fieldset": {
                                                          borderColor:
                                                            "rgba(0, 0, 0, 0.23)",
                                                        },
                                                      },
                                                  }}
                                                />
                                              </Grid>
                                              <Grid mt={2}>
                                                <InputLabel
                                                  sx={{
                                                    fontFamily: "Jost",
                                                    fontWeight: "500",
                                                    color: "#222",
                                                  }}
                                                >
                                                  Email
                                                </InputLabel>
                                                <TextField
                                                  fullWidth
                                                  size="small"
                                                  error={Boolean(
                                                    formikTouched.email &&
                                                      formikErrors.email
                                                  )}
                                                  helperText={
                                                    formikTouched.email &&
                                                    formikErrors.email
                                                  }
                                                  placeholder="Write your email here..."
                                                  {...formikGetFieldProps(
                                                    "email"
                                                  )}
                                                  sx={{
                                                    mt: 1,
                                                    input: {
                                                      "&::placeholder": {
                                                        fontFamily: "Jost",
                                                      },
                                                    },
                                                    "& .MuiOutlinedInput-root":
                                                      {
                                                        "&.Mui-focused fieldset":
                                                          {
                                                            borderColor:
                                                              "rgba(0, 0, 0, 0.23)",
                                                          },
                                                        "& label.Mui-focused": {
                                                          borderColor:
                                                            "0.5px solid rgba(0, 0, 0, 0.23)",
                                                        },
                                                        "&:hover fieldset": {
                                                          borderColor:
                                                            "rgba(0, 0, 0, 0.23)",
                                                        },
                                                      },
                                                  }}
                                                />
                                              </Grid>
                                              <Grid mt={2}>
                                                <InputLabel
                                                  sx={{
                                                    fontFamily: "Jost",
                                                    fontWeight: "500",
                                                    color: "#222",
                                                  }}
                                                >
                                                  Image Upload
                                                </InputLabel>

                                                <TextField
                                                  fullWidth
                                                  type="file"
                                                  multiple
                                                  onChange={(event) => {
                                                    formikSetFieldValue(
                                                      "grievance_img",
                                                      event.currentTarget.files
                                                    );
                                                  }}
                                                  inputProps={{
                                                    multiple: true,
                                                    accept: "image/*",
                                                  }}
                                                  sx={{
                                                    mt: 0.5,
                                                    input: {
                                                      "&::placeholder": {
                                                        fontFamily: "Jost",
                                                      },
                                                      height: "unset",
                                                      padding: " 8.5px 14px",
                                                      background: "transparent",
                                                    },

                                                    "& .MuiOutlinedInput-root":
                                                      {
                                                        "&.Mui-focused fieldset":
                                                          {
                                                            borderColor:
                                                              "rgba(0, 0, 0, 0.23)",
                                                          },
                                                        "& label.Mui-focused": {
                                                          borderColor:
                                                            "0.5px solid rgba(0, 0, 0, 0.23)",
                                                        },
                                                        "&:hover fieldset": {
                                                          borderColor:
                                                            "rgba(0, 0, 0, 0.23)",
                                                        },
                                                      },
                                                  }}
                                                  placeholder="Image"
                                                  margin="normal"
                                                />
                                              </Grid>
                                              {isSuccess && (
                                                <Typography
                                                  sx={{
                                                    color: "green",
                                                    mt: 1.5,
                                                    fontFamily: "Jost",
                                                  }}
                                                >
                                                  Thank you for submiting your
                                                  review. The review will be
                                                  published once it is approved
                                                  from our end.
                                                </Typography>
                                              )}
                                              <Grid mt={2.5}>
                                                <LoadingButton
                                                  sx={{
                                                    background: "#f15a21",
                                                    width: 150,
                                                    color: "#fff",
                                                    boxShadow: "none",
                                                    "&:hover": {
                                                      backgroundColor:
                                                        "#f15a21",
                                                      color: "#fff",
                                                      boxShadow: "none",
                                                    },
                                                    fontFamily: "Jost",
                                                  }}
                                                  type="submit"
                                                  loading={isLoading}
                                                  variant="contained"
                                                >
                                                  SUBMIT
                                                </LoadingButton>
                                              </Grid>
                                            </Grid>
                                          </form>
                                        </DialogContent>
                                      </BootstrapDialog>
                                    </div>
                                  </div>
                                  <Grid
                                    sx={{
                                      width: { xs: "100%", sm: 200 },
                                    }}
                                  >
                                    <div
                                      className="d-flex"
                                      style={{ alignItems: "center" }}
                                    >
                                      <div
                                        className="text-center"
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Typography
                                          sx={{
                                            fontSize: 15,
                                            fontFamily: "Jost",
                                            color: "#f15a21",
                                            mr: 0.5,
                                            fontWeight: "500",
                                          }}
                                        >
                                          5
                                        </Typography>
                                        <Rating
                                          readOnly
                                          name="size-small"
                                          sx={{ color: "#f15a21", mr: 1 }}
                                          defaultValue={1}
                                          max={1}
                                          size="small"
                                        />
                                      </div>
                                      <div className="flex-grow-1">
                                        <div className="row align-items-center">
                                          <i className="bi bi-star"></i>
                                          <div className="col-12">
                                            <div
                                              className="progress wfull"
                                              style={{
                                                height: "8px",
                                                width: "212px",
                                              }}
                                            >
                                              <div
                                                className="progress-bar bg-success1"
                                                role="progressbar"
                                                style={{
                                                  width: `${
                                                    (fiveReview / data?.count) *
                                                    100
                                                  }%`,
                                                  color: "red",
                                                }}
                                                aria-valuenow="75"
                                                aria-valuemin="0"
                                                aria-valuemax="50"
                                              ></div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="text-center">
                                        <Typography
                                          sx={{
                                            fontSize: 15,
                                            fontFamily: "Jost",
                                            color: "#484848",

                                            fontWeight: "500",
                                          }}
                                          style={{
                                            marginLeft:
                                              fiveReview == 0 ? 20 : 12,
                                          }}
                                        >
                                          {fiveReviewPercent}%
                                        </Typography>
                                      </div>
                                    </div>

                                    <div
                                      className="d-flex"
                                      style={{
                                        alignItems: "center",
                                        marginTop: 8,
                                      }}
                                    >
                                      <div
                                        className="text-center"
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Typography
                                          sx={{
                                            fontSize: 15,
                                            fontFamily: "Jost",
                                            color: "#484848",
                                            mr: 0.5,
                                            fontWeight: "500",
                                          }}
                                        >
                                          4
                                        </Typography>
                                        <Rating
                                          readOnly
                                          name="size-small"
                                          sx={{ color: "#f15a21", mr: 1 }}
                                          defaultValue={1}
                                          max={1}
                                          size="small"
                                        />
                                      </div>
                                      <div className="flex-grow-1">
                                        <div className="row align-items-center">
                                          {/* <div className='col-4 text-right'>5</div> */}
                                          <i className="bi bi-star"></i>
                                          <div className="col-12">
                                            <div
                                              className="progress wfull"
                                              style={{
                                                height: "8px",
                                                width: "212px",
                                              }}
                                            >
                                              <div
                                                className="progress-bar bg-success1"
                                                role="progressbar"
                                                style={{
                                                  width: `${
                                                    (fourReveiw / data?.count) *
                                                    100
                                                  }%`,
                                                  color: "red",
                                                }}
                                                aria-valuenow="75"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="text-center">
                                        <Typography
                                          sx={{
                                            fontSize: 15,
                                            fontFamily: "Jost",
                                            color: "#484848",

                                            fontWeight: "500",
                                          }}
                                          style={{
                                            marginLeft:
                                              fourReveiw == 0 ? 25 : 18,
                                          }}
                                          className="display-15 font-weight-bolder"
                                        >
                                          {fourReveiwPercent}%
                                        </Typography>
                                      </div>
                                    </div>
                                    <div
                                      className="d-flex"
                                      style={{
                                        alignItems: "center",
                                        marginTop: 8,
                                      }}
                                    >
                                      <div
                                        className="text-center"
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Typography
                                          sx={{
                                            fontSize: 15,
                                            fontFamily: "Jost",
                                            color: "#484848",
                                            mr: 0.6,
                                            fontWeight: "500",
                                          }}
                                        >
                                          3
                                        </Typography>
                                        <Rating
                                          readOnly
                                          name="size-small"
                                          sx={{ color: "#f15a21", mr: 1 }}
                                          defaultValue={1}
                                          max={1}
                                          size="small"
                                        />
                                      </div>
                                      <div className="flex-grow-1">
                                        <div className="row align-items-center">
                                          {/* <div className='col-4 text-right'>5</div> */}
                                          <i className="bi bi-star"></i>
                                          <div className="col-12">
                                            <div
                                              className="progress wfull"
                                              style={{
                                                height: "8px",
                                                width: "212px",
                                              }}
                                            >
                                              <div
                                                className="progress-bar bg-success1"
                                                role="progressbar"
                                                style={{
                                                  width: `${
                                                    (threeReview /
                                                      data?.count) *
                                                    100
                                                  }%`,
                                                  color: "red",
                                                }}
                                                aria-valuenow="75"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="text-center">
                                        <Typography
                                          sx={{
                                            fontSize: 15,
                                            fontFamily: "Jost",
                                            color: "#484848",

                                            fontWeight: "500",
                                          }}
                                          style={{
                                            marginLeft:
                                              threeReview == 0 ? 25 : 18,
                                          }}
                                          className="display-15 font-weight-bolder"
                                        >
                                          {threeReviewPercent}%
                                        </Typography>
                                      </div>
                                    </div>
                                    <div
                                      className="d-flex"
                                      style={{
                                        alignItems: "center",
                                        marginTop: 8,
                                      }}
                                    >
                                      <div
                                        className="text-center"
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Typography
                                          sx={{
                                            fontSize: 15,
                                            fontFamily: "Jost",
                                            color: "#484848",
                                            mr: 0.6,
                                            fontWeight: "500",
                                          }}
                                        >
                                          2
                                        </Typography>

                                        <Rating
                                          readOnly
                                          name="size-small"
                                          sx={{ color: "#f15a21", mr: 1 }}
                                          defaultValue={1}
                                          max={1}
                                          size="small"
                                        />
                                      </div>
                                      <div className="flex-grow-1">
                                        <div className="row align-items-center">
                                          {/* <div className='col-4 text-right'>5</div> */}
                                          <i className="bi bi-star"></i>
                                          <div className="col-12">
                                            <div
                                              className="progress wfull"
                                              style={{
                                                height: "8px",
                                                width: "212px",
                                              }}
                                            >
                                              <div
                                                className="progress-bar bg-success1"
                                                role="progressbar"
                                                style={{
                                                  width: `${
                                                    (twoReveiw / data?.count) *
                                                    100
                                                  }%`,
                                                  color: "red",
                                                }}
                                                aria-valuenow="75"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="text-center">
                                        <Typography
                                          sx={{
                                            fontSize: 15,
                                            fontFamily: "Jost",
                                            color: "#484848",

                                            fontWeight: "500",
                                          }}
                                          style={{
                                            marginLeft:
                                              twoReveiw == 0 ? 25 : 15,
                                          }}
                                          className="display-15 font-weight-bolder"
                                        >
                                          {(
                                            twoReveiw / productReview?.length
                                          ).toFixed(2) * 100}
                                          %
                                        </Typography>
                                      </div>
                                    </div>
                                    <div
                                      className="d-flex"
                                      style={{
                                        alignItems: "center",
                                        marginTop: 8,
                                      }}
                                    >
                                      <div
                                        className="text-center"
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Typography
                                          sx={{
                                            fontSize: 15,
                                            fontFamily: "Jost",
                                            color: "#484848",
                                            mr: 0.5,
                                            fontWeight: "500",
                                          }}
                                        >
                                          1
                                        </Typography>
                                        <Rating
                                          readOnly
                                          name="size-small"
                                          sx={{ color: "#f15a21", mr: 1 }}
                                          defaultValue={1}
                                          max={1}
                                          size="small"
                                        />
                                      </div>
                                      <div className="flex-grow-1">
                                        <div className="row align-items-center">
                                          {/* <div className='col-4 text-right'>5</div> */}
                                          <i className="bi bi-star"></i>
                                          <div className="col-12">
                                            <div
                                              className="progress wfull"
                                              style={{
                                                height: "8px",
                                                width: "212px",
                                              }}
                                            >
                                              <div
                                                className="progress-bar bg-success1"
                                                role="progressbar"
                                                style={{
                                                  width: `${
                                                    (oneReveiw / data?.count) *
                                                    100
                                                  }%`,
                                                  color: "red",
                                                }}
                                                aria-valuenow="75"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="text-center">
                                        <Typography
                                          sx={{
                                            fontSize: 15,
                                            fontFamily: "Jost",
                                            color: "#484848",

                                            fontWeight: "500",
                                          }}
                                          style={{
                                            marginLeft:
                                              oneReveiw == 0 ? 26 : 15,
                                          }}
                                          className="display-15 font-weight-bolder"
                                        >
                                          {(
                                            oneReveiw / productReview?.length
                                          ).toFixed(2) * 100}
                                          %
                                        </Typography>
                                      </div>
                                    </div>
                                  </Grid>

                                  <>
                                    {/* <Button
                                  onClick={handleOpenReview}
                                  sx={{
                                    display: { xs: "none", sm: "inline" },
                                    fontFamily: "Jost",
                                    fontWeight: "500",
                                    background: "#f15a21",
                                    borderRadius: "4px",
                                    width: { sm: "260px" },
                                    
                                    ml: 2.5,
                                    fontSize: 16,
                                    padding: { sm: "14px 0px" },
                                    color: "White",
                                    mt: 4,
                                    mb: 6,
                                    "&:hover": {
                                      background: "#f15a21",
                                      color: "#fff",
                                    },
                                  }}
                                >
                                  Write A Review
                                </Button> */}

                                    <BootstrapDialog
                                      onClose={handleClose}
                                      aria-labelledby="customized-dialog-title"
                                      open={open1}
                                    >
                                      {" "}
                                      <BootstrapDialogTitle
                                        id="customized-dialog-title"
                                        onClose={handleCloseReview}
                                      >
                                        {" "}
                                        Write A Review
                                      </BootstrapDialogTitle>
                                      <DialogContent dividers>
                                        <form onSubmit={formikHandleSubmit}>
                                          <Grid>
                                            <Grid>
                                              <InputLabel
                                                sx={{
                                                  fontFamily: "Jost",
                                                  fontWeight: "400",
                                                }}
                                              >
                                                Your Rating
                                              </InputLabel>
                                              <StyledRating
                                                sx={{ mt: 0.5 }}
                                                name="simple-controlled"
                                                value={value}
                                                onChange={(event, newValue) => {
                                                  setValue(newValue);
                                                  formikSetFieldValue(
                                                    "rating",
                                                    newValue
                                                  );
                                                }}
                                                emptyIcon={
                                                  <StarIcon
                                                    style={{ opacity: 0.55 }}
                                                    fontSize="inherit"
                                                  />
                                                }
                                              />
                                            </Grid>
                                            <Grid mt={2}>
                                              <InputLabel
                                                sx={{
                                                  fontFamily: "Jost",
                                                  fontWeight: "500",
                                                  color: "#222",
                                                }}
                                              >
                                                Your Review
                                              </InputLabel>

                                              <TextField
                                                multiline={true}
                                                rows={4}
                                                error={Boolean(
                                                  formikTouched.review &&
                                                    formikErrors.review
                                                )}
                                                fullWidth
                                                helperText={
                                                  formikTouched.review &&
                                                  formikErrors.review
                                                }
                                                placeholder="Write your review here..."
                                                {...formikGetFieldProps(
                                                  "review"
                                                )}
                                                sx={{
                                                  mt: 1,

                                                  input: {
                                                    color: "#222",

                                                    "&::placeholder": {
                                                      fontFamily: "Jost",
                                                    },
                                                  },
                                                  "& .MuiOutlinedInput-root": {
                                                    "&.Mui-focused fieldset": {
                                                      borderColor:
                                                        "rgba(0, 0, 0, 0.23)",
                                                    },
                                                    "& label.Mui-focused": {
                                                      borderColor:
                                                        "0.5px solid rgba(0, 0, 0, 0.23)",
                                                    },
                                                    "&:hover fieldset": {
                                                      borderColor:
                                                        "rgba(0, 0, 0, 0.23)",
                                                    },
                                                  },
                                                }}
                                              />
                                            </Grid>
                                            <Grid mt={2}>
                                              <InputLabel
                                                sx={{
                                                  fontFamily: "Jost",
                                                  fontWeight: "500",
                                                  color: "#222",
                                                }}
                                              >
                                                Name
                                              </InputLabel>
                                              <TextField
                                                fullWidth
                                                size="small"
                                                error={Boolean(
                                                  formikTouched.full_name &&
                                                    formikErrors.full_name
                                                )}
                                                helperText={
                                                  formikTouched.full_name &&
                                                  formikErrors.full_name
                                                }
                                                placeholder="Write your name here..."
                                                {...formikGetFieldProps(
                                                  "full_name"
                                                )}
                                                sx={{
                                                  mt: 1,
                                                  input: {
                                                    "&::placeholder": {
                                                      fontFamily: "Jost",
                                                    },
                                                  },
                                                  "& .MuiOutlinedInput-root": {
                                                    "&.Mui-focused fieldset": {
                                                      borderColor:
                                                        "rgba(0, 0, 0, 0.23)",
                                                    },
                                                    "& label.Mui-focused": {
                                                      borderColor:
                                                        "0.5px solid rgba(0, 0, 0, 0.23)",
                                                    },
                                                    "&:hover fieldset": {
                                                      borderColor:
                                                        "rgba(0, 0, 0, 0.23)",
                                                    },
                                                  },
                                                }}
                                              />
                                            </Grid>
                                            <Grid mt={2}>
                                              <InputLabel
                                                sx={{
                                                  fontFamily: "Jost",
                                                  fontWeight: "500",
                                                  color: "#222",
                                                }}
                                              >
                                                Email
                                              </InputLabel>
                                              <TextField
                                                fullWidth
                                                size="small"
                                                error={Boolean(
                                                  formikTouched.email &&
                                                    formikErrors.email
                                                )}
                                                helperText={
                                                  formikTouched.email &&
                                                  formikErrors.email
                                                }
                                                placeholder="Write your email here..."
                                                {...formikGetFieldProps(
                                                  "email"
                                                )}
                                                sx={{
                                                  mt: 1,
                                                  input: {
                                                    "&::placeholder": {
                                                      fontFamily: "Jost",
                                                    },
                                                  },
                                                  "& .MuiOutlinedInput-root": {
                                                    "&.Mui-focused fieldset": {
                                                      borderColor:
                                                        "rgba(0, 0, 0, 0.23)",
                                                    },
                                                    "& label.Mui-focused": {
                                                      borderColor:
                                                        "0.5px solid rgba(0, 0, 0, 0.23)",
                                                    },
                                                    "&:hover fieldset": {
                                                      borderColor:
                                                        "rgba(0, 0, 0, 0.23)",
                                                    },
                                                  },
                                                }}
                                              />
                                            </Grid>
                                            <Grid mt={2}>
                                              <InputLabel
                                                sx={{
                                                  fontFamily: "Jost",
                                                  fontWeight: "500",
                                                  color: "#222",
                                                }}
                                              >
                                                Image Upload
                                              </InputLabel>

                                              <TextField
                                                fullWidth
                                                type="file"
                                                multiple
                                                onChange={(event) => {
                                                  formikSetFieldValue(
                                                    "grievance_img",
                                                    event.currentTarget.files
                                                  );
                                                }}
                                                inputProps={{
                                                  multiple: true,
                                                  accept: "image/*",
                                                }}
                                                sx={{
                                                  mt: 0.5,
                                                  input: {
                                                    "&::placeholder": {
                                                      fontFamily: "Jost",
                                                    },
                                                    height: "unset",
                                                    padding: " 8.5px 14px",
                                                    background: "transparent",
                                                  },

                                                  "& .MuiOutlinedInput-root": {
                                                    "&.Mui-focused fieldset": {
                                                      borderColor:
                                                        "rgba(0, 0, 0, 0.23)",
                                                    },
                                                    "& label.Mui-focused": {
                                                      borderColor:
                                                        "0.5px solid rgba(0, 0, 0, 0.23)",
                                                    },
                                                    "&:hover fieldset": {
                                                      borderColor:
                                                        "rgba(0, 0, 0, 0.23)",
                                                    },
                                                  },
                                                }}
                                                placeholder="Image"
                                                margin="normal"
                                              />
                                            </Grid>
                                            {isSuccess && (
                                              <Typography
                                                sx={{
                                                  color: "green",
                                                  mt: 1.5,
                                                  fontFamily: "Jost",
                                                }}
                                              >
                                                Thank you for submiting your
                                                review. The review will be
                                                published once it is approved
                                                from our end.
                                              </Typography>
                                            )}
                                            <Grid mt={2.5}>
                                              <LoadingButton
                                                sx={{
                                                  background: "#f15a21",
                                                  width: 150,
                                                  color: "#fff",
                                                  boxShadow: "none",
                                                  "&:hover": {
                                                    backgroundColor: "#f15a21",
                                                    color: "#fff",
                                                    boxShadow: "none",
                                                  },
                                                  fontFamily: "Jost",
                                                }}
                                                type="submit"
                                                loading={isLoading}
                                                variant="contained"
                                              >
                                                SUBMIT
                                              </LoadingButton>
                                            </Grid>
                                          </Grid>
                                        </form>
                                      </DialogContent>
                                    </BootstrapDialog>
                                  </>
                                </Grid>
                                <Grid
                                  className="write_reviewBtn"
                                  item
                                  xs={12}
                                  sm={4}
                                  md={4}
                                  display="flex"
                                  alignItems="center"
                                  sx={{
                                    justifyContent: {
                                      xs: "center",
                                      sm: "flex-end",
                                    },
                                  }}
                                >
                                  <Button
                                    onClick={handleOpenReview}
                                    sx={{
                                      display: { xs: "block" },
                                      fontFamily: "Jost",
                                      fontWeight: "500",
                                      background: "#f15a21",
                                      borderRadius: "4px",
                                      width: { sm: "260px" },
                                      // maxWidth:'260px',
                                      ml: 2.5,
                                      marginTop: { xs: "15px", sm: 0 },
                                      fontSize: 16,
                                      padding: { sm: "14px 0px" },
                                      color: "White",
                                      "&:hover": {
                                        background: "#f15a21",
                                        color: "#fff",
                                      },
                                    }}
                                  >
                                    Write A Review
                                  </Button>
                                </Grid>
                              </Grid>
                            </Box>
                            {/* <Divider
                              className="gapping-revies"
                              sx={{
                                border: { xs: "none", md: "1px solid #D9D9D9" },
                                height: 230,
                              }}
                              orientation="horizontal"
                            /> */}
                          </Grid>

                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Typography
                              sx={{
                                mt: 2,
                                fontFamily: "Jost",
                                fontWeight: "500",
                                fontSize: 18,
                                color: "#222",
                              }}
                            >
                              Review images
                            </Typography>

                            <div
                              style={{
                                display: "flex",
                                // position: "relative",
                                flexWrap: "wrap",
                                borderBottom: "1px solid #e9e9e9",
                                paddingBottom: "30px",
                              }}
                            >
                              {reviewImages
                                ?.slice(0, 6)
                                ?.map((image, index) => (
                                  <div key={index}>
                                    {index === 5 && (
                                      <>
                                        <p
                                          onClick={handleFourthImageClick}
                                          className="more-image-text"
                                          style={{
                                            cursor: "pointer",
                                            position: "absolute",
                                            // fontWeight: "600",
                                            marginTop: 10,
                                            marginLeft: 4,
                                            fontSize: 25,
                                            zIndex: 1,
                                            color: "white",
                                            padding: "40px",
                                          }}
                                        >
                                          +{Math.max(residualCount)} More
                                        </p>
                                        <p
                                          onClick={handleFourthImageClick}
                                          className="more-image-text t-3"
                                          style={{
                                            cursor: "pointer",
                                            position: "absolute",

                                            fontSize: 25,
                                            marginLeft: 7,
                                            zIndex: 1,
                                            marginTop: 40,
                                            color: "white",
                                            padding: "45px",
                                          }}
                                        >
                                          Images
                                        </p>
                                      </>
                                    )}
                                    <img
                                      className="review-all-image"
                                      src={image}
                                      title="Reviews"
                                      alt={`Image ${index + 1}`}
                                      onClick={
                                        index === 5
                                          ? handleFourthImageClick
                                          : null
                                      }
                                      style={{
                                        cursor:
                                          index === 5 ? "pointer" : "auto",
                                        filter:
                                          index === 5
                                            ? "blur(0.9px) brightness(0.3) saturate(100%) invert(10%) sepia(10%) hue-rotate(0deg)"
                                            : "none",
                                      }}
                                    />
                                  </div>
                                ))}
                            </div>
                            <BootstrapDialog
                              fullScreen
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="customized-dialog-title"
                            >
                              {" "}
                              <BootstrapDialogTitle1
                                id="customized-dialog-title"
                                onClose={handleClose}
                              ></BootstrapDialogTitle1>
                              <ImageList
                                sx={{ width: "100%", flexWrap: "wrap" }}
                                className="coloum-grid-image"
                              >
                                {reviewImages?.map((index) => (
                                  <ImageListItem key={index}>
                                    <img
                                      className="imageList-height"
                                      src={index}
                                      title="User Reviews"
                                      loading="lazy"
                                      style={{
                                        objectFit: "cover",
                                      }}
                                    />
                                  </ImageListItem>
                                ))}
                              </ImageList>
                            </BootstrapDialog>
                            {records?.length > 0 ? (
                              records?.map((val) => (
                                <>
                                  <RatingCards
                                    name={val.full_name}
                                    boxStyle={{ border: "none", mt: 0 }}
                                    rating={
                                      <StyledRating
                                        size="small"
                                        name="half-rating-read"
                                        value={val.rating}
                                        precision={0.5}
                                        readOnly
                                        emptyIcon={
                                          <StarIcon
                                            style={{ opacity: 0.55 }}
                                            fontSize="inherit"
                                          />
                                        }
                                      />
                                    }
                                    image={val.review_images}
                                    comments={val.review}
                                    title="User Review"
                                  />
                                  <div
                                    className="border2"
                                    style={{ marginTop: 30 }}
                                  ></div>
                                </>
                              ))
                            ) : (
                              <Typography align="center">
                                There is no reviews for this product
                              </Typography>
                            )}
                            <Button
                              sx={{
                                fontFamily: "jost",
                                border: 1,
                                color: "#767676",
                                textTransform: "capitalize",
                                marginRight: 5,
                              }}
                              onClick={prePage}
                            >
                              <img
                                src={"/static/images/pre-arrow.svg"}
                                width={24}
                                style={{ paddingRight: 5 }}
                              />
                              Previous
                            </Button>
                            <Button
                              sx={{
                                fontFamily: "jost",
                                border: 1,
                                color: "#767676",
                                textTransform: "capitalize",
                              }}
                              onClick={nextPage}
                            >
                              Next
                              <img
                                src={"/static/images/next-arrow.svg"}
                                width={24}
                                style={{ paddingLeft: 5 }}
                              />
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </div>
                  ) : (
                    <></>
                  )}
                </section>
              </Grid>
              <Grid
                className="border2 review-sec-border"
                style={{ marginTop: 40, marginBottom: 70 }}
              ></Grid>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
});

export default Review;
