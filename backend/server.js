const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// Enable CORS for all routes
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials
//   next();
// });



const FrontendURL = process.env.API_URL; 
app.use(cors({
    origin: FrontendURL,
    credentials: true,  
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json("CRUD");
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL);

app.use(productRoutes);
app.use(authRoutes);
app.listen(PORT);
