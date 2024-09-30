import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount,url } = useContext(StoreContext);
  
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col gap-20 mx-12 md:mx-20 mt-12">
      <div className="cart-items ">
        <div className="grid grid-cols-6 items-center text-gray-500 text-xs md:text-base" style={{ gridTemplateColumns: '1fr 1.5fr 1fr 1fr 1fr 1fr' }}>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div className="flex flex-col gap-3 mt-3">
                <div className="grid grid-cols-6 items-center text-xs md:text-base" style={{ gridTemplateColumns: '1fr 1.5fr 1fr 1fr 1fr 1fr' }}>
                  <img className="w-10 md:w-20 rounded-3xl sm: w-10" src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>Rs.{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>Rs.{item.price * cartItems[item._id]}</p>
                  <p onClick={()=>removeFromCart(item._id)} className="cursor-pointer text-red-500 text-lg pl-4">x</p>
                </div>
                <hr className="pb-3"/>
              </div>
            );
          }
        })}
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-20">
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
          <button onClick={()=>{navigate('/order')}} className="text-white h-12 py-3 w-full md:w-64 rounded-lg bg-violet-900">PROCEED TO CHECKOUT</button>
        </div>
        <div className="flex-1">
          <div className="flex flex-col gap-5">
            <p className="text-[#555]">If you have a promocode, enter it here</p>
            <div className="flex  items-center bg-slate-200 rounded">
              <input className="bg-transparent p-2 border-0 outline-0 flex-1" type="text" placeholder="promo code" />
              <button className=" w-48 p-2 bg-black text-white rounded">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
