import React, { useState } from 'react';
import FAQ from '../../components/aboutUsComponents/FAQ';
import CompanyDetail from '../../components/aboutUsComponents/CompanyDetail';
import Partner from '../../components/aboutUsComponents/Partner';
import HelpSupport from '../../components/aboutUsComponents/HelpSupport';

const Aboutus = () => {
  const [activeSection, setActiveSection] = useState('faq');

  const renderContent = () => {
    switch (activeSection) {
      case 'faq':
        return <div className="mt-4 "><FAQ/></div>;
      case 'whoWeAre':
        return <div className="mt-4 "><CompanyDetail/></div>;
      case 'partnerProgram':
        return <div className="mt-4 "><Partner/></div>;
      case 'helpSupport':
        return <div className="mt-4 "><HelpSupport/></div>;
      default:
        return null;
    }
  };

  const getButtonClass = (section) => {
    return `
       p-3 rounded-3xl 
      ${activeSection === section ? 'bg-violet-500' : ' hover:bg-blue-700'} 
       font-semibold cursor-pointer
    `;
  };

  return (
    <div className='flex flex-col mx-20 items-center'>
      <div className='flex p-12  items-center'>
        <p className='text-xl font-bold'>Know more about us!</p>
        <div className='flex gap-6 items-center'>
          <p 
            onClick={() => setActiveSection('faq')} 
            className={getButtonClass('faq')}
          >
            Frequent Questions
          </p>
          <p 
            onClick={() => setActiveSection('whoWeAre')} 
            className={getButtonClass('whoWeAre')}
          >
            Who we are?
          </p>
          <p 
            onClick={() => setActiveSection('partnerProgram')} 
            className={getButtonClass('partnerProgram')}
          >
            Partner Program
          </p>
          <p 
            onClick={() => setActiveSection('helpSupport')} 
            className={getButtonClass('helpSupport')}
          >
            Help & Support
          </p>
        </div>
      </div>
      <div className= 'w-11/12 border border-black'>
        {renderContent()}
      </div>
      
    </div>
  );
};

export default Aboutus;
