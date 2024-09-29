import React, { useEffect, useState } from 'react';

const OrderCount = () => {
  const data = [
    { label: 'Register Riders', value: 567 },
    { label: 'Orders Delivered', value: 854843 },
    { label: 'Restaurant Partners', value: 345 },
    { label: 'Food Items', value: 235 },
  ];

  const [counts, setCounts] = useState(data.map(item => ({ ...item, current: 0 })));

  useEffect(() => {
    const animateCount = (index, endValue, duration) => {
      let startValue = 0;
      const increment = Math.ceil(endValue / (duration / 50)); // Increase the count every 50ms

      const interval = setInterval(() => {
        startValue += increment;
        if (startValue >= endValue) {
          clearInterval(interval);
          setCounts(prevCounts => {
            const newCounts = [...prevCounts];
            newCounts[index].current = endValue;
            return newCounts;
          });
        } else {
          setCounts(prevCounts => {
            const newCounts = [...prevCounts];
            newCounts[index].current = startValue;
            return newCounts;
          });
        }
      }, 50);
    };

    counts.forEach((item, index) => {
      animateCount(index, item.value, 2000);
    });
  }, []);

  return (
    <div className='grid grid-cols-2 mx-12 md:mx-20 sm:grid-cols-4 gap-4 justify-around py-6 px-2 bg-[#040A27] text-white rounded-lg shadow-md'>
      {counts.map((item, index) => (
        <div key={index} className='text-center text-xs flex flex-col gap-3 lg:text-base font-semibold'>
          <p className=''>{item.current}+</p>
          <p className=''>{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderCount;
