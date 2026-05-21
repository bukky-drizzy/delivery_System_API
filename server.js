const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const connectDB = require('./configs/database');
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/UserRoutes");
const adminRoutes = require("./routes/adminRoutes");



const app = express();

const PORT = process.env.PORT || 5050

//connect to database
connectDB();

//middlewares
app.use(express.json());
app.use(morgan('dev')); 


//testing server working route
app.get('/api', (req, res) => {
  res.send('Welcome to Your Delivery System API');
});

//routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/setup", require("./routes/adminSetupRoute"));



//Creating PORT Listner
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
})