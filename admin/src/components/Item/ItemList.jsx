import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ItemList = ({url}) => {
  const [list, setList] = useState([]);

  
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  }

  //remove from list
  const removeFood = async(foodId) =>{
    //api call
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId})   
    await fetchList(); 
    if(response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error("Error")
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col w-4/5 mx-auto mt-5 p-5 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4">All Food List</h2>
      <div className="list-table mb-5">
        <div className="hidden  md:grid md:grid-cols-5 items-center gap-3 p-4 border-b border-gray-300 text-lg bg-gray-100 rounded-lg shadow-sm ">
          <p className="font-bold">Image</p>
          <p className="font-bold">Name</p>
          <p className="font-bold">Category</p>
          <p className="font-bold">Price</p>
          <p className="font-bold">Action</p>
        </div>
        {list.map((item, index) => {
          return (
            <div
              key={index}
              className=" grid grid-cols-3 sm:grid sm:grid-cols-5 items-center gap-3 p-4 border-b border-gray-300 hover:bg-gray-50 transition-colors duration-200 rounded-lg"
            >
              <img
                src={`${url}/images/${item.image}`}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md shadow-sm"
              />
              <p className="text-gray-800 ">{item.name}</p>
              <p className="text-gray-600">{item.category}</p>
              <p className="text-gray-600">${item.price}</p>
              <div className="">
                <p onClick={()=>removeFood(item._id)} className="cursor-pointer text-red-500 hover:text-red-700 focus:outline-none">
                  Delete
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemList;
