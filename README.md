# TripVault | Personal Travel Journal

TripVault is a full-stack MERN application designed for users to document and manage their travel memories. This project serves as a comprehensive travel management system featuring secure authentication and complete data lifecycle management.

## Week 2: CRUD Functionality
This week's development focused on implementing the core Trip Management engine, enabling full CRUD (Create, Read, Update, Delete) capabilities.

### Core Implementation
*   **Data Modeling**: Implemented a Mongoose Trip schema, including fields for destination, dates, description, ratings, and user-reference.
*   **API Development**: Built protected RESTful routes (Node.js/Express) requiring JWT verification for all interactions.
*   **Ownership Security**: Implemented strict ownership checks; users can only view, update, or delete trips that they personally created.
*   **Dynamic UI**: Developed a responsive React dashboard that handles trip listing, form-based creation, and pre-filled data editing.

### API Reference
| Method | Route | Description |
| :--- | :--- | :--- |
| `POST` | `/api/trips` | Add a new travel memory |
| `GET` | `/api/trips` | Retrieve authenticated user's trip list |
| `GET` | `/api/trips/:id` | Fetch specific trip details |
| `PUT` | `/api/trips/:id` | Update existing trip data |
| `DELETE` | `/api/trips/:id` | Remove a trip record |

### Tech Stack
*   **Frontend**: React.js, Axios, React Router
*   **Backend**: Node.js, Express.js
*   **Database**: MongoDB, Mongoose

---
*Project developed as part of the TripVault Virtual Internship Program.*