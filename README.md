# ShppingList

The Share List Project is a web application that allows users to manage their shopping lists and share them with others. This repository contains the backend implementation of the project, built using Node.js, TypeScript, and MongoDB.

## Features

- Users can create shopping lists and manage their items.
- Users can share their shopping lists with other users, granting them read or write permission.
- Users can view the shopping lists that have been shared with them and see the permission levels granted.

## Technologies Used

- Node.js
- TypeScript
- MongoDB
- Express.js
- JSON Web Tokens (JWT) for authentication

## Getting Started

### Prerequisites

- Node.js and npm (Node Package Manager) installed on your machine
- MongoDB installed and running

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/share-list-project.git
   cd share-list-project'

2. **Install dependencies:**

    ```bash
    npm install

3. **consts.ts:**
    ```bash
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_secret

4.  **Start the Server:**
    ```bash
    npm run start

    The server should now be running at [http://localhost:3000](http://localhost:3000).

## API Endpoints

- **POST /api/lists/share:** Share a shopping list with another user.
- **GET /api/lists/shared/:userId:** View all shopping lists shared with a specific user.

## Contributing

Contributions are welcome! If you find any bugs or want to add new features, feel free to create issues or pull requests.

    
