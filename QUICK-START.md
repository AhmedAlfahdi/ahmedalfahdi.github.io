# Quick Start - Vercel Analytics Setup

## TL;DR - Fast Setup (5 minutes)

1. **Sign up for Vercel**: [vercel.com](https://vercel.com) → Sign up with GitHub

2. **Create KV Database**:
   - Vercel Dashboard → Storage → Create Database → KV
   - Name: `analytics-kv`
   - Copy `KV_REST_API_URL` and `KV_REST_API_TOKEN`

3. **Deploy API**:
   - Vercel Dashboard → Add New Project
   - Import your repository (or create new repo with `vercel-api` folder)
   - Add environment variables:
     - `KV_REST_API_URL` = (from step 2)
     - `KV_REST_API_TOKEN` = (from step 2)
   - Deploy

4. **Get API URL**: After deployment, copy your Vercel URL (e.g., `https://analytics-api.vercel.app`)

5. **Configure Website**:
   - For local: Create `.env` file with:
     ```
     PUBLIC_ANALYTICS_API=https://your-api.vercel.app/api
     ```
   - For production: See `VERCEL-SETUP-GUIDE.md` Step 7

6. **Test**: Visit your site, click the "!" button, check statistics!

## Detailed Instructions

See `VERCEL-SETUP-GUIDE.md` for complete step-by-step instructions.

## Need Help?

- Check `VERCEL-SETUP-GUIDE.md` for troubleshooting
- Verify your API is working: Visit `https://your-api.vercel.app/api/stats` in browser
- Check browser console for errors

