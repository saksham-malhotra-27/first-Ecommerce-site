import 'dotenv/config';
import express from "express";
import colors from "colors";
import morgan from "morgan";
import connectdb from './config/db.js';
import authRoute from './routes/authRoute.js'
import categoryRoute from "./routes/categoryRoute.js"
import productRoute from "./routes/productsRoute.js"
import cors from "cors"
import formidable from 'formidable';
import getUsers from "./routes/getUsers.js"
import getCart from "./routes/cart.js"
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(morgan('dev'));//used for debugging tells request type status code etc 
app.use(cors())

/*
like this :
GET / 404 8.335 ms - 139
though we dont need in development but in debugging 
*/
const port = process.env.PORT || 4000 ;

connectdb();

app.listen(port, ()=>{
    console.log(`Server Running on ${port}`.bgCyan.white);
})

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/users', getUsers);
app.use('/api/v1/cart', getCart);