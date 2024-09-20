import React, { useContext, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const PlaceOrder = () => {

  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext)

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",
  })

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+150,
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    if (response.data.success) {
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Failed to place order");
    }
    
  }

  return (
    <form onSubmit={placeOrder} className='flex align-start justify-between gap-24 mt-20'>
      <div className='w-full '>
        <p className='text-xl font-semibold mb-4'>Delivery Information</p>
        <div className='flex gap-3'>
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} className='mb-3 w-full p-3 border rounded outline-orange-600' type="text" placeholder='First Name'/>
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} className='mb-3 w-full p-3 border rounded outline-orange-600' type="text" placeholder='Last Name'/>
        </div >
        <input required name='email' onChange={onChangeHandler} value={data.email} className='mb-3 w-full p-3 border rounded outline-orange-600' type="text" placeholder='Email Address'/>
        <input required name='country' onChange={onChangeHandler} value={data.country} className='mb-3 w-full p-3 border rounded outline-orange-600' type="text" placeholder='Country'/>
        <div className='flex gap-3'>
          <input required name='state' onChange={onChangeHandler} value={data.state} className='mb-3 w-full p-3 border rounded outline-orange-600' type="text" placeholder='State'/>
          <input required name='city' onChange={onChangeHandler} value={data.city} className='mb-3 w-full p-3 border rounded outline-orange-600' type="text" placeholder='City'/>
        </div>
        <div className='flex gap-3'>
          <input required name='street' onChange={onChangeHandler} value={data.street} className='mb-3 w-full p-3 border rounded outline-orange-600' type="text" placeholder='Street'/>
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} className='mb-3 w-full p-3 border rounded outline-orange-600' type="text" placeholder='Zip Code'/>
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} className='mb-3 w-full p-3 border rounded outline-orange-600' type="text" placeholder='Phone'/>
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
          <button type='submit' className="text-white h-12 py-3 mt-6 w-full md:w-64 rounded-lg bg-orange-600">PROCEED TO Payment</button>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder