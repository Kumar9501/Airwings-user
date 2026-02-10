# Troubleshooting: Packages Not Showing After Creation

## Problem
Frontend always shows 6 mock packages instead of packages created in admin panel.

## Root Cause
The frontend falls back to mock data when the API call fails. This happens when:
1. Backend is not running
2. CORS issues
3. Wrong API URL
4. Network errors

## Solution Steps

### Step 1: Check Backend is Running
```bash
cd backend
npm run dev
```

You should see:
```
✅ Database connected successfully
✅ Found X admin user(s)
🚀 Server running on http://localhost:3001
```

### Step 2: Test API Directly
Open browser and go to: `http://localhost:3001/api/packages`

You should see JSON array of packages (or empty array `[]` if no packages).

### Step 3: Check Browser Console
1. Open frontend in browser
2. Press F12 to open DevTools
3. Go to Console tab
4. Look for:
   - `🌐 API Request: GET http://localhost:3001/api/packages`
   - `✅ Packages fetched from API: X packages`
   - OR `❌ API request failed` (if error)

### Step 4: Check Network Tab
1. In DevTools, go to Network tab
2. Refresh the packages page
3. Look for request to `/api/packages`
4. Check:
   - Status code (should be 200)
   - Response (should be JSON array)
   - If CORS error, you'll see red error

### Step 5: Verify Package is Active
When creating package in admin:
- ✅ Make sure "Active" checkbox is CHECKED
- ✅ This makes package visible on frontend

### Step 6: Check Environment Variables
Frontend should have API URL set. Check:
- `.env` file in root: `VITE_API_URL=http://localhost:3001/api`
- Or it defaults to `http://localhost:3001/api`

## Visual Indicators

### When Using Real API Data:
- Shows: "Showing X packages (X from API)"
- No warning banner
- Console shows: `✅ Packages fetched from API`

### When Using Mock Data:
- Shows: "Showing 6 packages (6 mock)"
- Yellow warning banner at top
- Console shows: `⚠️ API failed, using mock data`

## Quick Fixes

### Fix 1: Restart Backend
```bash
cd backend
# Stop current process (Ctrl+C)
npm run dev
```

### Fix 2: Hard Refresh Frontend
- Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Or click the "Refresh" button on packages page

### Fix 3: Check CORS
Backend `.env` should have:
```env
FRONTEND_URL=http://localhost:5173
ADMIN_PANEL_URL=http://localhost:5174
```

### Fix 4: Verify Package Status
1. Go to admin panel
2. Check packages table
3. Verify "Status" column shows "Active"
4. If "Inactive", click edit and check "Active" checkbox

## Debug Checklist

- [ ] Backend running on port 3001
- [ ] Can access `http://localhost:3001/api/packages` directly
- [ ] Browser console shows API request
- [ ] No CORS errors in console
- [ ] Package created with "Active" checked
- [ ] Frontend refreshed after creating package
- [ ] Network tab shows 200 status for API call

## Still Not Working?

1. **Check Backend Logs**: Look for "Creating package" and "Found X packages" logs
2. **Check Database**: Run `npm run db:studio` in backend folder
3. **Verify Package Exists**: Check `travel_packages` table in Prisma Studio
4. **Check isActive Field**: Should be `1` (true) in database
