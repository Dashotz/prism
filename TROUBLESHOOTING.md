# Vercel Build Troubleshooting

## Current Issue: 404 Error / Build Logs Cut Off

### Steps to Debug:

1. **Check Full Build Logs**:
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click on the failed deployment
   - Scroll down to see the **complete build logs**
   - Look for:
     - Build completion message
     - Any error messages
     - Whether `dist/spa/index.html` was created

2. **Verify Build Settings in Vercel Dashboard**:
   - Go to Settings → General
   - Ensure these are set:
     - **Build Command**: `npm run vercel-build`
     - **Output Directory**: `dist/spa`
     - **Install Command**: `npm install`
     - **Node.js Version**: 20.x (or 18.x)

3. **Check Environment Variables**:
   - Settings → Environment Variables
   - Must have:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
   - Without these, the build might fail

4. **Common Issues**:

   **Issue: Build times out**
   - Solution: The build is optimized now (TypeScript checking disabled in production)
   - If still timing out, check for infinite loops or heavy processing

   **Issue: "dist/spa not found"**
   - Solution: Verify Output Directory is exactly `dist/spa` (case-sensitive)
   - Check if build actually completes in logs

   **Issue: npm warnings about .npmrc**
   - Fixed: Removed pnpm-specific options from .npmrc

5. **Manual Build Test**:

   ```bash
   # Test build locally
   npm install
   npm run build

   # Check if dist/spa exists
   ls dist/spa/index.html
   ```

6. **If Build Succeeds but 404 Persists**:
   - Check Vercel project settings
   - Verify Output Directory is `dist/spa`
   - Try redeploying after clearing cache

## What Was Fixed:

✅ Removed pnpm-specific config from `.npmrc` (npm warnings fixed)
✅ Optimized build (TypeScript checking disabled in production)
✅ Verified `vercel.json` configuration

## Next Steps:

1. Check the **complete build logs** in Vercel dashboard
2. Share the full error message if build fails
3. Verify Output Directory setting matches `dist/spa`
