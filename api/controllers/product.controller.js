
import Product from "../models/product.model.js";

export const findproductinfo = async(req,res) => {

    console.log(req.params.userId , 'req params for product info --------->>>>>>>>>>>>>>>>>>>>>>> ');
    const { userId} = req.body;
    try {
        
        const product = await Product.find(req.params);
      
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
    // await newProduct.save();
    //  res.json({message: 'Product Created'});
  
  }