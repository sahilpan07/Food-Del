import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Icon } from "@iconify/react/dist/iconify.js";
import { StoreContext } from "../../context/StoreContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactValSchema from "../../validationSchema/ContactValidation";

const ContactUs = () => {
  const { sendEmail } = useContext(StoreContext);
  const [isSent, setIsSent] = useState(false);
  const initialValues = {
    first_name: "",
    last_name: "",
    contact_email: "",
    phone: "",
    address: "",
    subject: "",
    message: "",
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
    contact_email: Yup.string()
      .email("Invalid email address")
      .required("Required"),
    phone: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    subject: Yup.string().required("Required"),
    message: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const data = await sendEmail(values);
      toast.success(data.message);
      setIsSent(true);
    } catch (error) {
      toast.error(error.message || "Error sending email");
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
    <div className="flex items-center justify-center min-h-screen mx-12 md:mx-20 bg-gradient-to-r from-blue-50 to-white">
      <ToastContainer />
      <div className="flex flex-col gap-8 w-full p-6 bg-white rounded-lg shadow-xl md:p-8 ">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600">
            Get in touch with us for any inquiries or assistance. We're here to
            help!
          </p>
          <div className="mt-4 text-gray-600">
            <p>
              If you have any questions, feel free to drop us a message. Our
              team will get back to you shortly.
            </p>
            <p>
              We value your feedback and strive to improve our services with
              your help.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between gap-10">
          <div className="flex flex-col h-auto w-full gap-6 bg-[#040A27] rounded-lg text-white p-6 shadow-lg">
            <div className="flex flex-col gap-4 items-center">
              <h2 className="text-2xl font-semibold">Contact Information</h2>
              <p className="text-sm text-gray-300">
                Say something to start live chat
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-4">
                <Icon
                  icon="line-md:phone-call"
                  className="text-2xl hover:text-gray-200 transition-all duration-300"
                />
                <p className="text-sm">+977 9876464732</p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <Icon
                  icon="material-symbols:mail"
                  className="text-2xl hover:text-gray-200 transition-all duration-300"
                />
                <p className="text-sm">info@yourdomain.com</p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <Icon
                  icon="gridicons:location"
                  className="text-2xl hover:text-gray-200 transition-all duration-300"
                />
                <p className="text-sm">Baneshwor, Kathmandu</p>
              </div>
            </div>
            <div className="flex gap-8 justify-center mt-4">
              {socialIcons.map(({ icon, label, hoverColor }, index) => (
                <div key={index} className="relative group">
                  <Icon
                    className={`text-3xl text-neutral-400 ${hoverColor} cursor-pointer transition-all duration-300`}
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
              validationSchema={ContactValSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="mt-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:gap-4">
                    <div className="mb-6 w-full">
                      <label
                        htmlFor="first_name"
                        className="block text-gray-700 text-lg font-medium"
                      >
                        First Name
                      </label>
                      <Field
                        type="text"
                        name="first_name"
                        className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                      <ErrorMessage
                        name="first_name"
                        component="div"
                        className="mt-1 text-red-600"
                      />
                    </div>
                    <div className="mb-6 w-full">
                      <label
                        htmlFor="last_name"
                        className="block text-gray-700 text-lg font-medium"
                      >
                        Last Name
                      </label>
                      <Field
                        type="text"
                        name="last_name"
                        className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                      <ErrorMessage
                        name="last_name"
                        component="div"
                        className="mt-1 text-red-600"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="contact_email"
                      className="block text-gray-700 text-lg font-medium"
                    >
                      Email
                    </label>
                    <Field
                      type="email"
                      name="contact_email"
                      className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <ErrorMessage
                      name="contact_email"
                      component="div"
                      className="mt-1 text-red-600"
                    />
                  </div>

                  <div className="flex flex-col md:flex-row md:justify-between md:gap-4">
                    <div className="mb-6 w-full">
                      <label
                        htmlFor="phone"
                        className="block text-gray-700 text-lg font-medium"
                      >
                        Phone no.
                      </label>
                      <Field
                        type="tel"
                        name="phone"
                        className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="mt-1 text-red-600"
                      />
                    </div>
                    <div className="mb-6 w-full">
                      <label
                        htmlFor="address"
                        className="block text-gray-700 text-lg font-medium"
                      >
                        Address
                      </label>
                      <Field
                        type="text"
                        name="address"
                        className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="mt-1 text-red-600"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 text-lg font-medium">
                      Subject
                    </label>
                    <div className="flex gap-4">
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
                          value="customer_support"
                          className="mr-2"
                        />
                        Customer Support
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
                      <label className="flex items-center text-sm">
                        <Field
                          type="radio"
                          name="subject"
                          value="other"
                          className="mr-2"
                        />
                        Others
                      </label>
                    </div>
                    <ErrorMessage
                      name="subject"
                      component="div"
                      className="mt-1 text-red-600"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-gray-700 text-lg font-medium"
                    >
                      Message
                    </label>
                    <Field
                      as="textarea"
                      name="message"
                      className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      className="mt-1 text-red-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full p-4 bg-blue-600 text-white rounded font-medium text-lg disabled:opacity-50 hover:bg-blue-700 transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Submit"}
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
