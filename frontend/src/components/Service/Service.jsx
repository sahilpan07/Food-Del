import React from 'react';
import { assets } from '../../assets/assets';

const Service = () => {
  const services = [
    {
      image: assets.body_1,
      title: 'Easy To Order',
      description: 'Order your favorite food with just a few clicks',
    },
    {
      image: assets.body_2,
      title: 'Fast Delivery',
      description: 'Delivery that is always on time, even faster',
    },
    {
      image: assets.body_3,
      title: 'Best Quality',
      description: 'Not only fast, for us quality is also number one',
    },
  ];

  return (
    <div className='pl-5 pr-5 flex flex-col gap-10 bg-gray-50 py-10'>
      <div className='flex flex-col gap-3 items-center'>
        <p className='text-red-600 text-lg font-semibold'>What we Serve</p>
        <h2 className='text-4xl font-bold text-gray-800'>Your Favorite Food</h2>
        <h2 className='text-4xl font-bold text-gray-800'>Delivery Partner</h2>
      </div>
      <div className='flex flex-wrap justify-center gap-5'>
        {services.map((service, index) => (
          <div
            key={index}
            className='w-full sm:w-80 items-center flex flex-col gap-2 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 bg-white'
          >
            <img className='w-48  object-cover rounded-md' src={service.image} alt={service.title} />
            <p className='text-lg font-semibold text-gray-800 text-center'>{service.title}</p>
            <p className='text-gray-600 text-center'>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
