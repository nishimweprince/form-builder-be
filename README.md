# Form builder

The backend of a form builder application, built with Node.js, Express.js, and TypeORM.

---

## Table of Contents

- [Features](#features)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Routes](#api-routes)
- [Core Entities](#core-entities)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- User authentication (signup, login) with JWT
- Role-based access control
- User and role management
- Centralized error handling
- PostgreSQL database integration via TypeORM
- Clustered server for multi-core performance

---

## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd form-builder-be
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy the example below and create a `.env` file in the root directory.
   - Fill in your actual credentials.

---

## Environment Variables

Create a `.env` file in the root directory and refer to the `.env.example` file for the variables.

```env
# Server
PORT=8080

# Database (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

# JWT
JWT_SECRET=your_jwt_secret
```

- `PORT`: Port for the server (default: 8080)
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`: PostgreSQL connection details
- `JWT_SECRET`: Secret key for signing JWT tokens

---

## Running the Application

```bash
npm run dev   # Start the server (uses clustering for all CPU cores)
```

The server will start on the port specified in your `.env` file (default: 8080).

---

## API Routes

All routes are prefixed with `/api`.

### Auth Routes

| Method | Endpoint         | Description         | Body Params                |
|--------|------------------|---------------------|----------------------------|
| POST   | `/api/auth/signup` | Register a new user | `{ name, email, password, ... }` |
| POST   | `/api/auth/login`  | Login a user        | `{ email, password }`      |

**Response Example:**
```json
{
  "message": "User registered successfully",
  "data": {
    "user": { /* user fields */ },
    "token": "jwt_token"
  }
}
```

### Role Routes

| Method | Endpoint         | Description         | Body Params                |
|--------|------------------|---------------------|----------------------------|
| POST   | `/api/roles/`    | Create a new role   | `{ name, description, label, status }` |

---

## Core Entities

### User

Represents an application user.

| Field         | Type     | Description                        |
|---------------|----------|------------------------------------|
| id            | uuid     | Primary key                        |
| name          | string   | User's name                        |
| email         | string   | User's email (unique)              |
| phoneNumber   | string   | User's phone number                |
| gender        | enum     | `MALE` or `FEMALE`                 |
| dateOfBirth   | date     | Date of birth                      |
| status        | enum     | `ACTIVE` or `INACTIVE`             |
| nationality   | enum     | ISO country code (e.g., 'RW')      |
| passwordHash  | string   | Hashed password                    |
| userRoles     | array    | List of user roles                 |

### Role

Defines a user role.

| Field       | Type   | Description                        |
|-------------|--------|------------------------------------|
| id          | uuid   | Primary key                        |
| name        | enum   | `ADMIN`, `SUPER_ADMIN`, `USER`     |
| description | string | Description of the role            |
| label       | string | Human-readable label               |
| status      | enum   | `ACTIVE` or `INACTIVE`             |
| userRoles   | array  | Users with this role               |

### UserRole

Join table for users and roles.

| Field   | Type   | Description         |
|---------|--------|---------------------|
| id      | uuid   | Primary key         |
| userId  | uuid   | Reference to User   |
| roleId  | uuid   | Reference to Role   |
| user    | User   | User entity         |
| role    | Role   | Role entity         |

### Log

Tracks system events and user actions.

| Field         | Type   | Description                        |
|---------------|--------|------------------------------------|
| id            | uuid   | Primary key                        |
| message       | string | Log message                        |
| userId        | uuid   | Reference to User (optional)       |
| type          | enum   | Log type (see `LogTypes`)          |
| referenceId   | string | Reference to related entity        |
| referenceType | enum   | Type of referenced entity          |
| user          | User   | User entity                        |

---

**For more details, see the codebase and inline documentation.**
