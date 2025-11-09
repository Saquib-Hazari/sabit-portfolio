# React + TypeScript Portfolio Website

## 🚀 Project Overview
A modern, full-stack portfolio website built with React and TypeScript, featuring secure authentication, role-based access control, and dynamic content management.

**🌐 Live Website: [sabit-portfolio-sigma.vercel.app](https://sabit-portfolio-sigma.vercel.app/)**

## 🛠️ Technology Stack

### Frontend
- **⚛️ React** - Component-based UI library
- **📘 TypeScript** - Type-safe JavaScript development
- **🎨 Chakra UI** - Modern component library
- **🔄 React Hook Form** - Form handling and validation
- **🛣️ React Router** - Client-side routing
- **🔐 Context API** - State management for authentication

### Backend
- **🟢 Node.js** - Runtime environment
- **🚂 Express.js** - Web application framework
- **🔑 JWT** - JSON Web Tokens for authentication
- **🔒 Bcrypt** - Password hashing

### Database & Storage
- **🗃️ MongoDB** - NoSQL database for user and project data
- **🌩️ Cloudinary** - Cloud image and video management
- **📊 Mongoose** - MongoDB object modeling

### Deployment
- **🖥️ Vercel** - Frontend deployment platform
- **🔧 Render** - Backend deployment service
- **🌐 Live Production** - Fully deployed and accessible

## 🔐 Authentication System

### Role-Based Access Control
```typescript
// User roles definition
type UserRole = 'admin' | 'user';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
}
