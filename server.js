const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const connectDB = require('./configs/database');
<<<<<<< HEAD
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/UserRoutes");
const adminRoutes = require("./routes/adminRoutes");
=======
const authRoutes = require('./routes/authroutes');
>>>>>>> 9373da73fd1d3583f80173fa4d6a5c0e5bc6d353



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
<<<<<<< HEAD
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/setup", require("./routes/adminSetupRoute"));
=======
app.use('/api/auth', authRoutes);
>>>>>>> 9373da73fd1d3583f80173fa4d6a5c0e5bc6d353



//Creating PORT Listner
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
})