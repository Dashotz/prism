# Vercel Deployment Guide

## Quick Deploy

1. **Push to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **Deploy via Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your repository
   - Configure settings:
     - **Framework Preset**: Other
     - **Build Command**: `npm run vercel-build`
     - **Output Directory**: `dist/spa`
     - **Install Command**: `npm install`
   - Add Environment Variables:
     - `VITE_SUPABASE_URL` = Your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY` = Your Supabase anon key
   - Click "Deploy"

## Troubleshooting 404 Errors

If you get a 404 error:

1. **Check Build Logs**:
   - Go to your Vercel project dashboard
   - Check the "Deployments" tab
   - Look at the build logs to ensure the build completed successfully
   - Verify that `dist/spa/index.html` was created

2. **Verify Output Directory**:
   - In Vercel project settings, ensure:
     - Output Directory is set to: `dist/spa`
     - Build Command is: `npm run vercel-build`

3. **Check Environment Variables**:
   - Ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
   - Without these, the build might fail or the app won't work

4. **Verify Build Locally**:
   ```bash
   npm run build
   ls dist/spa/index.html  # Should exist
   ```

5. **Redeploy**:
   - If settings are correct, try redeploying
   - Go to Deployments → Click "..." → Redeploy

## Manual Deployment via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# For production
vercel --prod
```

## Important Notes

- The app uses **hash mode routing** (`#/about`), so all routes work client-side
- Build output is in `dist/spa` directory
- Environment variables must be set in Vercel dashboard
- The `vercel.json` file is already configured correctly

