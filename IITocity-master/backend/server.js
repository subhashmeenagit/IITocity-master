import express from 'express';
import mongoose from 'mongoose';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import dotenv from 'dotenv';
import orderRouter from './routers/orderRouter.js';

dotenv.config();



const app = express();
app.use(express.json());// this is middleware to read json data in the body of the request
app.use(express.urlencoded({extended: true}));// this is also a middleware

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/iitocity', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})




app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
})
app.get('/', (req, res) => {
    res.send('Server is ready');
})

//userrouter vgera  main ek module download kiya hai express handler uske karan jo bhi error aayega vo niche wala function deal krega 
// eslint-disable-next-line
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message })
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
})