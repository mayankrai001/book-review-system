# Step 1: Clone the repository  
git clone https://github.com/your-username/book-review-api.git  

# Step 2: Navigate to the project folder  
cd book-review-api  

# Step 3: Install dependencies  
npm install  

# Step 4. Setup Environment Variables
   Create a .env file in the project root with the following:
      PORT=5000
      MONGO_URI=mongodb://localhost:27017/bookreviewdb
      JWT_SECRET=your_jwt_secret_key(I am not exposing my secret here)

# Step 5. Run the server
  npm run start   # for nodemon (development)


🧩 Design Decisions & Assumptions

🔑 JWT Authentication → Only logged-in users can create, update, or delete reviews and add books.
📑 Pagination → Implemented for both books and reviews to handle large datasets efficiently.
📝 One Review Per User Per Book → Users can only review a book once but can update or delete their review.
🔍 Search Feature → Supports partial and case-insensitive search on book titles and authors.
🚨 Error Handling → Returns consistent error messages with proper HTTP status codes.
🗄️ MongoDB with Mongoose → Chosen for schema flexibility and simple integration with Node.js.

Database:
👤 User Schema
         {
      "_id": ObjectId,
      "username": String,
      "email": String,
      "password": String (hashed)
    }

📚 Book Schema
    {
  "_id": ObjectId,
  "title": String,
  "author": String,
  "genre": String,
  "description": String,
  "createdAt": Date
}

📝 Review Schema
    {
  "_id": ObjectId,
  "book": ObjectId (ref: Book),
  "user": ObjectId (ref: User),
  "rating": Number (1–5),
  "comment": String,
  "createdAt": Date
}

PostMan Api Screen Shots

<img width="1383" height="513" alt="image" src="https://github.com/user-attachments/assets/f8378f6e-7aa8-418a-8f85-d8fe69747ef2" />

<img width="1387" height="472" alt="image" src="https://github.com/user-attachments/assets/e4662303-f3eb-46df-9cd4-e0e7301d6e1b" />



