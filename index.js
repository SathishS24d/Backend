import express from "express";
import { config } from "dotenv";
import db from "./config/db.js";
import Logger from "./middleware/Logger.js";
import auth from './route/auth.route.js'
import product from './route/product.route.js'
import cart from './route/cart.route.js'

config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

// Connect to database
db();

// Middleware
app.use(express.json()); // To parse JSON body
app.use(Logger);       // Custom logger

// Routes
app.use('/shoppyglobe/api/auth',auth);

app.use('/shoppyglobe/product',product);

app.use('/shoppyglobe/cart',cart)



// Start the server
app.listen(port, () => console.log(`Server listening at port ${port}`));
