# Vercel Setup Guide - Step by Step

This guide will walk you through setting up the analytics API on Vercel.

## Prerequisites

- A GitHub account
- A Vercel account (we'll create this)

## Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up**
3. Choose **Continue with GitHub** (recommended)
4. Authorize Vercel to access your GitHub account

## Step 2: Create KV Database via Marketplace

Vercel KV is now available through the Marketplace. We'll use **Upstash** (Redis-compatible):

1. In your Vercel dashboard, click on the **Storage** tab (left sidebar)
2. Click **Create Database**
3. Scroll down to **Marketplace Database Providers**
4. Click on **Upstash** (the one with green spiral 'S' icon, described as "Serverless DB (Redis, Vector, Queue, Search)")
5. Click **Continue**
6. You'll be redirected to Upstash. Sign up/login if needed (free tier available)
7. Create a new Redis database:
   - **Name**: `analytics-kv` (or any name)
   - **Type**: Regional (or Global for better performance)
   - **Region**: Choose closest to you
   - **Plan**: Free tier is fine for personal sites
8. Click **Create**
9. Wait for the database to be created

## Step 3: Get Database Connection Details

1. In Upstash dashboard, click on your Redis database
2. Go to the **REST API** tab (or look for connection details)
3. You'll see:
   - **UPSTASH_REDIS_REST_URL** - Copy this value
   - **UPSTASH_REDIS_REST_TOKEN** - Copy this value
4. **Alternative**: If you see different field names, look for:
   - REST URL (starts with `https://`)
   - REST Token (a long string)
5. Keep these handy - you'll need them in Step 5

**Note**: We'll use these as `KV_REST_API_URL` and `KV_REST_API_TOKEN` in Vercel environment variables.

## Step 4: Prepare Your API Code

You have two options:

### Option A: Deploy as Separate Repository (Recommended)

1. Create a new repository on GitHub:
   - Go to [github.com/new](https://github.com/new)
   - Name it: `analytics-api` (or any name)
   - Make it **Public** (required for Vercel free tier)
   - Don't initialize with README
   - Click **Create repository**

2. In your local project, navigate to the `vercel-api` folder:
   ```bash
   cd vercel-api
   ```

3. Initialize git and push:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Vercel analytics API"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/analytics-api.git
   git push -u origin main
   ```
   (Replace `YOUR_USERNAME` with your GitHub username)

### Option B: Deploy from Current Repository

If you want to keep everything in one repository:

1. The `vercel-api` folder is already in your project
2. You can deploy directly from your main repository
3. Vercel will automatically detect the `api` folder

## Step 5: Deploy to Vercel

1. In Vercel dashboard, click **Add New Project**
2. **Import Git Repository**:
   - If using Option A: Select your `analytics-api` repository
   - If using Option B: Select your main website repository
3. Click **Import**

4. **Configure Project**:
   - **Project Name**: `analytics-api` (or your choice)
   - **Framework Preset**: Leave as "Other" or "Vercel"
   - **Root Directory**: 
     - If Option A: Leave as `./`
     - If Option B: Set to `./vercel-api`

5. **Environment Variables**:
   Click **Add** and add these two variables:
   
   - **Name**: `KV_REST_API_URL`
   - **Value**: (paste the UPSTASH_REDIS_REST_URL from Step 3)
   
   - **Name**: `KV_REST_API_TOKEN`
   - **Value**: (paste the UPSTASH_REDIS_REST_TOKEN from Step 3)
   
   **Note**: The `@vercel/kv` package works with Upstash Redis using these environment variables.

6. Click **Deploy**

7. Wait for deployment (takes ~1-2 minutes)

## Step 6: Get Your API URL

1. After deployment completes, you'll see a success message
2. Your API will be available at:
   - Production: `https://your-project-name.vercel.app`
   - Or a custom domain if you set one up

3. Test your API endpoints:
   - `https://your-project-name.vercel.app/api/track`
   - `https://your-project-name.vercel.app/api/stats`

## Step 7: Configure Your Website

Now you need to tell your website where the API is:

### For Local Development

1. Create a `.env` file in your project root:
   ```
   PUBLIC_ANALYTICS_API=https://your-project-name.vercel.app/api
   ```
   (Replace with your actual Vercel URL)

2. Restart your dev server:
   ```bash
   npm run dev
   ```

### For Production (GitHub Pages)

Since GitHub Pages doesn't support environment variables directly, you have a few options:

**Option 1: Use Build-Time Environment Variable**

1. In your GitHub repository, go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add:
   - **Name**: `PUBLIC_ANALYTICS_API`
   - **Value**: `https://your-project-name.vercel.app/api`
4. Update your GitHub Actions workflow to use this secret

**Option 2: Hardcode in Code (Not Recommended for Security)**

You can temporarily hardcode it in `VisitorTracker.astro` and `BaseLayout.astro`:
```javascript
const API_ENDPOINT = 'https://your-project-name.vercel.app/api';
```

**Option 3: Use a Config File**

Create a config file that gets loaded at build time.

## Step 8: Test It

1. Visit your website locally or in production
2. Navigate to a few pages
3. Click the "!" button (site info) in the top-right corner
4. Scroll down to "Website Statistics"
5. You should see:
   - Total Views
   - Distinct IPs
   - Unique Visitors
   - Top Page

## Troubleshooting

### "KV connection failed"
- Check that environment variables are set correctly
- Make sure `KV_REST_API_URL` and `KV_REST_API_TOKEN` are correct
- Redeploy after adding environment variables

### "CORS error"
- The API already includes CORS headers
- Make sure you're using the correct API URL

### "No data showing"
- Check browser console for errors
- Verify the API endpoint is accessible
- Make sure `PUBLIC_ANALYTICS_API` is set correctly
- Test the API directly: `https://your-api.vercel.app/api/stats`

### API returns 404
- Make sure the `api` folder structure is correct
- Check that files are named `track.js` and `stats.js` (not `.ts`)
- Verify the deployment completed successfully

## Next Steps

- Monitor your Vercel dashboard for usage
- Check the KV database in Vercel Storage to see stored data
- Consider setting up a custom domain for your API
- Review Vercel's free tier limits (very generous for personal sites)

## Cost

Vercel's free tier includes:
- 100GB bandwidth per month
- 100GB KV storage
- Unlimited serverless function invocations
- Perfect for personal websites!

---

Need help? Check the Vercel documentation or the `vercel-api/README.md` file.

