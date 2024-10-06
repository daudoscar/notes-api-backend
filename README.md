
# Notes App Back-End

This is a simple back-end application for managing notes, created as part of a project for Dicoding. The application provides RESTful APIs for adding, retrieving, updating, and deleting notes. The notes data is stored in memory (JavaScript array), so no database is required for this project.

## Features
- **Add Note**: Allows the client to add a new note by sending a `POST` request.
- **View Notes**: Fetches all notes or a specific note by ID with a `GET` request.
- **Update Note**: Updates a specific note by sending a `PUT` request with the note's updated content.
- **Delete Note**: Deletes a specific note by sending a `DELETE` request.

## Installation and Running the Project

### Prerequisites
Before running the project, make sure you have **Node.js** installed. You can download and install Node.js from [here](https://nodejs.org/).

### Clone the Repository
First, clone this repository to your local machine:
```bash
git clone https://github.com/your-repo/notes-app-backend.git
```

### Install Dependencies
Navigate to the project directory and install the dependencies:
```bash
cd notes-app-backend
npm install
```

### Running the Server
To run the server in development mode with **Nodemon**, use the following command:
```bash
npm run start
```

The server will start and run on `http://localhost:5000`.

### Testing the Endpoints
You can use tools like **Postman** or **curl** to test the API endpoints. Below are the available endpoints:

1. **Add a Note** (POST)
   - URL: `http://localhost:5000/notes`
   - Body (JSON):
     ```json
     {
       "title": "Your Note Title",
       "tags": ["Tag 1", "Tag 2"],
       "body": "Your note content"
     }
     ```
   - Response: 
     ```json
     {
       "status": "success",
       "message": "Catatan berhasil ditambahkan",
       "data": {
         "noteId": "generated-note-id"
       }
     }
     ```

2. **Get All Notes** (GET)
   - URL: `http://localhost:5000/notes`
   - Response: 
     ```json
     {
       "status": "success",
       "data": {
         "notes": [
           {
             "id": "note-id",
             "title": "Your Note Title",
             "createdAt": "timestamp",
             "updatedAt": "timestamp",
             "tags": ["Tag 1", "Tag 2"],
             "body": "Your note content"
           }
         ]
       }
     }
     ```

3. **Get Note by ID** (GET)
   - URL: `http://localhost:5000/notes/{id}`
   - Response (on success): 
     ```json
     {
       "status": "success",
       "data": {
         "note": {
           "id": "note-id",
           "title": "Your Note Title",
           "createdAt": "timestamp",
           "updatedAt": "timestamp",
           "tags": ["Tag 1", "Tag 2"],
           "body": "Your note content"
         }
       }
     }
     ```
   - Response (on failure):
     ```json
     {
       "status": "fail",
       "message": "Catatan tidak ditemukan"
     }
     ```

4. **Update Note by ID** (PUT)
   - URL: `http://localhost:5000/notes/{id}`
   - Body (JSON):
     ```json
     {
       "title": "Updated Note Title",
       "tags": ["Tag 1", "Tag 2"],
       "body": "Updated note content"
     }
     ```
   - Response:
     ```json
     {
       "status": "success",
       "message": "Catatan berhasil diperbarui"
     }
     ```

5. **Delete Note by ID** (DELETE)
   - URL: `http://localhost:5000/notes/{id}`
   - Response:
     ```json
     {
       "status": "success",
       "message": "Catatan berhasil dihapus"
     }
     ```

### Project Structure
```
notes-app-back-end
├── node_modules
├── src
│   ├── handler.js       # Contains the logic for handling requests
│   ├── notes.js         # In-memory array to store the notes
│   ├── routes.js        # Defines the routes and maps them to the handlers
│   └── server.js        # Creates and starts the HTTP server
├── .eslintrc.json       # ESLint configuration file
├── package.json         # Project metadata and dependencies
├── package-lock.json    # Lockfile for exact dependency versions
└── README.md            # Project documentation
```

### Author
This project is developed by **Daud** for a project in Dicoding.

### License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

