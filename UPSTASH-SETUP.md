# Quick Guide: Setting Up Upstash Redis for Analytics

Since Vercel moved KV to the Marketplace, here's a quick guide to set up Upstash Redis.

## Step 1: Create Upstash Account

1. Go to [upstash.com](https://upstash.com)
2. Sign up (free tier available)
3. You can also access it through Vercel Marketplace

## Step 2: Create Redis Database

1. In Upstash dashboard, click **Create Database**
2. Fill in:
   - **Name**: `analytics-kv`
   - **Type**: Regional (or Global for better performance)
   - **Region**: Choose closest to you
   - **Plan**: Free tier (10,000 commands/day, 256MB storage - perfect for personal sites)
3. Click **Create**

## Step 3: Get Connection Details

1. Click on your database
2. Go to **REST API** tab
3. Copy:
   - **UPSTASH_REDIS_REST_URL** (starts with `https://`)
   - **UPSTASH_REDIS_REST_TOKEN** (long string)

## Step 4: Use in Vercel

When deploying your Vercel API, add these as environment variables:

- `KV_REST_API_URL` = (your UPSTASH_REDIS_REST_URL)
- `KV_REST_API_TOKEN` = (your UPSTASH_REDIS_REST_TOKEN)

The `@vercel/kv` package is compatible with Upstash Redis, so the code works the same!

## Free Tier Limits

Upstash free tier includes:
- 10,000 commands per day
- 256MB storage
- Perfect for personal website analytics

## Alternative: Use Upstash SDK Directly

If you prefer, you can also use `@upstash/redis` instead of `@vercel/kv`:

```bash
npm install @upstash/redis
```

Then in your code:
```javascript
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
```

But the current code using `@vercel/kv` works fine with Upstash!

