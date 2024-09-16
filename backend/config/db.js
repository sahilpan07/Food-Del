import mongoose from "mongoose";


export const connectDb = async () => {
    await mongoose.connect('mongodb+srv://food-del:food-del@cluster0.yeya8.mongodb.net/food-del').then(()=>console.log("Db Comnnected"));
}