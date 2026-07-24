# TripVault | Personal Travel Journal

TripVault is a full-stack MERN application designed for users to document and manage their travel memories. This project serves as a comprehensive travel management system featuring secure authentication and complete data lifecycle management.

---

## 🔐 Week 1: Project Setup & Authentication
The foundation of the application focused on secure user registration, login, and database connection.

### Core Implementation
* **User Authentication**: Secure password hashing using `bcryptjs` and token-based authentication using JSON Web Tokens (JWT).
* **Database Connection**: Configured MongoDB Atlas and Mongoose connection setup with environment variables.
* **Base Architecture**: Initialized the client-server folder structure with React (Vite) and Node/Express.

### API Reference (Week 1)
| Method | Route | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user account |
| `POST` | `/api/auth/login` | Authenticate user and return JWT token |
| `GET` | `/api/auth/me` | Retrieve authenticated user info |

---

## 🛠️ Week 2: CRUD Functionality
This week's development focused on implementing the core Trip Management engine, enabling full CRUD (Create, Read, Update, Delete) capabilities.

### Core Implementation
* **Data Modeling**: Implemented a Mongoose Trip schema, including fields for destination, dates, description, ratings, and user-reference.
* **API Development**: Built protected RESTful routes (Node.js/Express) requiring JWT verification for all interactions.
* **Ownership Security**: Implemented strict ownership checks; users can only view, update, or delete trips that they personally created.
* **Dynamic UI**: Developed a responsive React dashboard that handles trip listing, form-based creation, and pre-filled data editing.

### API Reference (Week 2)
| Method | Route | Description |
| :--- | :--- | :--- |
| `POST` | `/api/trips` | Add a new travel memory |
| `GET` | `/api/trips` | Retrieve authenticated user's trip list |
| `GET` | `/api/trips/:id` | Fetch specific trip details |
| `PUT` | `/api/trips/:id` | Update existing trip data |
| `DELETE` | `/api/trips/:id` | Remove a trip record |

---

## 🚀 Week 3: Photo Uploads & Public Profiles
This week's development focused on integrating cloud media storage and building public-facing user profiles to make TripVault feel like a real production-ready product.

### Core Implementation
* **Cloudinary Integration**: Configured `multer`, `cloudinary`, and `multer-storage-cloudinary` on the backend to securely handle image file uploads and store cover images/photos.
* **Public User Profiles**: Added unique `username` and optional `bio` fields to the User model, implementing a secure public profile route that exposes only safe fields without authentication.
* **Dynamic Profile Management**: Allowed logged-in users to update their profile bio dynamically from the dashboard.

### API Reference (Week 3)
| Method | Route | Auth | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/trips/:id/upload` | Yes | Upload a photo and attach Cloudinary URL to trip |
| `GET` | `/api/users/:username/profile` | No | Public profile user info and all their trips |
| `PUT` | `/api/users/profile` | Yes | Update logged-in user's bio or username |

---

## 💻 Tech Stack
* **Frontend**: React.js (Vite), Axios, React Router
* **Backend**: Node.js, Express.js, Multer
* **Database**: MongoDB, Mongoose
* **Media Storage**: Cloudinary

---
*Project developed as part of the TripVault Virtual Internship Program.*