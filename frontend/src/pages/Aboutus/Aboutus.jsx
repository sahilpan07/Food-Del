import React, { useState } from 'react';
import FAQ from '../../components/aboutUsComponents/FAQ';
import CompanyDetail from '../../components/aboutUsComponents/CompanyDetail';
import Partner from '../../components/aboutUsComponents/OrderStep';
import HelpSupport from '../../components/aboutUsComponents/HelpSupport';
import OrderStep from '../../components/aboutUsComponents/OrderStep';
import OrderCount from '../../components/aboutUsComponents/OrderCount';

const Aboutus = () => {
  const [activeSection, setActiveSection] = useState('faq');

  const renderContent = () => {
    switch (activeSection) {
      case 'faq':
        return <FAQ />;
      case 'whoWeAre':
        return <CompanyDetail />;
      case 'partnerProgram':
        return <OrderStep/>;
      case 'helpSupport':
        return <HelpSupport />;
      default:
        return null;
    }
  };

  const getButtonClass = (section) => {
    return `
      rounded-3xl text-xs sm:text-sm lg:text-md
      ${activeSection === section ? 'text-violet-800' : 'hover:text-violet-600'} 
      font-semibold cursor-pointer text-sm
    `;
  };

  return (
    <div className='flex flex-col gap-12  mt-12 '>
      <div className='flex flex-col mx-12 md:mx-20 lg:items-center lg:flex-row lg:justify-between '>
        <h1 className='text-lg lg:text-2xl  font-bold justify-items-start'>Know More About Us!</h1>
        <div className='grid grid-cols-2 gap-2 sm:grid-cols-4  justify-between lg:gap-4 mt-4'>
          <p onClick={() => setActiveSection('faq')} className={getButtonClass('faq')}>
            Frequent Questions
          </p>
          <p onClick={() => setActiveSection('whoWeAre')} className={getButtonClass('whoWeAre')}>
            Who We Are?
          </p>
          <p onClick={() => setActiveSection('partnerProgram')} className={getButtonClass('partnerProgram')}>
            How to Order?
          </p>
          <p onClick={() => setActiveSection('helpSupport')} className={getButtonClass('helpSupport')}>
            Help & Support
          </p>
        </div>
      </div>
      <div className=' border p-0 sm:p-4'>
        {renderContent()}
      </div>
      <OrderCount/>
    </div>
  );
};

export default Aboutus;
