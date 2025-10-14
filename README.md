# Expense Tracker

A full-stack expense tracking application built with React, Node.js, and MongoDB.

## 🏗️ Project Structure

### Backend (`/backend`)
```
backend/
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/
│   ├── userController.js    # User authentication logic
│   └── transactionController.js # Transaction CRUD operations
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── models/
│   └── User.js              # Mongoose user schema
├── routes/
│   └── userRoutes.js        # API route definitions
├── validators/
│   └── schemas.js           # Zod validation schemas
├── server.js                # Main server file
└── package.json
```

### Frontend (`/frontend`)
```
frontend/
├── src/
│   ├── components/
│   │   ├── auth/            # Authentication components
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Logout.jsx
│   │   │   └── Guest.jsx
│   │   ├── layout/          # Layout components
│   │   │   └── Navbar.jsx
│   │   ├── pages/           # Page components
│   │   │   └── Home.jsx
│   │   └── transactions/     # Transaction components
│   │       ├── AddRecord.jsx
│   │       └── Record.jsx
│   ├── config/
│   │   └── api.js           # API configuration
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuth.js       # Authentication hooks
│   │   └── useTransactions.js # Transaction hooks
│   ├── lib/
│   │   └── queryClient.js   # TanStack Query configuration
│   ├── services/
│   │   └── api.js          # API service functions
│   ├── store/
│   │   └── atoms.js        # Recoil state atoms
│   ├── utils/
│   │   └── helpers.js      # Utility functions
│   ├── App.jsx             # Main app component
│   └── main.jsx            # App entry point
└── package.json
```

## 🚀 Features

- **User Authentication**: Sign up, login, and logout functionality
- **Transaction Management**: Add, view, and delete income/expense transactions
- **Real-time Updates**: Optimistic updates with TanStack Query
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **State Management**: Recoil for global state, TanStack Query for server state
- **Form Validation**: Client-side validation with helpful error messages
- **Error Handling**: Comprehensive error handling and user feedback

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Zod** - Schema validation
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TanStack Query** - Server state management
- **Recoil** - Client state management
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling framework
- **DaisyUI** - Component library
- **React Hot Toast** - Notifications
- **Axios** - HTTP client

## 📋 TanStack Query Best Practices Implemented

### 1. **Centralized Query Configuration**
- Custom query client with optimized defaults
- Centralized query keys for consistency
- Proper stale time and cache time configuration

### 2. **Custom Hooks**
- `useAuth` - Authentication operations
- `useTransactions` - Transaction operations
- `useVerifyToken` - Token verification

### 3. **Optimistic Updates**
- Immediate UI updates for better UX
- Automatic rollback on errors
- Cache invalidation strategies

### 4. **Error Handling**
- Retry logic with smart retry conditions
- Proper error boundaries
- User-friendly error messages

### 5. **Performance Optimizations**
- Query prefetching
- Background refetching
- Proper cache management

### 6. **Developer Experience**
- React Query DevTools integration
- TypeScript-ready structure
- Comprehensive logging

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expenses-tracker
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   - Create `.env` file in backend directory:
     ```
     URL=mongodb://localhost:27017/expense-tracker
     SECRET=your-super-secret-jwt-key
     PORT=3000
     NODE_ENV=development
     FRONTEND_URL=http://localhost:5173
     ```

5. **Start the application**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

## 📝 API Endpoints

### Authentication
- `POST /user/signup` - User registration
- `POST /user/login` - User login
- `GET /user/verify/:token` - Token verification

### Transactions
- `GET /user/entry` - Get user transactions
- `POST /user/entry` - Add new transaction
- `DELETE /user/entry/:id` - Delete transaction

## 🎯 Key Improvements Made

### Code Organization
- **Separation of Concerns**: Clear separation between components, services, and business logic
- **Modular Structure**: Organized files by feature and responsibility
- **Consistent Naming**: Standardized naming conventions throughout

### Performance
- **Optimistic Updates**: Immediate UI feedback
- **Smart Caching**: Efficient data caching strategies
- **Background Sync**: Automatic data synchronization

### Developer Experience
- **Custom Hooks**: Reusable logic encapsulation
- **Type Safety**: TypeScript-ready structure
- **Error Boundaries**: Comprehensive error handling
- **DevTools**: React Query DevTools for debugging

### User Experience
- **Loading States**: Proper loading indicators
- **Error Messages**: User-friendly error feedback
- **Form Validation**: Real-time validation feedback
- **Responsive Design**: Mobile-first approach

## 🔧 Available Scripts

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📚 Learning Resources

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [React Query Best Practices](https://tkdodo.eu/blog/practical-react-query)
- [Recoil Documentation](https://recoiljs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express.js Guide](https://expressjs.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.