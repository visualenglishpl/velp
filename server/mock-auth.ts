import { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import createMemoryStore from "memorystore";

// Add type declaration for express-session to include user
declare module 'express-session' {
  interface SessionData {
    user: {
      id: number;
      username: string;
      role: string;
      email: string;
      fullName: string;
      createdAt: Date;
    };
  }
}

// Mock authentication for testing the admin interface
const adminUser = {
  id: 1,
  username: "admin",
  role: "admin",
  email: "admin@example.com",
  fullName: "Admin User",
  createdAt: new Date()
};

const teacherUser = {
  id: 2,
  username: "teacher",
  role: "teacher",
  email: "teacher@example.com",
  fullName: "Teacher User",
  createdAt: new Date()
};

const schoolUser = {
  id: 3,
  username: "school",
  role: "school", 
  email: "school@example.com",
  fullName: "School Account",
  createdAt: new Date()
};

// For quick testing during development
const validCredentials = [
  { username: "admin", password: "admin123", userRecord: adminUser },
  { username: "teacher", password: "teacher123", userRecord: teacherUser },
  { username: "school", password: "school123", userRecord: schoolUser }
];

export function setupMockAuth(app: Express) {
  // Create a memory store for sessions
  const MemoryStore = createMemoryStore(session);
  const sessionStore = new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  });

  // Set up session middleware
  app.use(session({
    secret: process.env.SESSION_SECRET || "development-secret-key",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));

  // Authentication middleware
  function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.session && req.session.user) {
      return next();
    }
    res.status(401).json({ error: "Not authenticated" });
  }

  // Admin-only middleware
  function isAdmin(req: Request, res: Response, next: NextFunction) {
    if (req.session && req.session.user && req.session.user.role === "admin") {
      return next();
    }
    res.status(403).json({ error: "Unauthorized - admin access required" });
  }

  // Mock login endpoint
  app.post("/api/login", (req, res) => {
    const { username, password, role } = req.body;
    console.log(`Login attempt: username=${username}, password=${password ? '******' : 'empty'}, role=${role || 'not specified'}`);

    // Try to find matching credentials
    const matchingCred = validCredentials.find(cred => cred.username === username);
    
    if (!matchingCred) {
      console.log(`Login failed: user '${username}' not found`);
      return res.status(401).json({ error: "Invalid username or password" });
    }
    
    // Check password
    if (matchingCred.password !== password) {
      console.log(`Login failed: incorrect password for '${username}'`);
      return res.status(401).json({ error: "Invalid username or password" });
    }
    
    // If role is specified, check if it matches
    if (role && matchingCred.userRecord.role !== role) {
      console.log(`Login failed: role mismatch for '${username}', expected '${role}', found '${matchingCred.userRecord.role}'`);
      return res.status(401).json({ error: "Invalid role for this user" });
    }
    
    // Success! Set user in session and return user data
    req.session.user = matchingCred.userRecord;
    const userRole = matchingCred.userRecord.role;
    console.log(`Login successful for '${username}' as '${userRole}'`);
    return res.json(matchingCred.userRecord);
  });

  // Mock logout endpoint
  app.post("/api/logout", (req, res) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ error: "Failed to logout" });
        }
        res.clearCookie("connect.sid");
        res.json({ success: true });
      });
    } else {
      res.json({ success: true });
    }
  });

  // Get current user endpoint
  app.get("/api/user", (req, res) => {
    if (!req.session || !req.session.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    // Return user data from session
    res.json(req.session.user);
  });

  // Mock admin-only endpoint
  app.get("/api/admin-data", isAdmin, (req, res) => {
    res.json({ 
      message: "Admin-only data",
      books: [
        { id: "book1", title: "Book 1", units: 10 },
        { id: "book2", title: "Book 2", units: 15 },
        { id: "book3", title: "Book 3", units: 20 }
      ],
      flaggedQuestions: [
        { id: 1, question: "What is this?", status: "pending" },
        { id: 2, question: "Where is the cat?", status: "approved" }
      ]
    });
  });

  // Mock register endpoint
  app.post("/api/register", (req, res) => {
    const { username, email, password, role } = req.body;
    
    // Check if username exists
    if (validCredentials.some(cred => cred.username === username)) {
      return res.status(400).json({ error: "Username already exists" });
    }
    
    // Create new mock user
    const newUser = {
      id: validCredentials.length + 1,
      username,
      role,
      email,
      fullName: req.body.fullName || username,
      createdAt: new Date()
    };
    
    // Add to valid credentials
    validCredentials.push({
      username,
      password,
      userRecord: newUser
    });
    
    // Set session
    req.session.user = newUser;
    
    res.status(201).json(newUser);
  });

  return {
    isAuthenticated,
    isAdmin
  };
}