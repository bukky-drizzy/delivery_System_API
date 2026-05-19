const dispatchRoutes = require("./routes/dispatchRoutes");

const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const connectDB = require('./configs/database');
const authRoutes = require('./routes/authroutes');
const errorMiddleware = require("./middlewares/errorMiddleware");



const app = express();
app.use(errorMiddleware);

const PORT = process.env.PORT || 5050

//connect to database
connectDB();

//middlewares
app.use(express.json());


app.use("/api", dispatchRoutes);


app.use(morgan('dev')); 


//testing server working route
app.get('/api', (req, res) => {
  res.send('Welcome to Your Delivery System API');
});

//routes
app.use('/api/auth', authRoutes);



//Creating PORT Listner
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
})