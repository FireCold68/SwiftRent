import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import ProductsRoute from './controllers/product.js'
dotenv.config();

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(results => {
    //console.log(results)
    app.listen(process.env.PORT, ()=>{
        console.log(`Server is runnig on port ${process.env.PORT}`)
    })
})
.catch(error => {
    console.log(error)
})
