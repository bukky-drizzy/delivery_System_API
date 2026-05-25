# Delivery System Management API

A comprehensive RESTful API for managing a delivery system, built with Node.js and Express. This system handles order management, rider dispatch, payment processing, real-time tracking, and notifications.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Running the Project](#running-the-project)
- [Database Models](#database-models)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **User Authentication**: Secure signup and login with JWT tokens
- **Order Management**: Create, track, and manage delivery orders
- **Rider Management**: Manage delivery riders and their assignments
- **Payment Processing**: Secure payment handling and transaction management
- **Real-time Tracking**: Track orders in real-time from pickup to delivery
- **Notifications**: Send email and SMS notifications to users and riders
- **Admin Panel**: Administrative features for system management
- **Dispatch Management**: Efficient order assignment to riders
- **OTP Verification**: Secure OTP-based authentication
- **Proof of Delivery**: Upload and manage delivery proofs
- **Damage Reporting**: Report and manage damaged items

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js (v5.2.1)
- **Database**: MongoDB with Mongoose ODM (v9.6.2)
- **Authentication**: JWT (jsonwebtoken v9.0.3)
- **Security**: bcrypt (v6.0.0)
- **File Upload**: Multer (v2.1.1)
- **Cloud Storage**: Cloudinary (v2.10.0)
- **HTTP Client**: Axios (v1.16.1)
- **Validation**: Validator (v13.15.35)
- **Logging**: Morgan (v1.10.1)
- **Environment**: dotenv (v17.4.2)
- **Development**: Nodemon (v3.1.14)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14.0 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- Git

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bukky-drizzy/Delivery-System-Management.git
   cd delivery_System_API
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env file with your configuration
   ```

## 🔑 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5050
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/delivery_system

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here


# Cloudinary Configuration (for image uploads)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration (if using email notifications)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_email_password

# SMS Configuration (if using SMS notifications)
SMS_API_KEY=your_sms_api_key
SMS_SENDER_ID=your_sender_id
```

## 📁 Project Structure

```
delivery_System_API/
├── configs/              # Configuration files
│   ├── cloudinary.js    # Cloudinary setup
│   ├── database.js      # MongoDB connection
│   └── jwt.js           # JWT configuration
├── controllers/          # Route handlers
│   ├── authcontroller.js
│   ├── ordercontroller.js
│   ├── ridercontroller.js
│   ├── paymentController.js
│   ├── trackercontroller.js
│   ├── dispatchcontroller.js
│   ├── notificationController.js
│   ├── otpController.js
│   └── adminController.js
├── models/               # Database schemas
│   ├── user.js
│   ├── rider.js
│   ├── order.js
│   ├── payment.js
│   ├── delivery.js
│   ├── dispatch.js
│   ├── notification.js
│   ├── otp.js
│   └── Admin.js
├── routes/               # API routes
│   ├── authroutes.js
│   ├── orderroutes.js
│   ├── riderroutes.js
│   ├── paymentroutes.js
│   ├── trackingroutes.js
│   ├── dispatchRoutes.js
│   ├── notificationRoutes.js
│   ├── otpRoutes.js
│   ├── UserRoutes.js
│   ├── adminSetupRoute.js
│   └── adminroute.js
├── middlewares/          # Custom middleware
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   ├── roleMiddleware.js
│   └── upload.js
├── services/             # Business logic
│   ├── dispatchService.js
│   ├── notificationService.js
│   └── otpService.js
├── utils/                # Utility functions
│   ├── createAdmin.js
│   └── generateTrackingId.js
├── server.js             # Main application entry point
├── package.json          # Project dependencies
└── README.md             # This file
```

## 🔌 API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Orders (`/api/orders`)
- `POST /api/orders` - Create a new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/history` - Get order history
- `PATCH /api/orders/:id/status` - Update order status
- `PATCH /api/orders/:id/proof` - Upload proof of delivery
- `PATCH /api/orders/:id/damage` - Upload damage report
- `GET /api/orders/:id/track` - Track order

### Riders (`/api/riders`)
- `POST /api/riders` - Create a new rider
- `GET /api/riders` - Get all riders
- `GET /api/riders/:id` - Get rider details
- `PATCH /api/riders/:id` - Update rider information
- `DELETE /api/riders/:id` - Delete rider

### Payments (`/api/payments`)
- `POST /api/payments` - Process payment
- `GET /api/payments/:id` - Get payment details
- `GET /api/payments/history` - Get payment history

### Tracking (`/api/tracking`)
- `GET /api/tracking/:trackingId` - Get real-time order tracking

### Notifications (`/api/notifications`)
- `POST /api/notifications` - Send notification
- `GET /api/notifications` - Get notifications

### OTP (`/api/otp`)
- `POST /api/otp/send` - Send OTP
- `POST /api/otp/verify` - Verify OTP

### Dispatch (`/api/dispatch`)
- `POST /api/dispatch` - Create dispatch
- `GET /api/dispatch` - Get all dispatches
- `PATCH /api/dispatch/:id` - Update dispatch status

### Admin (`/api/admin`)
- `POST /api/admin/setup` - Admin setup
- Various admin management endpoints

### Users (`/api/users`)
- User profile and management endpoints

## 🗄️ Database Models

### User
- Email authentication
- User profile information
- Address and contact details
- User type (customer, admin, etc.)

### Rider
- Personal information
- Vehicle details
- Availability status
- Performance metrics

### Order
- Order details and items
- Pickup and delivery locations
- Status tracking
- Cost and payment information

### Payment
- Payment method
- Transaction status
- Amount and currency
- Timestamp

### Delivery
- Delivery status
- Delivery time
- Proof of delivery
- Damage reports

### Dispatch
- Rider assignment
- Delivery route
- Estimated delivery time

### Notification
- Notification type (email, SMS, push)
- Recipient information
- Message content
- Delivery status

## ▶️ Running the Project

### Development Mode
```bash
npm run dev
```
This uses Nodemon to automatically restart the server on file changes.

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5050` by default (or the PORT specified in `.env`).

## 🧪 Testing

Currently, no test framework is configured. To add tests:

```bash
npm install --save-dev jest supertest
```

Then create test files and update the test script in `package.json`.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🔗 Links

- **Repository**: [GitHub - Delivery System Management](https://github.com/bukky-drizzy/Delivery-System-Management)
- **Issues**: [Report Issues](https://github.com/bukky-drizzy/Delivery-System-Management/issues)

## 👤 Author

@2bigjay
@bukky-drizzy
@Oludotun-coder
@Tom070904



