# API Documentation
### This document describes the API endpoints and the expected responses.

## Endpoints
### 1. /users
#### GET
- Description: Get user information
- Request: GET /users/{username}
- Response:
    - Code: 200
    - Content: { "username": "username", "password": "password" }
#### POST
- Description: Create a new user
- Request: POST /users
- Data: 
  - username:
    - String
    - Required
    - Unique
  - password:
    - String
    - Required
- Response:
    - Code: 201
    - Content: { "username": "username", "password": "password" }
### 2. /tasks
#### GET
- Description: Get all tasks for a user
- Request: GET /tasks/{username}
- Response:
    - Code: 200
    - Content: [ { "_id": "id", "title": "title", "description": "description", "dueDate": "isoDate"} ]
#### POST
- Description: Create a new task
- Request: POST /tasks
- Data:
  - username:
    - String
    - Required
  - title:
    - String
    - Required
  - description:
    - String
  - dueDate:
    - Date
- Response:
     - Code: 201
     - Content: { "_id": "id", "title": "title", "description": "description", "dueDate": "isoDate" }
  