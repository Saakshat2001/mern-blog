import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
      product: {
        type: String,
        required: true,
        unique: false,
      },
      brand: {
        type: String,
        required: true,
      },
      modelNumber: {
        type: String,
        required: false,
      },
      comments: {
        type: String,
        required: false,
      },
      dealer: {
        type: String,
        required: true,
      },
      dealerContactNumber: {
        type: String,
        required: true,
      },
      purchaseDate: {
        type: String,
        required: true,
      },
      warrantyEndDate: {
        type: String,
        required: true,
      },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
     }, {timestamp: true}
);     


const Product = mongoose.model("Product", productSchema);

export default Product;
