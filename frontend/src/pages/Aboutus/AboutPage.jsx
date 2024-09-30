import React from 'react';
import OrderCount from '../../components/aboutUsComponents/OrderCount';
import AboutUs from '../../components/aboutUsComponents/AboutUs';

const AboutPage = () => {

  return (
    <div className='flex flex-col gap-16 mt-12'>
      <AboutUs/>
      <OrderCount/>
    </div>
  );
};

export default AboutPage;
