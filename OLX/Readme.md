# Mini OLX (MERN Stack)

## Features

- User Authentication - Register and Login with JWT/session-based authentication - Only
authenticated users can create, update, or delete products - Only
authenticated users can create, update, or delete products.

- Product CRUD - Create: Add product with Title, Description, Price, Category, and
optional Image. - Read: View all products and individual product details. - Update: User can update
only their own products. - Delete: User can delete only their own products.

- User Profile Page: Show user information and listed products
  
- Search : Search by title

Steps to run the project locally:

---

## Backend Setup

1. Open terminal and navigate to the backend folder:

```bash
cd backend
```
2: Install dependencies for backend
```bash
npm install
```
3: Rename the env.txt file to .env and update the MONGO_URI and JWT_SECRET with your own:
``` bash
PORT=5000
MONGO_URI=your_mongodb_uri_here
JWT_SECRET=your_jwt_secret_here
```
4: Start the Backend server
``` bash
node index
```
## Frontend Setup

1: Open a new terminal and navigate to the frontend folder:
``` bash
cd frontend
```
2: Install dependencies for frontend
``` bash
npm install
```
3: Run server for frontend
``` bash
npm run dev

```

