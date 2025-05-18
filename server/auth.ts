import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { storage } from './storage';
import bcrypt from 'bcrypt';
import { insertUserSchema } from '../shared/schema';

// Initialize passport with local strategy
export function setupAuth() {
  // Use local strategy for authentication
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        // Find user by username
        const user = await storage.getUserByUsername(username);
        
        // If user not found
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        
        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        // If password is incorrect
        if (!isPasswordValid) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        
        // Authentication successful
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
  
  // Serialize user for session
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });
  
  // Deserialize user from session
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}

// Middleware to check if user is authenticated
export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  
  // If not authenticated, redirect to login
  res.status(401).json({ message: 'Unauthorized' });
}

// Middleware to check if user is an admin
export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated() && req.user && (req.user as any).isAdmin) {
    return next();
  }
  
  // If not admin, return forbidden status
  res.status(403).json({ message: 'Forbidden: Admin access required' });
}

// Helper function to create a new admin user
export async function createAdminUser(username: string, password: string) {
  try {
    // Check if user already exists
    const existingUser = await storage.getUserByUsername(username);
    
    if (existingUser) {
      console.log(`Admin user ${username} already exists.`);
      return existingUser;
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create the admin user
    const userData = insertUserSchema.parse({
      username,
      password: hashedPassword,
      isAdmin: true
    });
    
    const newUser = await storage.createUser(userData);
    console.log(`Admin user ${username} created successfully.`);
    return newUser;
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
}