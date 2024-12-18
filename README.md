## Auth Endpoint

This API allows clients to manage authentication in the system. The API supports user login, logout, registration, and token refresh.

### Base URL
`/api/auth`

### 1. Login
- **URL:** `POST /api/auth/login`
- **Description:** Authenticates a user and returns an access token.
- **Request Headers:** None
- **Request Body:**
    ```json
    {
        "email": "john.doe@example.com",
        "password": "securepassword"
    }
    ```
- **Response:**
    ```json
    {
        "accessToken": "access-token-jwt"
    }
    ```
- **Status Codes:**
    - `200 OK`: Login successful.
    - `400 Bad Request`: Missing email or password.
    - `401 Unauthorized`: Invalid email or password.

### 2. Logout
- **URL:** `GET /api/auth/logout`
- **Description:** Logs out a user by clearing the refresh token cookie.
- **Request Headers:** None
- **Request Body:** None
- **Response:**
    ```json
    { "message": "Logout successful" }
    ```
- **Status Codes:**
    - `204 No Content`: Logout successful, no content to send back.

### 3. Register
- **URL:** `POST /api/auth/register`
- **Description:** Registers a new user.
- **Request Headers:** None
- **Request Body:**
    ```json
    {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "password": "securepassword"
    }
    ```
- **Response:**
    ```json
    {
        "success": "New user John Doe created!"
    }
    ```
- **Status Codes:**
    - `201 Created`: User successfully registered.
    - `400 Bad Request`: Missing required fields.
    - `409 Conflict`: Email already in use.

### 4. Refresh Token
- **URL:** `GET /api/auth/refreshToken`
- **Description:** Refreshes the access token using a valid refresh token.
- **Request Headers:** None
- **Request Body:** None
- **Response:**
    ```json
    {
        "accessToken": "new-access-token-jwt"
    }
    ```
- **Status Codes:**
    - `200 OK`: Token refreshed successfully.
    - `401 Unauthorized`: Missing or invalid refresh token.
    - `403 Forbidden`: Refresh token is invalid or expired.

## Problems Endpoint

This API allows clients to manage programming problems in an online judge system. 
The API supports creating, reading, updating, and deleting (CRUD) problem entries.

### Base URL
`/api/problems`

### Problem Model
Each problem contains the following fields:

| Field        | Description                             |
|--------------|-----------------------------------------|
| `id`         | Unique identifier for the problem.      |
| `title`      | Title of the problem.                   |
| `description`| Detailed description of the problem.    |
| `constraints`| Constraints that apply to the problem.  |
| `inputFiles` | List of input file URLs or paths.       |
| `outputFiles`| List of output file URLs or paths.      |

### 1. Get All Problems
- **URL:** `GET /api/problems`
- **Description:** Retrieves a list of all problems.
- **Request Headers:** None
- **Request Body:** None
- **Response:**
    ```json
    [
        {
            "id": "abc123",
            "title": "Two Sum",
            "description": "Find two numbers that add up to a target.",
            "constraints": "1 ≤ nums.length ≤ 1000",
            "inputFiles": ["input1.txt", "input2.txt"],
            "outputFiles": ["output1.txt"]
        }
    ]
    ```
- **Status Codes:**
    - `200 OK`: Request successful.

### 2. Create a Problem
- **URL:** `POST /api/problems`
- **Description:** Creates a new problem.
- **Request Headers:**
    - `Authorization: Bearer <JWT>` (Required)
- **Request Body:**
    ```json
    {
        "title": "Two Sum",
        "description": "Find two numbers that add up to a target.",
        "constraints": "1 ≤ nums.length ≤ 1000",
        "inputFiles": ["input1.txt", "input2.txt"],
        "outputFiles": ["output1.txt"]
    }
    ```
- **Response:**
    ```json
    {
        "id": "abc123",
        "title": "Two Sum",
        "description": "Find two numbers that add up to a target.",
        "constraints": "1 ≤ nums.length ≤ 1000",
        "inputFiles": ["input1.txt", "input2.txt"],
        "outputFiles": ["output1.txt"]
    }
    ```
- **Status Codes:**
    - `201 Created`: Problem successfully created.
    - `401 Unauthorized`: Missing or invalid JWT token.
    - `400 Bad Request`: Invalid request data.

### 3. Get Problem by ID
- **URL:** `GET /api/problems/:id`
- **Description:** Retrieves a specific problem by its ID.
- **Request Headers:** None
- **Request Body:** None
- **Response:**
    ```json
    {
        "id": "abc123",
        "title": "Two Sum",
        "description": "Find two numbers that add up to a target.",
        "constraints": "1 ≤ nums.length ≤ 1000",
        "inputFiles": ["input1.txt", "input2.txt"],
        "outputFiles": ["output1.txt"]
    }
    ```
- **Status Codes:**
    - `200 OK`: Request successful.
    - `404 Not Found`: Problem with specified ID does not exist.

### 4. Update a Problem
- **URL:** `PUT /api/problems/:id`
- **Description:** Updates an existing problem.
- **Request Headers:**
    - `Authorization: Bearer <JWT>` (Required)
- **Request Body:**
    ```json
    {
        "title": "Updated Title",
        "description": "Updated description of the problem.",
        "constraints": "Updated constraints",
        "inputFiles": ["newInput1.txt"],
        "outputFiles": ["newOutput1.txt"]
    }
    ```
- **Response:**
    ```json
    {
        "id": "abc123",
        "title": "Updated Title",
        "description": "Updated description of the problem.",
        "constraints": "Updated constraints",
        "inputFiles": ["newInput1.txt"],
        "outputFiles": ["newOutput1.txt"]
    }
    ```
- **Status Codes:**
    - `200 OK`: Problem successfully updated.
    - `401 Unauthorized`: Missing or invalid JWT token.
    - `404 Not Found`: Problem with specified ID does not exist.
    - `400 Bad Request`: Invalid request data.

### 5. Delete a Problem
- **URL:** `DELETE /api/problems/:id`
- **Description:** Deletes a problem by its ID.
- **Request Headers:**
    - `Authorization: Bearer <JWT>` (Required)
- **Request Body:** None
- **Response:**
    ```json
    { "message": "Problem deleted successfully" }
    ```
- **Status Codes:**
    - `200 OK`: Problem successfully deleted.
    - `401 Unauthorized`: Missing or invalid JWT token.
    - `404 Not Found`: Problem with specified ID does not exist.

## Submissions Endpoint

This API allows clients to manage submissions in an online judge system. 
The API supports creating and reading submission entries.

### Base URL
`/api/submissions`

### Submission Model
Each submission contains the following fields:

| Field        | Description                             |
|--------------|-----------------------------------------|
| `id`         | Unique identifier for the submission.   |
| `problemId`  | ID of the problem being submitted.      |
| `userId`     | ID of the user making the submission.   |
| `code`       | The code submitted by the user.         |
| `language`   | Programming language of the submission. |
| `status`     | Status of the submission (e.g., Accepted, Wrong Answer). |
| `createdAt`  | Timestamp of when the submission was made. |

### 1. Get All Submissions
- **URL:** `GET /api/submissions`
- **Description:** Retrieves a list of all submissions.
- **Request Headers:** None
- **Request Body:** None
- **Response:**
    ```json
    [
        {
            "id": "sub123",
            "problemId": "abc123",
            "userId": "user456",
            "code": "print('Hello, World!')",
            "language": "Python",
            "status": "Accepted",
            "createdAt": "2023-10-01T12:34:56Z"
        }
    ]
    ```
- **Status Codes:**
    - `200 OK`: Request successful.

### 2. Create a Submission
- **URL:** `POST /api/submissions`
- **Description:** Creates a new submission.
- **Request Headers:**
    - `Authorization: Bearer <JWT>` (Required)
- **Request Body:**
    ```json
    {
        "problemId": "abc123",
        "userId": "user456",
        "code": "print('Hello, World!')",
        "language": "Python"
    }
    ```
- **Response:**
    ```json
    {
        "id": "sub123",
        "problemId": "abc123",
        "userId": "user456",
        "code": "print('Hello, World!')",
        "language": "Python",
        "status": "Pending",
        "createdAt": "2023-10-01T12:34:56Z"
    }
    ```
- **Status Codes:**
    - `201 Created`: Submission successfully created.
    - `401 Unauthorized`: Missing or invalid JWT token.
    - `400 Bad Request`: Invalid request data.

### 3. Get Submission by ID
- **URL:** `GET /api/submissions/:id`
- **Description:** Retrieves a specific submission by its ID.
- **Request Headers:** None
- **Request Body:** None
- **Response:**
    ```json
    {
        "id": "sub123",
        "problemId": "abc123",
        "userId": "user456",
        "code": "print('Hello, World!')",
        "language": "Python",
        "status": "Accepted",
        "createdAt": "2023-10-01T12:34:56Z"
    }
    ```
- **Status Codes:**
    - `200 OK`: Request successful.
    - `404 Not Found`: Submission with specified ID does not exist.


## Users Endpoint

This API allows clients to manage users in the system. 
The API supports creating, reading, and updating user entries.

### Base URL
`/api/users`

### User Model
Each user contains the following fields:

| Field      | Description                        |
|------------|------------------------------------|
| `id`       | Unique identifier for the user.    |
| `name`     | Name of the user.                  |
| `email`    | Email address of the user.         |
| `password` | Password for the user's account.   |

### 1. Create a User
- **URL:** `POST /api/users`
- **Description:** Creates a new user.
- **Request Headers:** None
- **Request Body:**
    ```json
    {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "password": "securepassword"
    }
    ```
- **Response:**
    ```json
    {
        "id": "user123",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "password": "securepassword"
    }
    ```
- **Status Codes:**
    - `201 Created`: User successfully created.
    - `400 Bad Request`: Invalid request data.

### 2. Get User by ID
- **URL:** `GET /api/users/:id`
- **Description:** Retrieves a specific user by their ID.
- **Request Headers:** None
- **Request Body:** None
- **Response:**
    ```json
    {
        "id": "user123",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "password": "securepassword"
    }
    ```
- **Status Codes:**
    - `200 OK`: Request successful.
    - `404 Not Found`: User with specified ID does not exist.

### 3. Update a User
- **URL:** `PUT /api/users/:id`
- **Description:** Updates an existing user.
- **Request Headers:** None
- **Request Body:**
    ```json
    {
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "password": "newsecurepassword"
    }
    ```
- **Response:**
    ```json
    {
        "id": "user123",
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "password": "newsecurepassword"
    }
    ```
- **Status Codes:**
    - `200 OK`: User successfully updated.
    - `400 Bad Request`: Invalid request data.
    - `404 Not Found`: User with specified ID does not exist.