# Analytics API Example

This is a simple example backend API for tracking website visitors.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The API will run on `http://localhost:3000`

## Endpoints

### POST /api/track
Tracks a page view. Expects JSON body with page data.

### GET /api/stats
Returns visitor statistics including:
- Total page views
- Distinct IP addresses
- Top pages
- Recent visitors

### GET /health
Health check endpoint.

## Deployment

### Deploy to Railway

1. Create a new project on [Railway](https://railway.app)
2. Connect your GitHub repository
3. Railway will auto-detect Node.js and deploy
4. Set the API URL in your website's environment variables

### Deploy to Render

1. Create a new Web Service on [Render](https://render.com)
2. Connect your repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Copy the service URL and use it in your website

### Deploy to Heroku

1. Install Heroku CLI
2. Create a new app: `heroku create your-app-name`
3. Deploy: `git push heroku main`
4. Get the URL: `heroku info`

## Important Notes

- **This example uses in-memory storage** - data will be lost when the server restarts
- **For production**, use a real database:
  - MongoDB (MongoDB Atlas for free tier)
  - PostgreSQL (Supabase, Railway, etc.)
  - Vercel KV (Redis-based)
  - SQLite (for simple deployments)

## Environment Variables

- `PORT` - Server port (default: 3000)

## Production Recommendations

1. Use a real database instead of in-memory storage
2. Add rate limiting to prevent abuse
3. Implement data retention policies
4. Add authentication for the stats endpoint
5. Consider IP anonymization for privacy compliance
6. Add request logging and monitoring

