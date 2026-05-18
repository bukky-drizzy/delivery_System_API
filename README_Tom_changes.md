# Delivery System API - Middleware Usage

## Overview
This file documents the middleware changes added to the project and explains how to use them in routes.

## Middleware files

- `middlewares/authMiddleware.js`
  - Protects routes by verifying the JWT token in the `Authorization` header.
  - Adds the decoded token payload to `req.user`.

- `middlewares/roleMiddleware.js`
  - Restricts access by role.
  - Reads `req.user.role` and checks whether the user's role is allowed for the route.

## How to use the middlewares

### Import the middleware

```js
const express = require('express');
const router = express.Router();

const protectedroute = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
```

### Protect a route with authentication only

```js
router.get('/profile', protectedroute, (req, res) => {
  // req.user is available after authMiddleware
  res.json({ message: 'This is a protected profile route', user: req.user });
});
```

### Protect a route and restrict by role

```js
router.get('/admin', protectedroute, roleMiddleware('admin'), (req, res) => {
  res.json({ message: 'Admin access granted', user: req.user });
});
```

### Multiple allowed roles

```js
router.get('/manager-data', protectedroute, roleMiddleware('manager', 'admin'), (req, res) => {
  res.json({ message: 'Manager or admin access granted', user: req.user });
});
```

## Expected request format

The authentication middleware expects the JWT token in the `Authorization` header, with the Bearer format:

```
Authorization: Bearer <token>
```

## Added environment element

A new environment variable is required for JWT verification:

- `JWT_SECRET`

Example `.env` entry:

```env
JWT_SECRET=delivery_system_secret_key
```

## Notes

- `authMiddleware` will return `401` if no token is provided or if the token is invalid.
- `roleMiddleware` will return `401` when `req.user` is missing and `403` when the authenticated user's role is not allowed.

## Example route file structure

```js
const express = require('express');
const router = express.Router();

const protectedroute = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.get('/dashboard', protectedroute, (req, res) => {
  res.send('Dashboard for authenticated users');
});

router.get('/admin-panel', protectedroute, roleMiddleware('admin'), (req, res) => {
  res.send('Admin panel');
});

module.exports = router;
```
