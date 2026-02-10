# Migration Guide: Supabase to Custom Backend

This guide outlines the changes made to migrate from Supabase to a custom backend API.

## Summary of Changes

### 1. Backend API Created
- **Location**: `backend/` directory
- **Technology**: Node.js, Express.js, TypeScript, Prisma ORM, PostgreSQL
- **Features**:
  - RESTful API endpoints
  - JWT authentication
  - Database models for all entities
  - File upload support
  - CORS configuration

### 2. Admin Panel Created
- **Location**: `admin-panel/` directory
- **Technology**: React, TypeScript, TanStack Query
- **Features**:
  - Admin user management
  - Travel packages management
  - Services management
  - Website pages management
  - Blog management
  - Settings management
  - Enquiries management

### 3. Frontend Updates
- **Removed**: Supabase client and types
- **Added**: Custom API client (`src/lib/api.ts`)
- **Updated**: Pages to use API instead of mock data
- **Updated**: Contact form to submit to API

## Files Removed

- `src/integrations/supabase/client.ts`
- `src/integrations/supabase/types.ts`
- `supabase/config.toml` (if exists)

## Files Added

### Backend
- `backend/package.json`
- `backend/tsconfig.json`
- `backend/prisma/schema.prisma`
- `backend/src/index.ts`
- `backend/src/middleware/auth.ts`
- `backend/src/routes/*.ts` (all route files)
- `backend/src/utils/upload.ts`
- `backend/src/scripts/seed.ts`

### Admin Panel
- `admin-panel/package.json`
- `admin-panel/src/App.tsx`
- `admin-panel/src/lib/api.ts`
- `admin-panel/src/hooks/useAuth.tsx`
- `admin-panel/src/components/Layout.tsx`
- `admin-panel/src/pages/*.tsx` (all page components)
- `admin-panel/src/components/ui/*.tsx` (UI components)

### Frontend
- `src/lib/api.ts`

## Database Schema

The new database schema includes:

1. **AdminUser** - Admin panel authentication
2. **Service** - Travel services
3. **TravelPackage** - Travel packages with all details
4. **WebsitePage** - Dynamic pages (About, Contact, etc.)
5. **Blog** - Blog posts
6. **WebsiteSetting** - Key-value settings store
7. **Enquiry** - Contact form submissions

## API Endpoints

### Public Endpoints
- `GET /api/packages` - Get all packages
- `GET /api/packages/:id` - Get single package
- `GET /api/services` - Get all services
- `GET /api/pages` - Get published pages
- `GET /api/pages/slug/:slug` - Get page by slug
- `GET /api/blogs` - Get published blogs
- `GET /api/blogs/slug/:slug` - Get blog by slug
- `GET /api/settings` - Get all settings
- `POST /api/enquiries` - Create enquiry

### Admin Endpoints (Require JWT)
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user
- Full CRUD for all entities under `/api/admin/*`, `/api/packages`, `/api/services`, etc.

## Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"
PORT=3001
FRONTEND_URL=http://localhost:5173
ADMIN_PANEL_URL=http://localhost:5174
```

### Admin Panel (.env)
```env
VITE_API_URL=http://localhost:3001/api
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001/api
```

## Migration Steps

1. **Set up PostgreSQL database**
   ```bash
   # Create database
   createdb airwing_db
   ```

2. **Set up backend**
   ```bash
   cd backend
   npm install
   # Update .env with database URL
   npm run db:generate
   npm run db:push
   npm run db:seed  # Creates default admin
   npm run dev
   ```

3. **Set up admin panel**
   ```bash
   cd admin-panel
   npm install
   # Update .env with API URL
   npm run dev
   ```

4. **Update frontend**
   ```bash
   npm uninstall @supabase/supabase-js
   # Update .env with API URL
   npm run dev
   ```

5. **Test the setup**
   - Access admin panel at http://localhost:5174
   - Login with default credentials (admin@airwing.com / admin123)
   - Create some packages, services, etc.
   - Verify frontend displays data from API

## Data Migration

If you have existing data in Supabase:

1. Export data from Supabase tables
2. Transform data to match new schema
3. Use Prisma Studio or create migration scripts to import data
4. Update image URLs if using Supabase Storage (migrate to your file storage)

## Breaking Changes

1. **Authentication**: No longer using Supabase Auth. Admin panel uses JWT.
2. **Database**: Direct PostgreSQL connection instead of Supabase
3. **File Storage**: Need to set up file storage (local or cloud)
4. **Real-time**: No Supabase real-time subscriptions (can add WebSockets if needed)

## Next Steps

1. Set up production database
2. Configure file storage (AWS S3, Cloudinary, etc.)
3. Set up CI/CD pipelines
4. Configure production environment variables
5. Set up monitoring and logging
6. Add rate limiting and security measures

## Support

For issues or questions:
1. Check the README.md for setup instructions
2. Review the API endpoints documentation
3. Check backend logs for errors
4. Verify database connection and migrations

