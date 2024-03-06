#   INFORMA Task Manager REST API

### Overview
+ The INFORMA Task Manager API is a RESTful backend designed for managing tasks and user authentication. It provides endpoints for creating, updating, reading, and deleting tasks, as well as user authentication functionalities.

### Technologies Used
+ Node.js
+ Express.js
+ MongoDB
+ Jwt (JSON Web Tokens)
+ bcrypt
+ Mongoose
+ Jest (for testing)
+ Zod (for schema validation)

### Features
+ User authentication: Allows users to login, and authenticate using JWT.
+ Task management: Supports CRUD operations for tasks, including creation, retrieval, updating, and deletion.
+ Secure authentication: Utilizes bcrypt for password hashing and JWT for secure authentication.
+ Schema validation: Implements schema validation using Zod for input validation and data integrity.

### Usage
1. **Authentication:**
    + Login: POST /auth/login
2. **Task Management:**
    + Create a new task: POST /tasks
    + Get all tasks: GET /tasks
    + Get a task by ID: GET /tasks/:id
    + Update a task: PATCH /tasks/:id
    + Delete a task: DELETE /tasks/:id

### Setup
    1. Clone the repository: `git clone <repository-url>`
    2. Install dependencies: `npm install`
    3. Set up environment variables (e.g., MongoDB connection string, JWT secret)
    4. Start the server: `npm run dev:start`

### Testing
+ Run tests: `npm run test:app`
+ Unit tests are implemented using Jest to ensure API endpoints and functionalities work as expected.


    
