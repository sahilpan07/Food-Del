import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: false }
}, { timestamps: true });


const categoryModel = mongoose.models.category || mongoose.model("category",categorySchema)

<<<<<<< HEAD
export default categoryModel;
=======
export default categoryModel;
>>>>>>> f1594920f26d79959b5c66f683bfc4644b48e11e
