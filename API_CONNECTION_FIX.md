# API Connection Fix Guide

## Problem
Frontend shows "Cannot connect to API" error even though backend is running on port 3001.

## Root Causes & Solutions

### 1. CORS Configuration ✅ FIXED
**Issue**: Frontend runs on port 8080, but backend CORS only allowed ports 5173 and 5174.

**Fix Applied**: Added port 8080 to CORS allowed origins in `backend/src/index.ts`

### 2. Check Backend is Actually Running
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

### 3. Test API Directly
Open in browser: `http://localhost:3001/api/health`

Should return: `{"status":"ok","timestamp":"..."}`

### 4. Check Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for:
   - `🌐 API Request: GET http://localhost:3001/api/packages`
   - `📡 API Response: 200 OK` (success)
   - OR `❌ API request failed` (error)

### 5. Check Network Tab
1. Open DevTools → Network tab
2. Refresh packages page
3. Look for request to `/api/packages`
4. Check:
   - Status: Should be 200
   - Response: Should be JSON array
   - If CORS error: You'll see red error with CORS message

### 6. Verify Environment Variables
Check if `.env` file exists in root directory:
```env
VITE_API_URL=http://localhost:3001/api
```

If not, create it or the app will use default: `http://localhost:3001/api`

### 7. Common Issues

#### Issue: CORS Error
**Symptoms**: Red error in console: "CORS policy" or "Access-Control-Allow-Origin"

**Solution**: 
- Backend CORS now includes port 8080 ✅
- Restart backend after changes
- Check backend logs show CORS origins

#### Issue: Connection Refused
**Symptoms**: "Failed to fetch" or "NetworkError"

**Solution**:
- Verify backend is running: `http://localhost:3001/api/health`
- Check firewall isn't blocking port 3001
- Verify backend is listening on `0.0.0.0` (not just localhost)

#### Issue: Empty Array Returned
**Symptoms**: No error, but no packages shown

**Solution**:
- This is CORRECT behavior if no packages exist
- Create packages in admin panel
- Make sure "Active" checkbox is checked
- Refresh frontend page

## Debugging Steps

1. **Check Backend Logs**:
   ```
   Look for:
   - "🚀 Server running on http://localhost:3001"
   - "Found X packages" when querying
   - Any error messages
   ```

2. **Check Frontend Console**:
   ```
   Look for:
   - API Request logs
   - API Response logs
   - Error messages with details
   ```

3. **Test API Endpoints**:
   ```bash
   # Health check
   curl http://localhost:3001/api/health
   
   # Get packages
   curl http://localhost:3001/api/packages
   
   # Should return JSON array (even if empty)
   ```

4. **Verify Package Creation**:
   - Go to admin panel
   - Create a package
   - Check "Active" checkbox
   - Verify it appears in admin packages table
   - Check backend logs for "Creating package" message

## What Was Fixed

1. ✅ Added port 8080 to CORS allowed origins
2. ✅ Added better error messages in API client
3. ✅ Added "Test API" button in error banner
4. ✅ Improved logging for debugging
5. ✅ Better error handling for network failures

## Next Steps

1. **Restart Backend** (to apply CORS changes):
   ```bash
   cd backend
   # Stop current process (Ctrl+C)
   npm run dev
   ```

2. **Refresh Frontend**:
   - Hard refresh: Ctrl+Shift+R
   - Or click "Retry" button in error banner

3. **Check Console**:
   - Should see API requests in console
   - Should see success or detailed error messages

4. **If Still Not Working**:
   - Check browser console for specific error
   - Check backend console for request logs
   - Verify backend is accessible: `http://localhost:3001/api/health`
