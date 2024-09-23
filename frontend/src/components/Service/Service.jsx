import React from 'react'
import { assets } from '../../assets/assets'

const Service = () => {
  return (
    <div className='pl-5 pr-5 flex flex-col gap-8'>
        <div className='flex flex-col gap-3 items-center'>
            <p className='text-red-400'>What we Serve</p>
            <p className='text-3xl font-bold'>Your Favorite Food</p>
            <p className='text-3xl font-bold'>Delivery Partner</p>
        </div>
        <div className='flex justify-between'>
            <div className='w-72 items-center flex flex-col gap-2 border border-grey-400'>
                <img className='w-48' src={assets.body_1} alt="" />
                <p className='text-lg font-bold'>Easy To Order</p>
                <p className='text-center'>Order your favorite food with just a few clicks</p>
            </div>
            <div className='w-72 items-center flex flex-col gap-2 border border-grey-400'>
                <img className='w-48' src={assets.body_2} alt="" />
                <p>Fast Delivery</p>
                <p className='w-48'>Delivery that is always ontime even faster</p>
            </div>
            <div className='w-72 items-center flex flex-col gap-2 border border-grey-400'>
                <img  className='w-48' src={assets.body_3} alt="" />
                <p >Best Quality</p>
                <p className='w-48'>Not only fast for us quality is also number one</p>
            </div>
        </div>
    </div>
  )
}

export default Service