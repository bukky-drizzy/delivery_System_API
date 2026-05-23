const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const connectDB = require('./configs/database');

const authRoutes = require('./routes/authroutes');
const riderRoutes = require('./routes/riderroutes');
const errorMiddleware = require("./middlewares/errorMiddleware");
const paymentRoutes = require("./routes/paymentroutes");
const orderroutes = require("./routes/orderroutes");
const trackingRoutes = require("./routes/trackingroutes");
const userRoutes = require("./routes/UserRoutes");
const adminRoutes = require("./routes/adminSetupRoute");
const dispatchRoutes = require("./routes/dispatchRoutes");
const otpRoutes = require('./routes/otpRoutes');
const notificationRoutes = require('./routes/notificationRoutes');


const app = express();
app.use(errorMiddleware);


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

app.use('/api/auth', authRoutes);
app.use('/api/riders', riderRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/notifications', notificationRoutes);
app.use("/api", dispatchRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/orders", orderroutes);
app.use("/api/track", trackingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/setup", require("./routes/adminSetupRoute"));




//Creating PORT Listner
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
})