import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import mytemplate from '../mytemplate.js';

const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async (req, res) =>{
    const products = await Product.find({});
    //  find function main empty object pass kiya hain mtlb return all objects
    res.send(products);
}))

productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    await Product.remove({});
    const createdProducts = await Product.insertMany(mytemplate.products)
    res.send({ createdProducts });
}))

productRouter.get('/:id', expressAsyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        res.send(product);
    }
    else{
        res.status(404).send({ message: 'Product Not Found'})
    }
}))

export default productRouter