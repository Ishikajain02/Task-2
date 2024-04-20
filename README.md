# Task Management RESTful API

This project is a simple RESTful API built with Express.js for managing tasks. It allows users to perform CRUD (Create, Read, Update, Delete) operations on tasks stored in memory.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:

2. Navigate to the project directory:

3. Install dependencies `npm i`:

4.Run `npm i cors` and `npm i express`; 

5. Start the server:

## Documentation 
Refer to the report added above for documentation and guide.


The server will start running on `http://localhost:8080` by default.

## Endpoints

The API exposes the following endpoints:

- `GET /tasks`: Retrieve a list of all tasks.
- `GET /tasks/:id`: Retrieve a specific task by ID.
- `POST /tasks`: Create a new task.
- `PUT /tasks/:id`: Update an existing task by ID.
- `DELETE /tasks/:id`: Delete a task by ID.
