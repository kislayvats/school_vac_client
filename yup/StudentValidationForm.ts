import * as Yup from "yup";

export const StudentValidationFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .required("Name is required"),
  mobile_number: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  class: Yup.string().required("Class is required"),
});
