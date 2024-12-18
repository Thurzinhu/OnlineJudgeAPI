# OnlineJudge

This project consists of a OnlineJudge API built with Express.js and MongoDB. The API was designed to power an online competitive programming platform. It follows the MVC (Model-View-Controller) architecture to ensure a clean separation of concerns and maintainable code structure.

## Documentation Endpoints
- `/api/docs`: Access the Swagger documentation for the API.
- `/api/docs.json`: View the API documentation in JSON format.

## Technologies Used
- **Express.js**: A web application framework for Node.js.
- **MongoDB**: A NoSQL database for storing data.

### Getting Started

1. **Clone the repository**:
    ```sh
    git clone https://github.com/yourusername/your-repo.git
    cd your-repo
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add the following:
    ```env
    PORT=3000
    ACCESS_TOKEN_SECRET=jwt_access_token_secret
    REFRESH_TOKEN_SECRET=jwt_refresh_token_secret
    DATABASE_CONNECTION_STRING=mongodb_connection_string
    ```

4. **Run the application**:
    ```sh
    npm start
    ```

5. **Access the API**:
    Open your browser or API client (like Postman) and navigate to `http://localhost:3000/api/docs`.