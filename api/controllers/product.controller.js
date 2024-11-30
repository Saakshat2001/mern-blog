
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

  export const deleteCard = async(req,res) => {

    try{
        console.log('aara ');
        
        const card = await Product.findById(req.params.cardId);
        console.log(req.params.cardId , card , '------>>>>>>>.');
        
        if(!card){
            return res.status(404).json({ message: 'Card not found' });
        }
       // res.status(200).json({message : 'Card deleted' });
          await Product.findByIdAndDelete(req.params.cardId);
          res.status(200).json({message : 'Card has been deleted'});
          
    }catch(error){
        res.status(500).json({ message: 'Server errorrrr' });
    }
}

export const editCard = async(req,res) => {
    try{
        const card = await Product.findById(req.params.cardId);
        // if(!card){
        //     return next(errorHandler(404 , 'Comment not found'));
        // }
     
   console.log('in edit card --------------------- ');
   
          const editedComment = await Product.findByIdAndUpdate(req.params.cardId,
            {
                product : req.body.product,
                brand : req.body.brand,
                modelNumber : req.body.modelNumber,
                Comments : req.body.Comments,
                dealer : req.body.dealer,
                dealerContactNumber : req.body.dealerContactNumber,
                purchaseDate : req.body.purchaseDate,
                warrantyEndDate : req.body.warrantyEndDate
            },
            {new : true}
          );
          res.status(200).json({message : 'Card has been edited'});

}catch(err){
    res.status(500).json({ message: 'Server error' });
    //next(err);
}
}