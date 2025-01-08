## Deployed Backend: https://qed42-assignment-ecommerce-1.onrender.com

```markdown
# QED42_Assignment_Ecommerce

## Features
- Fetching and displaying products from the Fake Store API.
- Filter, search, and sorting of products.
- User authentication and authorization.
- REST API to add products to the cart and retrieve items in the cart.
- Separate carts for different user accounts.

---

## How to Run the Project

### Prerequisites
- Make sure you have **Node.js** and **npm/yarn** installed.
- Install **MongoDB** for the backend (or any database used in your implementation).
- Clone this repository:
  ```bash
  git clone <repository-url>
  cd qed42_assignment_ecommerce
  ```

### Running the Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. The frontend will run on `http://localhost:3000`.

### Running the Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file. Include configurations such as:
   ```env
   PORT=5000
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
5. The backend will run on `http://localhost:5000`.

---

## Additional Notes
I am more comfortable with backend development and have focused on implementing robust APIs for user authentication, cart management, and database interactions. While I’ve built the frontend to showcase the features, I’m open to feedback to enhance the user experience.

Feel free to reach out if you have any questions or suggestions!
```
