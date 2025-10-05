const dotenv = require('dotenv')
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

// Loading .env file
dotenv.config();

// middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// cors config for CORS Preflight requests(due to PATCH request with multipart data)
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:5173',         // Frontend URL
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

//MongoDB connection
const MONGOURI = process.env.MONGO_URI;
mongoose.connect(MONGOURI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Error connecting to MongoDB", err));

//Connecting Routes
app.use('/api', userRoutes);
app.use('/api/products', productRoutes);

//Starting server
app.listen(5000, () => console.log('Server started on PORT = 5000'));
