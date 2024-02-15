# Blinkit - Web Application

Blinkit is a web application built using Node.js, Express, MongoDB, and other technologies. It provides a simple authentication system allowing users to sign up, log in, and edit their profiles.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Extract the zip:

    ```bash
    cd blinkit/web\ Application/
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure MongoDB:

    - Make sure MongoDB is installed and running on your machine.
    - Update the MongoDB connection string in `index.js`:

        ```javascript
        mongoose.connect('mongodb://localhost:27017/your-database-name');
        ```

4. Start the application:

    ```bash
    npm start
    ```

## Usage

- Access the application by navigating to [http://localhost:3000](http://localhost:3000) in your web browser.

- Sign up for a new account or log in with existing credentials.

- Explore the home page with basic user information.

- Edit your profile by navigating to the "Edit Profile" section.

## Features

- User authentication (Sign up, Log in, Log out).
- Profile editing with a password change option.
- Profile picture upload.
- Session-based authentication.

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- Bcrypt
- Express Session
- Multer

## Contributing

If you'd like to contribute to this project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Submit a pull request.