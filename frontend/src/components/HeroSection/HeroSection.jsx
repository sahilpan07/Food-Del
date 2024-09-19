import React from 'react'
import './HeroSection.css'

const HeroSection = () => {
  return (
    <div className='flex felx-col items-center bg-gray-50 min-h-96'> {/* headersection */}
      <div className='container mx-auto flex flex-col md:flex-row items-center justify-between p-6 mt-0 ml-6'> {/*text section */}
        <div className='md:w-1/2 text-center md:text-left'>
          <h1 className='text-4xl font-bold text-gray-900 font-sans'>
            Premium <span className='text-orange-500'>quality</span><br />
            Food for your <span className='atext-orange-500'>healthy</span><br />
            <span className='text-orange-500'>& Daily life</span>
          </h1>
          <p classname='mt-5 text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil explicabo blanditiis voluptates ex, delectus distinctio expedita!
            Laborum vitae eum fugit earum dolore alias placeat molestiae non, odio autem corporis modi?
          </p>

        </div>

      </div>


    </div>
  )
}

export default HeroSection