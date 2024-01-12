import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import client from './db.js';


const app = express();
dotenv.config();


//Using middleware
app.use(cors());
app.use(bodyParser.json({limit:'10mb'}));
app.use(bodyParser.urlencoded({extended:true,limit:'10mb'}));
app.use(fileUpload());


//Importing routes
import product from './routes/productRoutes.js';
import user from './routes/userRoutes.js';
import { getProducts } from './controllers/productControllers.js';

app.get("/",(req, res ) => {
    console.log(`first`);
    return res.json({
        message:'data is fetched'
    })
})

// app.get("/getAllProducts",getProducts)

app.use('/api/v1',product);
app.use('/api/v1',user);

app.listen(process.env.PORT,()=>{
    console.log(`This server is running on http://localhost:${process.env.PORT}`);
})