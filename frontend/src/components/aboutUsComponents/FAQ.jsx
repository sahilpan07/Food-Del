import React, { useState } from 'react';
import { assets } from '../../assets/assets';

const FAQ = () => {
  const faqs = [
    {
      question: "How do I place an order?",
      answer: "To place an order, simply browse our menu, select your items, and proceed to checkout."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept various payment methods including credit cards, debit cards, and PayPal."
    },
    {
      question: "Can I cancel my order?",
      answer: "Yes, you can cancel your order within 10 minutes of placing it."
    },
    {
      question: "How do I track my order?",
      answer: "You can track your order status through the 'My Orders' section of your account."
    },
    {
      question: "What should I do if my order is late?",
      answer: "If your order is late, please contact our support team for assistance."
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className='flex lg:gap-20 justify-center mx-12 md:mx-20'>
      <div className='w-full lg:w-1/2'>
        <h2 className=' text-md font-bold mb-4 lg:text-xl'>Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} className='mb-2'>
            <div 
              className='cursor-pointer flex justify-between items-center p-2 border-b' 
              onClick={() => toggleFAQ(index)}
            >
              <h3 className='font-semibold text-xs lg:text-base'>{faq.question}</h3>
              <span className='text-sm '>{expandedIndex === index ? '-' : '+'}</span>
            </div>
            {expandedIndex === index && (
              <p className='pl-4 text-xs lg:text-md'>{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
      <div>
        <img className='w-96 hidden lg:block' src={assets.faq} alt="FAQ illustration" />
      </div>
    </div>
  );
};

export default FAQ;
