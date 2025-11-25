# User CRUD API

A simple CRUD API using **Node.js** and **Express** with a JSON file (`MOCK_DATA.json`) as storage.

Setup & Run:  
1. Clone the repo: `git clone https://github.com/garimapurohit/crud.git && cd crud`  
2. Install dependencies: `npm install`  
3. Run the server: `node index.js`  

Server runs on: `http://localhost:8000`

API Endpoints:  
- `GET /api/users` → Get all users  
- `GET /api/users/:id` → Get a user by ID  
- `POST /api/users` → Add a new user  
- `PATCH /api/users/:id` → Update a user  
- `DELETE /api/users/:id` → Delete a user
