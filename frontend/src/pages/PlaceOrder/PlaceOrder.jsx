import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {

  const {getTotalCartAmount} = useContext(StoreContext)

  return (
    <form className='flex align-start justify-between gap-24 mt-20'>
      <div className='w-full '>
        <p className='text-xl font-semibold mb-4'>Delivery Information</p>
        <div className='flex gap-3'>
          <input className='mb-3 w-full p-3 border rounded outline-orange-600' type="text" placeholder='First Name'/>
          <input className='mb-3 w-full p-3 border rounded outline-orange-600' type="text" placeholder='Last Name'/>
        </div >
        <input className='mb-3 w-full p-3 border rounded outline-orange-600' type="text" placeholder='Email Address'/>
        <input className='mb-3 w-full p-3 border rounded outline-orange-600' type="text" placeholder='Country'/>
        <div className='flex gap-3'>
          <input className='mb-3 w-full p-3 border rounded outline-orange-600' type="text" placeholder='State'/>
          <input className='mb-3 w-full p-3 border rounded outline-orange-600' type="text" placeholder='City'/>
        </div>
        <div className='flex gap-3'>
          <input className='mb-3 w-full p-3 border rounded outline-orange-600' type="text" placeholder='Street'/>
          <input className='mb-3 w-full p-3 border rounded outline-orange-600' type="text" placeholder='Zip Code'/>
        </div>
        <input className='mb-3 w-full p-3 border rounded outline-orange-600' type="text" placeholder='Phone'/>
      </div>
      <div className='w-full'>
      <div className="flex-1 flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Cart Total</h2>
          <div>
            <div className="flex justify-between text-[#555]">
              <p>SubTotal</p>
              <p>Rs.{getTotalCartAmount()}</p>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between text-[#555]">
              <p>Delivery Fee</p>
              <p>Rs.{getTotalCartAmount()===0?0:150}</p>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between font-semibold">
              <p>Total</p>
              <p>Rs.{getTotalCartAmount()===0?0:getTotalCartAmount()+150}</p>
            </div>
          </div>
          <button className="text-white h-12 py-3 mt-6 w-full md:w-64 rounded-lg bg-orange-600">PROCEED TO Payment</button>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder