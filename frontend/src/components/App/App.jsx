import React from 'react';
import { assets } from '../../assets/assets';

const App = () => {
  return (
    <div className="text-center mt-24 mx-auto">
      <p className="text-3xl md:text-5xl font-medium mb-10">
        Feel Better Experience Download <br /> Cheif Food App
      </p>
      <div className="flex justify-center gap-8 mt-10">
        <img
          src={assets.play_store}
          alt="Download on Google Play"
          className="w-28 md:w-32 transition-transform duration-500 cursor-pointer hover:scale-105"
        />
        <img
          src={assets.app_store}
          alt="Download on the App Store"
          className="w-28 md:w-32 transition-transform duration-500 cursor-pointer hover:scale-105"
        />
      </div>
    </div>
  );
}

export default App;
