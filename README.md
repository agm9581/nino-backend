# Live Chat Application

A real-time chat application built with NestJS backend and Angular frontend.

## Features

- Real-time messaging using WebSocket
- User authentication with JWT
- Message history storage in MongoDB
- Responsive UI with Bootstrap
- Protected routes

## Project Structure

```
/backend - NestJS server application
/frontend - Angular client application
```

## Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Angular CLI
- NestJS CLI

## Setup Instructions

### Backend
1. Navigate to backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file with your MongoDB connection string and JWT secret
4. Run the development server: `npm run start:dev`

### Frontend
1. Navigate to frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Run the development server: `ng serve`

The application will be available at:
- Frontend: http://localhost:4200
- Backend: http://localhost:3000 