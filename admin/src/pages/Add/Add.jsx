import React, { useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({url}) => {
  const [image, setImage] = useState(false);
  const [data,setData] = useState({
    name:"",
    description:"",
    price:"",
    category:"Salad",
  })
  //handel updatede data
  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }
  //Api call
  const onSubmitHandler = async (event) => {
    //prevent page reload
    event.preventDefault();
    const formData = new FormData();
    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("price",Number(data.price))
    formData.append("category",data.category)
    formData.append("image",image)
    //api call
    const response = await axios.post(`${url}/api/food/add`,formData) //formdata wil be send
    if(response.data.success){
      setData({
        name:"",
        description:"",
        price:"",
        category:"Salad",
      })
      setImage(false)
      toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message)
    }
  }

  return (
    <div className="max-w-4xl mb-20 mx-auto mt-12 p-8 bg-gradient-to-r from-blue-50 to-white shadow-xl rounded-2xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Add New Product</h2>
      <form className="space-y-6" onSubmit={onSubmitHandler}>
        <div className="flex flex-col">
          <label htmlFor="image" className="mb-2 font-semibold text-gray-700">Upload Image</label>
          <div className="flex items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-xl cursor-pointer hover:bg-gray-200 transition">
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              className="hidden"
              accept="image/*"
              required
            />
            <label htmlFor="image" className="flex flex-col items-center">
              <img
                className="w-28"
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="Upload Area"
              />
              <span className="text-gray-500 mt-2">{image ? image.name : "Click to upload an image"}</span>
            </label>
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 font-semibold text-gray-700">Product Name</label>
          <input
            className="p-4 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type Here"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="mb-2 font-semibold text-gray-700">Product Description</label>
          <textarea
            className="p-4 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
        </div>

        <div className="flex gap-8">
          <div className="flex flex-col w-1/2">
            <label htmlFor="category" className="mb-2 font-semibold text-gray-700">Product Category</label>
            <select onChange={onChangeHandler} className="p-4 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition" name="category" required>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="flex flex-col w-1/2">
            <label htmlFor="price" className="mb-2 font-semibold text-gray-700">Product Price</label>
            <input
              className="p-4 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="Rs.100"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-4 bg-orange-600 text-white font-bold rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
