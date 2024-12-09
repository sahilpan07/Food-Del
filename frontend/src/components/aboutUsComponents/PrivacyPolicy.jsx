import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  const accordionData = [
    {
      question: "What data do we collect?",
      answer:
        "We collect personal information such as your name, email, and browsing behavior to improve services.",
    },
    {
      question: "How do we protect your data?",
      answer:
        "We use encryption, firewalls, and other measures to ensure the safety of your data.",
    },
    {
      question: "Do we share your data with third parties?",
      answer:
        "We do not share your personal data with third parties unless required by law.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="mx-12 md:mx-20 min-h-screen py-10">
      <div className=" mx-auto bg-white shadow-lg rounded-xl p-10">
        <div className="flex items-center gap-4 mb-8">
          <Icon icon="mdi:lock" className="text-blue-600 text-4xl" />
          <h1 className="text-3xl font-bold text-gray-800">Privacy Policy</h1>
        </div>

        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
          Learn about how we handle your personal information securely and
          responsibly.
        </p>

        <div className="space-y-6">
          {accordionData.map((item, index) => (
            <div key={index} className="border rounded-lg shadow-sm">
              <button
                className="w-full text-left flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100"
                onClick={() => toggleAccordion(index)}
              >
                <span className="font-semibold text-gray-800">
                  {item.question}
                </span>
                <Icon
                  icon="mdi:chevron-down"
                  className={`text-xl ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeIndex === index && (
                <div className="px-4 py-3 text-gray-600">{item.answer}</div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 bg-blue-100 border-l-4 border-blue-500 p-6 rounded-lg shadow-md">
          <div className="flex items-start gap-4">
            <Icon icon="mdi:email-outline" className="text-blue-500 text-3xl" />
            <div>
              <h2 className="text-xl font-bold text-blue-800">
                Need Assistance?
              </h2>
              <p className="text-blue-600">
                Reach out to our support team for privacy-related concerns.
              </p>
              <button
                onClick={() => {
                  navigate("/contact");
                }}
                className="bg-[#040A27] text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 bg-[#040A27] text-white py-8 text-center">
        <h2 className="text-2xl font-bold mb-2">
          Stay Updated on Privacy Changes
        </h2>
        <p className="mb-4">
          Subscribe to our updates to know how we are improving data security.
        </p>
        <button className="bg-blue-800 hover:bg-blue-900 py-3 px-6 rounded-lg shadow">
          Subscribe Now
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
