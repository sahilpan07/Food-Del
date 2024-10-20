import React,{useContext} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Icon } from "@iconify/react/dist/iconify.js";
import { StoreContext } from "../../context/StoreContext";

const ContactUs = () => {
  const { sendEmail } = useContext(StoreContext);
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    subject: "",
    message: "",
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    phone: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    subject: Yup.string().required("Required"),
    message: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const data = await sendEmail(values); 
      console.log(data); 
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const socialIcons = [
    {
      icon: "uil:facebook",
      label: "Facebook",
      hoverColor: "hover:text-blue-600",
    },
    {
      icon: "mdi:instagram",
      label: "Instagram",
      hoverColor: "hover:text-pink-500",
    },
    {
      icon: "prime:twitter",
      label: "Twitter",
      hoverColor: "hover:text-blue-600",
    },
    {
      icon: "mingcute:youtube-fill",
      label: "YouTube",
      hoverColor: "hover:text-red-600",
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen mx-12 md:mx-20">
      <div className="flex flex-col gap-8 w-full p-2 bg-white rounded-lg shadow-md md:p-6">
        <div>
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Contact Us
          </h1>
          <p className="text-sm text-gray-700 text-center">
            Any question or remarks? Just write us a message!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-between gap-10">
          <div className="flex flex-col h-auto w-full gap-4 bg-[#040A27] rounded-lg text-white p-4 justify-between">
            <div className="flex flex-col gap-2 items-center">
              <h1>Contact Information</h1>
              <p className="text-xs text-gray-300">
                Say something to start live chat
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center gap-2">
                <Icon icon="line-md:phone-call" />
                <p className="text-sm">+977 9876464732</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Icon icon="material-symbols:mail" />
                <p className="text-sm">info@yourdomain.com</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Icon icon="gridicons:location" />
                <p className="text-sm">Baneshwor,Kathmandu</p>
              </div>
            </div>
            <div className="flex gap-5 justify-center">
              {socialIcons.map(({ icon, label, hoverColor }, index) => (
                <div key={index} className="relative group">
                  <Icon
                    className={`text-xl text-neutral-400 ${hoverColor} cursor-pointer`}
                    icon={icon}
                  />
                  <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-black text-white text-sm p-1 rounded">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="mt-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:gap-4">
                    <div className="mb-4 w-full">
                      <label
                        htmlFor="first_name"
                        className="block text-gray-700"
                      >
                        First Name
                      </label>
                      <Field
                        type="text"
                        name="first_name"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="first_name"
                        component="div"
                        className="mt-1 text-red-600"
                      />
                    </div>
                    <div className="mb-4 w-full">
                      <label
                        htmlFor="last_name"
                        className="block text-gray-700"
                      >
                        Last Name
                      </label>
                      <Field
                        type="text"
                        name="last_name"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="last_name"
                        component="div"
                        className="mt-1 text-red-600"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="mt-1 text-red-600"
                    />
                  </div>
                  <div className="flex flex-col md:flex-row md:justify-between md:gap-4">
                    <div className="mb-4 w-full">
                      <label htmlFor="phone" className="block text-gray-700">
                        Phone no.
                      </label>
                      <Field
                        type="tel"
                        name="phone"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="mt-1 text-red-600"
                      />
                    </div>
                    <div className="mb-4 w-full">
                      <label htmlFor="address" className="block text-gray-700">
                        Address
                      </label>
                      <Field
                        type="text"
                        name="address"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="mt-1 text-red-600"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700">Subject</label>
                    <div className="flex  gap-4">
                      <label className="flex items-center text-sm">
                        <Field
                          type="radio"
                          name="subject"
                          value="general_inquiry"
                          className="mr-2"
                        />
                        General Inquiry
                      </label>
                      <label className="flex items-center text-sm">
                        <Field
                          type="radio"
                          name="subject"
                          value="order_inquiry"
                          className="mr-2"
                        />
                        Order Inquiry
                      </label>
                      <label className="flex items-center text-sm">
                        <Field
                          type="radio"
                          name="subject"
                          value="feedback"
                          className="mr-2"
                        />
                        Feedback
                      </label>
                    </div>
                    <ErrorMessage
                      name="subject"
                      component="div"
                      className="mt-1 text-red-600"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="message" className="block text-gray-700">
                      Message
                    </label>
                    <Field
                      as="textarea"
                      name="message"
                      rows="4"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      className="mt-1 text-red-600"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-56 p-2 py-2 bg-[#040A27] text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
