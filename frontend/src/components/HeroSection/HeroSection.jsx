import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';

const HeroSection = () => {
  const images = [assets.home_1, assets.home_2, assets.home_3];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change the current image 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 5000);

    return () => clearInterval(interval); // 
  }, [images.length]);

  return (
    <div className='flex flex-col mx-20 items-center min-h-96 mt-12'>
      {/* Header section */}
      <div className='container mx-auto flex flex-col md:flex-row items-center justify-between'>
        {/* Text section */}
        <div className='md:w-1/2 text-center md:text-left'>
          <h1 className='text-4xl font-bold text-gray-900 font-sans'>
            Premium <span className='text-orange-500'>quality</span><br />
            Food for your <span className='text-orange-500'>healthy</span><br />
            <span className='text-orange-500'>& Daily life</span>
          </h1>
          <p className='pt-1 mt-3 text-gray-500'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil explicabo blanditiis voluptates ex, delectus distinctio expedita!
            Laborum vitae eum fugit earum dolore alias placeat molestiae non, odio autem corporis modi?
          </p>

          <div className='mt-6 flex items-center justify-center md:justify-start'>
            <input type='text' placeholder='Enter your delivery location' className='p-3 rounded-l-md border border-gray-300 w-full md:w-96' />
            <button className='p-3 ml-5 bg-black text-white rounded-r-md'>Get Started</button>
          </div>
        </div>

        {/* Image slider section */}
        <div className='md:w-1/2 mt-8 md:mt-0'>
          <div className='relative w-full h-96 overflow-hidden'>
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
              >
                <img src={image} alt={`Slide ${index}`} className='w-full h-full object-cover rounded-md shadow-md' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
