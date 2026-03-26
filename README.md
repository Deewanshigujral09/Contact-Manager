# Contact Management Application - MERN Stack

A full-featured Contact Management application built with MongoDB, Express.js, React, and Node.js (MERN stack). This application provides complete authentication, contact CRUD operations, search, and filtering capabilities.

## Features

### Authentication
- User Registration with validation
- User Login with JWT authentication
- Password hashing with bcrypt
- Persistent login with localStorage
- Protected routes

### Contact Management
- Create new contacts
- Update existing contacts
- Delete contacts
- View contact details
- Search contacts by name, email, or phone
- Filter contacts by group (Work, Personal, Family, Other)
- All contacts scoped to logged-in user

### Validations
- Email format validation
- Phone number (must be exactly 10 digits)
- Password requirements:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled

### Frontend
- React 18
- Vite
- Context API for state management
- Axios for API calls
- Lucide React for icons
- Inline CSS styling

## Project Structure

```
contact-management/
├── server/                 # Backend
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── models/
│   │   ├── User.js        # User model
│   │   └── Contact.js     # Contact model
│   ├── controllers/
│   │   ├── authController.js
│   │   └── contactController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── contactRoutes.js
│   ├── .env               # Environment variables
│   ├── server.js          # Entry point
│   └── package.json
│
└── src/                   # Frontend
    ├── api/
    │   ├── authApi.js
    │   └── contactApi.js
    ├── context/
    │   ├── AuthContext.jsx
    │   └── ContactContext.jsx
    ├── components/
    │   ├── Avatar.jsx
    │   ├── ContactCard.jsx
    │   ├── ContactModal.jsx
    │   ├── ContactDetail.jsx
    │   └── Toast.jsx
    ├── pages/
    │   ├── AuthPage.jsx
    │   └── Dashboard.jsx
    ├── App.tsx
    ├── main.tsx
    └── index.css
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB installed locally OR MongoDB Atlas account
- npm or yarn package manager

## Installation & Setup

### 1. MongoDB Setup

#### Option A: Local MongoDB
```bash
# Install MongoDB on your system
# macOS
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# MongoDB will run on mongodb://localhost:27017
```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Get your connection string
4. Update `server/.env` with your Atlas connection string

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Configure environment variables
# Edit .env file and update these values:
MONGO_URI=mongodb://localhost:27017/contact-management
JWT_SECRET=your_secret_key_here
PORT=5000

# Start the backend server
npm run dev

# Server will run on http://localhost:5000
```

### 3. Frontend Setup

```bash
# Navigate to project root (if in server directory)
cd ..

# Install dependencies
npm install

# Start the frontend development server
npm run dev

# Frontend will run on http://localhost:5173
```

## API Endpoints

### Authentication
```
POST   /api/auth/register    # Register new user
POST   /api/auth/login        # Login user
GET    /api/auth/me           # Get current user (protected)
```

### Contacts
```
GET    /api/contacts          # Get all contacts for user (protected)
POST   /api/contacts          # Create new contact (protected)
GET    /api/contacts/:id      # Get single contact (protected)
PUT    /api/contacts/:id      # Update contact (protected)
DELETE /api/contacts/:id      # Delete contact (protected)
```

## Environment Variables

### Backend (.env in server folder)
```
MONGO_URI=mongodb://localhost:27017/contact-management
JWT_SECRET=your_jwt_secret_key_change_in_production
PORT=5000
```

## Usage

### 1. Register/Login
- Open http://localhost:5173
- Create a new account or login with existing credentials
- Password must meet validation requirements

### 2. Manage Contacts
- Click "Add Contact" to create a new contact
- Fill in contact details (name, email, phone are required)
- Select a group for the contact
- Use search bar to find contacts
- Filter contacts by group using the filter buttons
- Click on a contact card to view full details
- Edit or delete contacts using the action buttons

### 3. Search & Filter
- Search by name, email, or phone number
- Filter by group: All, Work, Personal, Family, Other
- Combine search and filters for precise results

## Database Schema

### User Collection
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (hashed),
  createdAt: Date
}
```

### Contact Collection
```javascript
{
  userId: ObjectId (ref: User),
  name: String (required),
  email: String (required),
  phone: String (required, 10 digits),
  company: String,
  group: String (enum: Work, Personal, Family, Other),
  createdAt: Date
}
```

## Security Features

- Passwords hashed with bcrypt
- JWT token-based authentication
- Protected API routes
- User-specific contact scoping
- Input validation on both frontend and backend
- CORS enabled for cross-origin requests

## Development Scripts

### Backend
```bash
npm run dev    # Start with auto-reload
npm start      # Start production server
```

### Frontend
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run lint   # Run ESLint
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally
- Check connection string in .env
- Verify network access if using MongoDB Atlas

### Port Already in Use
- Backend: Change PORT in server/.env
- Frontend: Vite will automatically use next available port

### CORS Errors
- Ensure backend is running on port 5000
- Check CORS configuration in server.js

## Future Enhancements

- Contact import/export (CSV, vCard)
- Contact photos/avatars upload
- Tags for contacts
- Notes for each contact
- Dark mode
- Email/SMS integration
- Contact sharing

## Author

Deewanshi Gujral, Built with MERN Stack
