# Student Management Application

This project is a full-stack TypeScript application for managing student records built with Node.js and DynamoDB on the backend and React with TypeScript for the frontend.

## Technologies

- React
- TypeScript
- Node.js
- Express
- AWS DynamoDB

## Features

- **Backend**:

  - CRUD operations for student records.
  - AWS DynamoDB integration for data storage.
  - RESTful API endpoints for interaction.

- **Frontend**:
  - User interface for adding, viewing, editing, and deleting student records.
  - Integration with the backend API for data management.
  - Responsive design for various screen sizes.

## Getting Started

### Prerequisites

- Node.js
- AWS account with DynamoDB access

### Installation

#### Backend

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory and add your AWS credentials:

   ```plaintext
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   ```

4. Start the backend server:
   ```bash
   npx ts-node src/server.ts
   ```
   The server will run on `http://localhost:5000`.

#### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd front-end
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend application:
   ```bash
   npm start
   ```
   The application will run on `http://localhost:3000`.

## API Endpoints

- `GET /students`: Fetch all students
- `GET /students/:id`: Fetch a student by ID
- `POST /students`: Add a new student
- `PUT /students/:id`: Update a student
- `DELETE /students/:id`: Delete a student
- `GET /students/specialization/:specialization`: Search students by specialization

## Components

- **Header**: Navigation bar for routing.
- **Footer**: Footer section of the application.
- **AddStudent**: Form for adding new students.
- **StudentList**: Displays the list of students with options to edit or delete.
- **About**: Information about the application.

## License

This project is licensed under the MIT License.
