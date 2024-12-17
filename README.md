# Travel Management API - README

This project is a **Travel Management API** built using **Node.js** with **Express.js** as the backend framework and **MongoDB** as the database. The API includes features for user authentication, trip management, profile management, and follower functionalities.

---

## Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Project Structure](#project-structure)
4. [Setup Instructions](#setup-instructions)
5. [API Endpoints](#api-endpoints)
6. [Environment Variables](#environment-variables)
7. [Run Server](#run-server)
8. [Error Handling](#error-handling)

---

## Features
This API supports the following features:
1. **User Authentication**:
   - Register users with details such as name, email, password, phone, address, and age.
   - Login with email and password.
2. **Profile Management**:
   - Update profile details, including bio and profile picture.
   - Follow or unfollow users.
   - Add achievements to a profile.
   - View followers of a user.
3. **Trip Management**:
   - Add new trips with complete details.
   - Retrieve a list of all trips.
   - Search trips based on filters like location and keyword.
4. **Middleware**: Authentication using JSON Web Token (JWT) for protected routes.
5. **Data Storage**: Uses MongoDB to store users, profiles, and trip data.

---

## Technologies Used
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JSON Web Tokens (JWT)** for authentication
- **Bcrypt.js** for password hashing
- **Dotenv** for environment variables

---

## Project Structure

The project structure is as follows:
```
├── config
│   └── db.js                # MongoDB Connection Configuration
├── Controllers
│   ├── authController.js    # Controller for user registration and login
│   ├── profileController.js # Controller for profile management and follower actions
│   └── tripController.js    # Controller for trip-related actions
├── Middleware
│   └── authMiddleware.js    # Middleware for JWT-based authentication
├── Models
│   ├── trip.js              # Mongoose schema for trips
│   └── user.js              # Mongoose schema for users
├── Routes
│   ├── userRoutes.js        # Routes for user auth endpoints
│   ├── profileRoutes.js     # Routes for profile-related endpoints
│   └── tripRoutes.js        # Routes for trip-related endpoints
├── index.js                 # Main application entry point
└── package.json             # Project dependencies
```

---

## Setup Instructions

1. **Clone the Repository**:
```bash
$ git clone https://github.com/your-repo/travel-api.git
$ cd travel-api
```

2. **Install Dependencies**:
```bash
$ npm install
```

3. **Create `.env` file**: Add required environment variables to configure JWT secrets and MongoDB connection.

Example `.env` file:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/travel-management
JWT_SECRET=your_jwt_secret
```

4. **Start the MongoDB Server**: Ensure MongoDB is running on your local system or use MongoDB Atlas.

5. **Start the API Server**:
```bash
$ npm start
```
The API will be available at `http://localhost:3000`.

---

## API Endpoints
Below are the API endpoints grouped by functionality.

### 1. **User Authentication** (Public Routes)
| Method | Endpoint       | Description           |
|--------|----------------|-----------------------|
| POST   | `/api/register`| Register a new user   |
| POST   | `/api/login`   | Login with credentials|

### 2. **Profile Management** (Protected Routes)
| Method | Endpoint                    | Description                       |
|--------|-----------------------------|-----------------------------------|
| PUT    | `/api/profile`              | Update user profile               |
| POST   | `/api/profile/follow`       | Follow or unfollow a user         |
| POST   | `/api/profile/achievement`  | Add an achievement to user profile|
| POST   | `/api/profile/follow/:id`   | Add a follower                    |
| DELETE | `/api/profile/unfollow/:id` | Remove a follower                 |
| GET    | `/api/profile/followers`    | Get followers list of a user      |

### 3. **Trip Management**
| Method | Endpoint            | Description                 |
|--------|---------------------|-----------------------------|
| POST   | `/api/trips`        | Add a new trip              |
| GET    | `/api/trips`        | Get all trips               |
| GET    | `/api/search`       | Search for trips            |

---

## Environment Variables
To run the application, the following environment variables need to be set:

| Variable      | Description                       |
|---------------|-----------------------------------|
| `PORT`        | Port for running the API          |
| `MONGODB_URI` | MongoDB connection string         |
| `JWT_SECRET`  | Secret key for JWT authentication |

---

## Run Server
To run the application:
```bash
$ npm start
```
It will start the server on `http://localhost:3000`.

---

## Error Handling
Errors are returned in JSON format with appropriate HTTP status codes. Example:

```json
{
    "error": "User already exists"
}
```

---

## Conclusion
This API provides a scalable solution for managing user profiles, followers, and trips. It's secured with JWT for user authentication and follows RESTful API design practices for clean endpoints and operations.

---

**Author:** Hamza  
**Version:** 1.0.0  
**License:** MIT

