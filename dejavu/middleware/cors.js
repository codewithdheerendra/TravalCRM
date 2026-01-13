/**
 * CORS Middleware
 * Handles Cross-Origin Resource Sharing for API routes
 * Supports both local development and production environments
 */

const allowedOrigins = [
  'http://localhost:3000', // Next.js default local port
  'http://localhost:3001', // Alternative Next.js port
];

// Add production origin from environment variable if set
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

// Also support NEXT_PUBLIC_API_ORIGIN for consistency
if (process.env.NEXT_PUBLIC_API_ORIGIN) {
  allowedOrigins.push(process.env.NEXT_PUBLIC_API_ORIGIN);
}

const corsMiddleware = (req, res, next) => {
  const origin = req.headers.origin;

  // Check if origin is allowed
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (!origin) {
    // Allow requests without origin (e.g., Postman, server-to-server)
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
};

module.exports = corsMiddleware;

