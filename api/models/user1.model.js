import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
      email: {
        type: String,
        required: true,
        unique: true,
      },
      name: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
     }, {timestamp: true}
);     


const User1 = mongoose.model("User1", userSchema);

export default User1;
