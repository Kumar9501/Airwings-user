# Airwing Journeys

A travel agency website with a custom backend API and admin panel.

## Project Structure

- `backend/` - Node.js/Express API server with Prisma ORM
- `admin-panel/` - React admin panel for content management
- `src/` - Frontend React application

## Quick Start

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (create `.env` file):
```env
DATABASE_URL="postgresql://user:password@localhost:5432/airwing_db?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
ADMIN_PANEL_URL=http://localhost:5174
```

4. Set up database:
```bash
npm run db:generate
npm run db:push
npm run db:seed  # Creates default admin user (admin@airwing.com / admin123)
```

5. Start the server:
```bash
npm run dev
```

### Admin Panel Setup

1. Navigate to admin-panel directory:
```bash
cd admin-panel
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (create `.env` file):
```env
VITE_API_URL=http://localhost:3001/api
```

4. Start the admin panel:
```bash
npm run dev
```

Access the admin panel at `http://localhost:5174`

Default login:
- Email: `admin@airwing.com`
- Password: `admin123`

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (create `.env` file):
```env
VITE_API_URL=http://localhost:3001/api
```

3. Start the frontend:
```bash
npm run dev
```

## Features

### Backend API
- RESTful API with Express.js
- PostgreSQL database with Prisma ORM
- JWT authentication
- File upload support
- CORS enabled for frontend and admin panel

### Admin Panel
- Admin user management
- Travel packages management
- Services management
- Website pages management (About, Contact, Certificates, etc.)
- Blog management
- Website settings (Logo, Header/Footer contact details)
- Enquiries management

### Frontend
- Responsive design
- Package browsing and filtering
- Service listings
- Contact form
- Dynamic content from backend API

## API Endpoints

### Public Endpoints
- `GET /api/packages` - Get all packages
- `GET /api/packages/:id` - Get single package
- `GET /api/services` - Get all services
- `GET /api/pages` - Get published pages
- `GET /api/blogs` - Get published blogs
- `GET /api/settings` - Get website settings
- `POST /api/enquiries` - Create enquiry

### Admin Endpoints (Require Authentication)
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user
- CRUD operations for all entities (packages, services, pages, blogs, settings, enquiries, admin users)

## Database Models

- `AdminUser` - Admin panel users
- `Service` - Travel services
- `TravelPackage` - Travel packages
- `WebsitePage` - Dynamic website pages
- `Blog` - Blog posts
- `WebsiteSetting` - Website settings
- `Enquiry` - Contact form enquiries

## Development

### Backend
- Uses TypeScript
- Prisma for database management
- Express.js for API routes
- JWT for authentication

### Admin Panel
- React with TypeScript
- TanStack Query for data fetching
- React Router for navigation
- Shadcn UI components

### Frontend
- React with TypeScript
- Vite for build tooling
- React Router for navigation
- TanStack Query for data fetching
- Tailwind CSS for styling

## Production Deployment

1. Set up PostgreSQL database
2. Update environment variables for production
3. Run database migrations: `npm run db:migrate`
4. Build backend: `npm run build`
5. Build admin panel: `npm run build`
6. Build frontend: `npm run build`
7. Deploy using your preferred hosting service

## Notes

- Make sure to change the default admin password after first login
- Update JWT_SECRET in production
- Configure CORS properly for production domains
- Set up proper file storage for uploads in production
