# Complete Setup Guide - Airwing Project

This guide will help you set up the entire project (Backend, Frontend, and Admin Panel) from scratch.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

## Step 1: Install Dependencies

### Backend

```bash
cd backend
npm install
```

### Admin Panel

```bash
cd admin-panel
npm install
```

### Frontend (Main Website)

```bash
npm install
```

## Step 2: Setup Backend

### 2.1 Configure Environment

The `.env` file should already be configured. If not, create `backend/.env`:

```env
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
ADMIN_PANEL_URL=http://localhost:5174
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
```

### 2.2 Initialize Database

Run the automated setup:

```bash
cd backend
node setup.js
```

Or manually:

```bash
cd backend
npm run db:generate  # Generate Prisma Client
npm run db:push      # Create database tables
npm run db:seed      # Create admin user
```

### 2.3 Start Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
✅ Database connected successfully
✅ Found 1 admin user(s)
🚀 Server running on http://localhost:3001
```

## Step 3: Setup Admin Panel

### 3.1 Configure Environment (Optional)

Create `admin-panel/.env` if you need to change the API URL:

```env
VITE_API_URL=http://localhost:3001/api
```

### 3.2 Start Admin Panel

```bash
cd admin-panel
npm run dev
```

The admin panel will be available at `http://localhost:5174`

## Step 4: Login to Admin Panel

1. Open `http://localhost:5174` in your browser
2. You'll be redirected to the login page
3. Use these credentials:
   - **Email**: `admin@airwing.com`
   - **Password**: `admin123`

## Step 5: Setup Frontend (Main Website)

The frontend should already be configured. Start it with:

```bash
npm run dev
```

The website will be available at `http://localhost:5173`

## Troubleshooting

### Backend Issues

#### Error: "Cannot connect to database"

**Solution:**
1. Make sure you ran `npm run db:generate` and `npm run db:push`
2. Check that `backend/.env` has correct `DATABASE_URL`
3. Verify the database file exists at `backend/prisma/dev.db`

#### Error: "PrismaClient is not configured"

**Solution:**
```bash
cd backend
npm run db:generate
```

#### Error: "Table does not exist"

**Solution:**
```bash
cd backend
npm run db:push
```

#### Error: "Invalid credentials" (but password is correct)

**Solution:**
```bash
cd backend
npm run db:seed
```

This will create/reset the admin user.

### Admin Panel Issues

#### Error: "Network error" or "Failed to fetch"

**Solution:**
1. Make sure backend is running on `http://localhost:3001`
2. Check `admin-panel/.env` has correct `VITE_API_URL`
3. Restart the admin panel dev server after changing `.env`

#### Error: "401 Unauthorized"

**Solution:**
1. Make sure you're logged in
2. Clear browser localStorage: `localStorage.removeItem('admin_token')`
3. Try logging in again

### Frontend Issues

#### Error: "Cannot connect to API"

**Solution:**
1. Make sure backend is running
2. Check CORS settings in `backend/.env`
3. Verify `FRONTEND_URL` matches your frontend URL

## Project Structure

```
.
├── backend/              # Backend API server
│   ├── src/
│   │   ├── index.ts     # Main server file
│   │   ├── routes/      # API routes
│   │   ├── middleware/  # Auth middleware
│   │   └── utils/       # Utilities
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── dev.db       # SQLite database
│   └── .env
│
├── admin-panel/         # Admin dashboard (React)
│   ├── src/
│   │   ├── pages/      # Admin pages
│   │   ├── components/ # UI components
│   │   └── lib/        # API client
│   └── .env
│
└── src/                 # Main website frontend
    ├── pages/
    ├── components/
    └── lib/
```

## Default Credentials

After running `npm run db:seed`:

- **Email**: `admin@airwing.com`
- **Password**: `admin123`

⚠️ **Change this password immediately after first login!**

## Development Workflow

1. **Start Backend**: `cd backend && npm run dev`
2. **Start Admin Panel**: `cd admin-panel && npm run dev`
3. **Start Frontend**: `npm run dev` (from root)

All three should run simultaneously:
- Backend: `http://localhost:3001`
- Admin Panel: `http://localhost:5174`
- Frontend: `http://localhost:5173`

## Database Management

### View Database

```bash
cd backend
npm run db:studio
```

This opens Prisma Studio where you can view and edit database records.

### Reset Database

⚠️ **Warning**: This deletes all data!

```bash
cd backend
rm prisma/dev.db        # Delete database
npm run db:push         # Recreate tables
npm run db:seed         # Seed admin user
```

## API Documentation

See `backend/README.md` for complete API documentation.

## Need Help?

1. Check server logs for detailed error messages
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Make sure database is initialized (`npm run db:push`)
