import * as Yup from "yup";

const RestaurantValSchema = Yup.object({
    restaurant_name: Yup.string()
      .min(3, "Restaurant name must be at least 3 characters")
      .max(50, "Restaurant name must be 50 characters or less")
      .required("Restaurant name is required"),
    owner_name: Yup.string()
      .min(3, "Owner name must be at least 3 characters")
      .max(50, "Owner name must be 50 characters or less")
      .required("Owner name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must be 15 digits or less")
      .required("Phone number is required"),
    address: Yup.string()
      .min(5, "Address must be at least 5 characters")
      .max(100, "Address must be 100 characters or less")
      .required("Address is required"),
    description: Yup.string()
      .min(10, "Description must be at least 10 characters")
      .max(200, "Description must be 200 characters or less")
      .required("Description is required"),
    license_number: Yup.string()
      .matches(/^[A-Za-z0-9]+$/, "License number must be alphanumeric")
      .required("License number is required"),
    tax_id: Yup.string()
      .matches(/^[A-Za-z0-9]+$/, "Tax ID must be alphanumeric")
      .required("Tax ID is required"),
    restaurant_type: Yup.string()
      .required("Restaurant type is required"),
    operational_hours: Yup.string()
    .matches(
        /^([1-9]|1[0-2])([ap]m)-([1-9]|1[0-2])([ap]m)$/,
        "Operational hours must be in the format H(am/pm) - H(am/pm) or HH(am/pm) - HH(am/pm)"
      )
      .required("Operational hours are required"),
    website: Yup.string()
      .url("Invalid URL")
      .nullable(),
    address: Yup.string()
      .required("Address Required"),

  });
  export default RestaurantValSchema;