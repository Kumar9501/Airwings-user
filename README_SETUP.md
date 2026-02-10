# Airwing Journeys - Backend & Admin Panel Setup

This project has been restructured to remove Supabase and implement a custom backend API with an admin panel.

## Project Structure

```
├── backend/          # Node.js/Express API server
├── admin-panel/      # React admin panel
└── src/             # Frontend application (existing)
```

## Backend Setup

### 1. Navigate to backend directory
```bash
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the `backend` directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/airwing_db?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
ADMIN_PANEL_URL=http://localhost:5174
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
```

### 4. Set up database
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database (for development)
npm run db:push

# Or run migrations (for production)
npm run db:migrate
```

### 5. Create initial admin user
You'll need to create the first admin user manually. You can:
- Use Prisma Studio: `npm run db:studio`
- Or create a seed script to add an admin user

### 6. Start the backend server
```bash
npm run dev
```

The API will be available at `http://localhost:3001`

## Admin Panel Setup

### 1. Navigate to admin-panel directory
```bash
cd admin-panel
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the `admin-panel` directory:
```env
VITE_API_URL=http://localhost:3001/api
```

### 4. Start the admin panel
```bash
npm run dev
```

The admin panel will be available at `http://localhost:5174`

## Frontend Setup (Updated)

### 1. Remove Supabase dependencies
```bash
npm uninstall @supabase/supabase-js
```

### 2. Update environment variables
Add to your `.env` file:
```env
VITE_API_URL=http://localhost:3001/api
```

### 3. The frontend will now consume data from the backend API instead of Supabase

## Database Schema

The backend uses Prisma with PostgreSQL. Key models include:
- `AdminUser` - Admin panel users
- `Service` - Travel services
- `TravelPackage` - Travel packages
- `WebsitePage` - Dynamic website pages (About, Contact, etc.)
- `Blog` - Blog posts
- `WebsiteSetting` - Website settings (logo, contact info, etc.)
- `Enquiry` - Contact form enquiries

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
- `GET /api/admin/users` - Get all admin users
- `POST /api/admin/users` - Create admin user
- `PUT /api/admin/users/:id` - Update admin user
- `DELETE /api/admin/users/:id` - Delete admin user
- Similar CRUD endpoints for packages, services, pages, blogs, settings, and enquiries

## Admin Panel Features

The admin panel includes modules for:
1. **Admin Users** - Manage admin accounts
2. **Travel Packages** - Create and manage travel packages
3. **Services** - Manage travel services
4. **Website Pages** - Manage dynamic pages (About Us, Contact, Certificates, etc.)
5. **Blogs** - Manage blog posts
6. **Settings** - Update website settings (logo, header/footer contact details)
7. **Enquiries** - View and manage contact form submissions

## Next Steps

1. Set up your PostgreSQL database
2. Run the backend migrations
3. Create your first admin user
4. Start both backend and admin panel servers
5. Update the frontend to use the new API endpoints
6. Remove Supabase references from the frontend code

## Notes

- The backend uses JWT for authentication
- File uploads are stored in the `uploads` directory
- Make sure to configure CORS properly for production
- Update the JWT_SECRET in production
- The admin panel and frontend are separate React applications

