import * as Yup from "yup";

const ContactValSchema = Yup.object({
    first_name: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name can't be more than 50 characters")
      .matches(/^[A-Za-z]+$/, "First name can only contain letters")
      .required("First name is required"),
  
    last_name: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name can't be more than 50 characters")
      .matches(/^[A-Za-z]+$/, "Last name can only contain letters")
      .required("Last name is required"),
  
    contact_email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  
    phone: Yup.string()
      .matches(
        /^[0-9]{10,15}$/,
        "Phone number must be between 10 and 15 digits"
      )
      .required("Phone number is required"),
  
    address: Yup.string()
      .max(100, "Address can't be more than 100 characters")
      .required("Address is required"),
  
    subject: Yup.string()
      .required("Subject is required"),
  
    message: Yup.string()
      .min(10, "Message must be at least 10 characters")
      .max(500, "Message can't be more than 500 characters")
      .required("Message is required"),
  });
  export default ContactValSchema;