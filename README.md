# TripVault | Personal Travel Journal

TripVault is a full-stack MERN application designed for users to document and manage their travel memories[cite: 1, 2]. This project serves as a comprehensive travel management system featuring secure authentication and complete data lifecycle management[cite: 1, 2].

---

## 🔐 Week 1: Project Setup & Authentication
The foundation of the application focused on secure user registration, login, and database connection[cite: 2].

### Core Implementation
* **User Authentication**: Secure password hashing using `bcryptjs` and token-based authentication using JSON Web Tokens (JWT)[cite: 2].
* **Database Connection**: Configured MongoDB Atlas and Mongoose connection setup with environment variables[cite: 2].
* **Base Architecture**: Initialized the client-server folder structure with React (Vite) and Node/Express[cite: 2].

### API Reference (Week 1)
| Method | Route | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user account[cite: 2] |
| `POST` | `/api/auth/login` | Authenticate user and return JWT token[cite: 2] |
| `GET` | `/api/auth/me` | Retrieve authenticated user info[cite: 2] |

---

## 🛠️ Week 2: CRUD Functionality
This week's development focused on implementing the core Trip Management engine, enabling full CRUD (Create, Read, Update, Delete) capabilities[cite: 1].

### Core Implementation
* **Data Modeling**: Implemented a Mongoose Trip schema, including fields for destination, dates, description, ratings, and user-reference[cite: 1].
* **API Development**: Built protected RESTful routes (Node.js/Express) requiring JWT verification for all interactions[cite: 1].
* **Ownership Security**: Implemented strict ownership checks; users can only view, update, or delete trips that they personally created[cite: 1].
* **Dynamic UI**: Developed a responsive React dashboard that handles trip listing, form-based creation, and pre-filled data editing[cite: 1].

### API Reference (Week 2)
| Method | Route | Description |
| :--- | :--- | :--- |
| `POST` | `/api/trips` | Add a new travel memory[cite: 1] |
| `GET` | `/api/trips` | Retrieve authenticated user's trip list[cite: 1] |
| `GET` | `/api/trips/:id` | Fetch specific trip details[cite: 1] |
| `PUT` | `/api/trips/:id` | Update existing trip data[cite: 1] |
| `DELETE` | `/api/trips/:id` | Remove a trip record[cite: 1] |

---

## 🚀 Week 3: Photo Uploads & Public Profiles
This week's development focused on integrating cloud media storage and building public-facing user profiles to make TripVault feel like a real production-ready product[cite: 1].

### Core Implementation
* **Cloudinary Integration**: Configured `multer`, `cloudinary`, and `multer-storage-cloudinary` on the backend to securely handle image file uploads and store cover images/photos[cite: 1].
* **Public User Profiles**: Added unique `username` and optional `bio` fields to the User model, implementing a secure public profile route that exposes only safe fields without authentication[cite: 1].
* **Dynamic Profile Management**: Allowed logged-in users to update their profile bio dynamically from the dashboard[cite: 1].

### API Reference (Week 3)
| Method | Route | Auth | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/trips/:id/upload` | Yes | Upload a photo and attach Cloudinary URL to trip[cite: 1] |
| `GET` | `/api/users/:username/profile` | No | Public profile user info and all their trips[cite: 1] |
| `PUT` | `/api/users/profile` | Yes | Update logged-in user's bio or username[cite: 1] |

---

## 💻 Tech Stack
* **Frontend**: React.js (Vite), Axios, React Router[cite: 1, 2]
* **Backend**: Node.js, Express.js, Multer[cite: 1, 2]
* **Database**: MongoDB, Mongoose[cite: 1, 2]
* **Media Storage**: Cloudinary[cite: 1]

---
*Project developed as part of the TripVault Virtual Internship Program[cite: 1].*