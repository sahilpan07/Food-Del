import * as Yup from 'yup';

const RiderValSchema = Yup.object().shape({
  rider_name: Yup.string()
    .required('Rider name is required')
    .min(3, 'Rider name must be at least 3 characters long')
    .max(50, 'Rider name can be at most 50 characters long'),

  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),

  phone: Yup.string()
    .matches(
      /^[0-9]{10}$/,
      'Phone number must be exactly 10 digits'
    )
    .required('Phone number is required'),

  address: Yup.string()
    .required('Address is required')
    .min(10, 'Address must be at least 10 characters long')
    .max(100, 'Address can be at most 100 characters long'),

  vehicle_type: Yup.string()
    .optional()
    .min(3, 'Vehicle type must be at least 3 characters long')
    .max(30, 'Vehicle type can be at most 30 characters long'),

  vehicle_number: Yup.string()
    .optional(),


  description: Yup.string()
    .optional()
    .max(500, 'Description can be at most 500 characters long'),

});

export default RiderValSchema;
