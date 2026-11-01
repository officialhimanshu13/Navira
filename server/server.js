/**
 * NAVIRA Production Authentication & RBAC Backend Server
 * Tech Stack: Node.js, Express, jsonwebtoken, bcryptjs, cookie-parser, google-auth-library
 * Port: 3002
 */

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;
const JWT_SECRET = process.env.JWT_SECRET || 'navira_super_secret_jwt_signing_key_2026_mohali_chandigarh';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';

// 1. Authorized Admin Email Whitelist
const defaultAdminEmails = ['navirabusiness01@gmail.com', 'himanshu@navira.in', 'admin@navira.in'];
const authorizedAdminEmails = (process.env.ADMIN_EMAILS || '')
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

const finalAdminWhitelist = authorizedAdminEmails.length > 0 ? authorizedAdminEmails : defaultAdminEmails;

// 2. Google OAuth Client
const googleClient = GOOGLE_CLIENT_ID ? new OAuth2Client(GOOGLE_CLIENT_ID) : null;

// 3. Pre-hashed Admin Credentials
const defaultHashedPassword = bcrypt.hashSync(process.env.ADMIN_INITIAL_PASSWORD || 'NaviraExecutiveSecure2026', 10);

// In-Memory Seed Users Database (Replace with PostgreSQL/Supabase in production)
const usersDb = [
  {
    id: 'admin_navira_01',
    email: 'navirabusiness01@gmail.com',
    name: 'NAVIRA Executive Admin',
    passwordHash: defaultHashedPassword,
    role: 'admin',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    createdAt: new Date().toISOString()
  }
];

// CORS Configuration
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3002',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3002',
      process.env.FRONTEND_URL || ''
    ].filter(Boolean),
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ====================================================================
// AUTHENTICATION & RBAC MIDDLEWARES
// ====================================================================

/**
 * Middleware: Verify JWT from HTTP-only Cookie or Authorization Header
 */
export function authenticateJWT(req, res, next) {
  let token = req.cookies?.navira_auth_token;

  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1];
    }
  }

  if (!token) {
    return res.status(401).json({ error: 'Access denied: No authentication token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired authentication session.' });
  }
}

/**
 * Middleware: Require Administrator Role (RBAC)
 */
export function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required.' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      error: `Forbidden: User ${req.user.email} is not authorized for administrator access.`
    });
  }

  next();
}

// ====================================================================
// AUTHENTICATION ROUTES
// ====================================================================

/**
 * Health check
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'NAVIRA Auth & RBAC Microservice',
    studyArea: 'Mohali & Chandigarh',
    timestamp: new Date().toISOString()
  });
});

/**
 * POST /api/auth/google
 * Authenticate via Google OAuth credential
 */
app.post('/api/auth/google', async (req, res) => {
  try {
    const { idToken, email: clientEmail, displayName, photoUrl } = req.body;
    let verifiedEmail = clientEmail?.trim()?.toLowerCase();
    let name = displayName || 'Google User';
    let avatar = photoUrl;

    // Verify token with Google if client ID is configured and token provided
    if (googleClient && idToken) {
      try {
        const ticket = await googleClient.verifyIdToken({
          idToken,
          audience: GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        if (payload) {
          verifiedEmail = payload.email?.toLowerCase();
          name = payload.name || name;
          avatar = payload.picture || avatar;
        }
      } catch (tokenErr) {
        return res.status(400).json({ error: 'Google OAuth verification failed: Invalid ID token.' });
      }
    }

    if (!verifiedEmail) {
      return res.status(400).json({ error: 'Email is required for Google Sign-In.' });
    }

    // Role-based Access Control Check
    const isAdmin = finalAdminWhitelist.includes(verifiedEmail);
    const role = isAdmin ? 'admin' : 'business_owner';

    if (!isAdmin) {
      return res.status(403).json({
        error: `Access Denied: ${verifiedEmail} is not on the NAVIRA administrator whitelist.`
      });
    }

    // Issue JWT
    const payload = {
      userId: `google_${verifiedEmail.replace(/[^a-zA-Z0-9]/g, '_')}`,
      email: verifiedEmail,
      name,
      role
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });

    // Set HTTP-Only Cookie
    res.cookie('navira_auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 8 * 60 * 60 * 1000 // 8 hours
    });

    return res.json({
      success: true,
      user: {
        id: payload.userId,
        email: verifiedEmail,
        name,
        role,
        avatarUrl: avatar,
        authMethod: 'google'
      },
      token
    });
  } catch (error) {
    console.error('Google Auth Error:', error);
    return res.status(500).json({ error: 'Internal server authentication error.' });
  }
});

/**
 * POST /api/auth/login
 * Email & Password Login with bcrypt password comparison & JWT issue
 */
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = usersDb.find((u) => u.email === cleanEmail);

    if (!user) {
      // Check if email is in the admin whitelist for initial bootstrap
      if (finalAdminWhitelist.includes(cleanEmail) && password.length >= 8) {
        const newUser = {
          id: `usr_${Date.now()}`,
          email: cleanEmail,
          name: cleanEmail.split('@')[0],
          passwordHash: bcrypt.hashSync(password, 10),
          role: 'admin',
          createdAt: new Date().toISOString()
        };
        usersDb.push(newUser);

          const token = jwt.sign(
            { userId: newUser.id, email: newUser.email, role: 'admin' },
            JWT_SECRET,
            { expiresIn: '8h' }
          );

          res.cookie('navira_auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 8 * 60 * 60 * 1000
          });

          return res.json({
            success: true,
            user: {
              id: newUser.id,
              email: newUser.email,
              name: newUser.name,
              role: 'admin',
              authMethod: 'email'
            },
            token
          });
        }
      }

      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Compare with bcrypt
    const isPasswordValid = bcrypt.compareSync(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Sign JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    // Set Secure Cookie
    res.cookie('navira_auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 8 * 60 * 60 * 1000
    });

    return res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatarUrl: user.avatarUrl,
        authMethod: 'email'
      },
      token
    });
  } catch (error) {
    console.error('Email Login Error:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

/**
 * GET /api/auth/me
 * Return current logged-in user details
 */
app.get('/api/auth/me', authenticateJWT, (req, res) => {
  return res.json({
    user: req.user
  });
});

/**
 * POST /api/auth/logout
 * Clear session cookie
 */
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('navira_auth_token');
  return res.json({ success: true, message: 'Logged out successfully.' });
});

/**
 * GET /api/admin/dashboard-stats
 * Protected Route: Requires 'admin' role
 */
app.get('/api/admin/dashboard-stats', authenticateJWT, requireAdmin, (req, res) => {
  return res.json({
    authorizedAdmin: req.user.email,
    scope: 'Mohali & Chandigarh',
    totalResearched: 325,
    websiteFound: 68,
    websiteNotFound: 239,
    unclearStatus: 18,
    confidentialInquiriesCount: 2
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`NAVIRA Auth & RBAC Backend Server running on port ${PORT}`);
  console.log(`Endpoint: http://localhost:${PORT}`);
  console.log(`Admin Whitelist: ${finalAdminWhitelist.join(', ')}`);
  console.log(`====================================================`);
});

