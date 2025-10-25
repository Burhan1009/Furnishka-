import * as Yup from "yup";

const phoneRegExp =
  /^[\+]?[(]?^[6-9][0-9]{2}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/im;

export const signUpFormSchema = Yup.object().shape({
  full_name: Yup.string()
    .max(255)
    .required("The name field is required")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Name can only contain Latin letters."
    ),
  email: Yup.string()
    .email("The email provided should be a valid email address")
    .max(50)
    .required("The email field is required"),
  phone: Yup.string()
    .matches(phoneRegExp, "not valid format")
    .max(14)
    .min(10)
    .required("The phone no field is required"),
  password: Yup.string()
    .min(8, "Your password must be longer than 8 characters.")
    .max(25)
    .required("The passowrd field is required")
    .matches(/^(?=.{8,})/, "Must Contain 8 Characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])/,
      "Must Contain One Uppercase, One Lowercase"
    )
    .matches(/^(?=.*[!@#\$%\^&\*])/, "Must Contain One Special Case Character")
    .matches(/^(?=.{6,20}$)\D*\d/, "Must Contain One Number"),
});

export const loginFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("The email provided should be a valid email address")
    .max(50)
    .required("The email field is required"),

  password: Yup.string()
    .min(8, "Your password must be longer than 8 characters.")
    .required("The passowrd field is required"),
});

export const loginByNumberFormSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(phoneRegExp, "not valid format")
    .max(14)
    .min(10)
    .required("Phone number field is required"),
});
export const loginByNumberOTPSchema = Yup.object().shape({
  otp: Yup.string()
    .max(6, "Your OTP must not be longer than 6 digit.")
    .min(6, "Your OTP must be 6 digit.")
    .matches(/^[0-9]*$/, "Please enter only Numeric")
    .required("The OTP field is required"),
});

export const AddressFormSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(phoneRegExp, "not valid format")
    .max(14)
    .min(10)
    .required("Phone number field is required"),
  full_name: Yup.string()
    .required("Name field is required")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Name can only contain Latin letters."
    ),

  house_number: Yup.string().required("House no. field is required"),
  street: Yup.string().required("Society name field is required"),
  street_address: Yup.string().required("Street address field is required"),
  city: Yup.string()
    .required("City field is required")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "City can only contain Latin letters."
    ),
});

export const BussinessFormSchema = Yup.object().shape({
  gst: Yup.string().required("GST no. field is required"),
  company_name: Yup.string()
    .required("Name field is required")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Company Name can only contain Latin letters."
    ),

  Address: Yup.string().required("Address field is required"),
});

export const MyAccountFormchema = Yup.object().shape({
  // email: Yup.string()
  //   .email('Please enter valid email')
  //   .required('Email field is required'),
  phone: Yup.string()
    .matches(phoneRegExp, "Not valid format")
    .max(14)
    .min(10)
    .required("Phone number field is required"),
  full_name: Yup.string()
    .required("Name field is required")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Name can only contain Latin letters."
    ),
});

export const MyPasswordFormchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/^(?=.{8,})/, "Must Contain 8 Characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])/,
      "Must Contain One Uppercase, One Lowercase"
    )
    .matches(/^(?=.*[!@#\$%\^&\*])/, "Must Contain One Special Case Character")
    .matches(/^(?=.{6,20}$)\D*\d/, "Must Contain One Number"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const reviewSchema = Yup.object().shape({
  email: Yup.string()
    .email("The email provided should be a valid email address")
    .max(50)
    .required("The email field is required"),

  full_name: Yup.string()
    .required("The name field is required")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Name can only contain Latin letters."
    ),
  review: Yup.string().required("The review field is required"),
});

export const MyPBusinessFormchema = Yup.object().shape({
  gst: Yup.string().required("The GST field is required"),
  company_name: Yup.string().required(" Company name field is required"),
  company_address: Yup.string().required("Company Address field is required"),
});

export const MySupportFormchema = Yup.object().shape({
  order_id: Yup.string().required("Order Id field is required"),

  message: Yup.string().required("Message field is required"),
  // grievance_img:Yup.mixed().required('A file is required')
  // .test('fileFormat', 'PDF only', (value) => {

  // }),
});

export const MyContactUsFormchema = Yup.object().shape({
  email: Yup.string()
    .email("The email provided should be a valid email address")
    .max(50)
    .required("The email field is required"),
  enquiry: Yup.string().required(" Enquiry field is required"),
  full_name: Yup.string()
    .required("The name field is required")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Name can only contain Latin letters."
    ),
  phone: Yup.string()
    .matches(phoneRegExp, "not valid format")
    .max(14)
    .min(10)
    .required("Phone number field is required"),
});

export const MyFeedbackFormchema = Yup.object().shape({
  // feedback_img: "",
  full_name: Yup.string()
    .required("The name field is required")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Name can only contain Latin letters."
    ),
  email: Yup.string()
    .email("The email provided should be a valid email address")
    .max(50)
    .required("The email field is required"),
  phone: Yup.string()
    .matches(phoneRegExp, "not valid format")
    .max(14)
    .min(10)
    .required("Phone number field is required"),
  reason: Yup.string().required(" Reason field is required"),
  comment: Yup.string().required(" Comment field is required"),
});

export const CustomFurnitureFormchema = Yup.object().shape({
  full_name: Yup.string()
    .required("The name field is required")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Name can only contain Latin letters."
    ),
  email: Yup.string()
    .email("The email provided should be a valid email address")
    .max(50)
    .required("The email field is required"),
  phone: Yup.string()
    .matches(phoneRegExp, "not valid format")
    .max(14)
    .min(10)
    .required("Phone number field is required"),
  pincode: Yup.string()
    .required("Postal code field is required")
    .matches(/^\d{6}(?:[-\s]\d{5})?$/, "Zip code is invalid"),
  descriptions: Yup.string().required(" Comment field is required"),
  city: Yup.string()
    .required("City field is required")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "City can only contain Latin letters."
    ),
});
