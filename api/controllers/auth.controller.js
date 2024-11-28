import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import Product from "../models/product.model.js";
import User1 from "../models/user.model.js";

export const signup = async (req, res, next) => {
  const {  email,name ,password } = req.body;
  if (
    !name ||
    !email ||
    !password 
  ) {
    // return res.status(400).json({message : 'All fields are required'});
    return next(errorHandler(400, "All fields are required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  
  const newUser = new User1({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.json("SignUp successful");
  } catch (err) {
    next(err);
  }
  return 1;
};

export const signin = async (req, res, next) => {
  console.log('---------============= >>>> ', req);
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    //password comparision
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }
    const token = jwt.sign(
      {
        //this token will be stored on cookies . this id will be encrypted based on a key
        //users of this website are going to have a cookie encryted by this secret key
        id: validUser._id,
        isAdmin: validUser.isAdmin
      },
      process.env.JWT_SECRET
    );
    const { password: _pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (err) {
    next(err);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: _pass, ...rest } = user._doc;
      res
        .status(200)
        .cookie("acess_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      //toString(36) will return num from 0 to 9 and letters from 8 to z
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join() +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id , isAdmin: newUser.isAdmin}, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("acess_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (err) {
    next(error);
  }
};

export const signInForMobapp = async(req,res) => {
  console.log(req.body , 'req body --------->>>>>>>>>>>>>>>>>>>>>>> ');
  const {email, name, password} = req.body;
  const newUser = new User1({
      email,
      name,
      password
  });
  await newUser.save();
   res.status(200).json({message: 'User Created'});

}
export const login = async(req,res) => {

  console.log(req.body , 'login req body ---------<<<<<<<<<<<<<<<< ');
  const {email, password} = req.body;
  const validUser = await User1.findOne({email , password});
  if (!validUser) {
      console.log('wrong');
      res.status(404).json({message: 'User not found' , status : 404});
    }
    else{

    //  res.status(200).json({message: 'User found'});
    
      const rest = validUser._doc;
      console.log('================' ,rest);
      
      res
      .status(200)
      .json(rest);
    }
}

export const enterproductinfo = async(req,res) => {

console.log(req.body , 'req body for product info --------->>>>>>>>>>>>>>>>>>>>>>> ');
const {product, brand, modelNumber , Comments , dealer , dealerContactNumber, purchaseDate , warrantyEndDate , userId} = req.body;
const newProduct = new Product({
  product,
  brand,
  modelNumber,
  Comments,
  dealer,
  dealerContactNumber,
  purchaseDate,
  warrantyEndDate,
  userId

});
await newProduct.save();
 res.json({message: 'Product Created'});

}