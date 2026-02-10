# Debugging Package Display Issues

## Common Issues and Solutions

### Issue 1: Packages Not Showing After Creation
**Symptoms**: Package created in admin panel but doesn't appear on frontend

**Possible Causes**:
1. `isActive` checkbox unchecked
2. Query cache not refreshing
3. API not returning new packages
4. CORS or network error

**Solutions**:
1. ✅ Check "Active" checkbox when creating package
2. ✅ Refresh the frontend page (F5)
3. ✅ Check browser console for errors
4. ✅ Verify backend is running on port 3001
5. ✅ Check network tab in browser DevTools

### Issue 2: Query Cache Not Updating
**Symptoms**: Old packages showing, new ones not appearing

**Solutions**:
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Check React Query DevTools if installed

### Issue 3: API Connection Issues
**Symptoms**: Packages page shows mock data or error

**Check**:
1. Backend server running: `http://localhost:3001`
2. API endpoint accessible: `http://localhost:3001/api/packages`
3. CORS configured correctly
4. Check browser console for fetch errors

### Issue 4: isActive Field Not Working
**Symptoms**: Package created but not visible even when Active is checked

**Debug Steps**:
1. Check backend logs when creating package
2. Verify `isActive` value in database
3. Check API response includes `isActive: true`
4. Verify frontend filter logic

## Testing Checklist

1. **Create Package**:
   - [ ] Fill all required fields
   - [ ] Check "Active" checkbox
   - [ ] Upload image (optional)
   - [ ] Click "Create"
   - [ ] See success message

2. **Verify in Admin Panel**:
   - [ ] Package appears in table
   - [ ] Status shows "Active"
   - [ ] Image displays correctly

3. **Verify on Frontend**:
   - [ ] Go to Packages page
   - [ ] Refresh page (F5)
   - [ ] New package appears
   - [ ] Image displays correctly
   - [ ] All details correct

4. **Check Backend Logs**:
   - [ ] See "Creating package" log
   - [ ] See "Found X packages" log
   - [ ] No errors in console

## Debug Commands

### Check Backend Logs
```bash
cd backend
npm run dev
# Look for logs when creating/querying packages
```

### Test API Directly
```bash
# Get all active packages
curl http://localhost:3001/api/packages

# Get all packages (including inactive)
curl http://localhost:3001/api/packages?isActive=false
```

### Check Database
```bash
cd backend
npm run db:studio
# Open Prisma Studio and check travel_packages table
```

## Recent Fixes Applied

1. ✅ Fixed query cache configuration
2. ✅ Fixed fallback logic (empty array vs error)
3. ✅ Added better error handling
4. ✅ Added console logging for debugging
5. ✅ Fixed isActive boolean handling
6. ✅ Added refetchOnMount and refetchOnWindowFocus
