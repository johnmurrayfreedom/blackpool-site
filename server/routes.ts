import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertResidentSchema, insertContactSchema } from "../shared/schema";
import { z } from "zod";
import passport from "passport";
import { isAuthenticated, isAdmin } from "./auth";
import { registerUserRoutes } from "./userRoutes";

export async function registerRoutes(app: Express): Promise<Server> {
  // Register user profile and tracking routes
  registerUserRoutes(app);
  
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Resident submission endpoint (used by the multi-step form)
  app.post("/api/residents", async (req, res) => {
    try {
      // Validate request data
      const validatedData = insertResidentSchema.parse(req.body);
      
      // Save the resident data
      const resident = await storage.createResident(validatedData);
      
      // In a real implementation, this would trigger a webhook to Go High Level CRM
      // Example: await sendToGoHighLevel(resident);
      
      res.status(201).json({
        message: "Resident information submitted successfully",
        data: resident
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Error creating resident:", error);
        res.status(500).json({ 
          message: "An error occurred while processing your request" 
        });
      }
    }
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request data
      const validatedData = insertContactSchema.parse(req.body);
      
      // Save the contact submission
      const contact = await storage.createContactSubmission(validatedData);
      
      // In a real implementation, this would send an email notification and/or trigger a webhook to Go High Level CRM
      // Example: await sendContactNotification(contact);
      
      res.status(201).json({
        message: "Contact form submitted successfully",
        data: contact
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Error submitting contact form:", error);
        res.status(500).json({ 
          message: "An error occurred while processing your request" 
        });
      }
    }
  });

  // Authentication routes
  app.post("/api/auth/login", (req: Request, res: Response, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info.message || "Authentication failed" });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.json({
          message: "Authentication successful",
          user: {
            id: user.id,
            username: user.username,
            isAdmin: user.isAdmin
          }
        });
      });
    })(req, res, next);
  });

  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.logout(() => {
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/status", (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const user = req.user as any;
      return res.json({
        authenticated: true,
        user: {
          id: user.id,
          username: user.username,
          isAdmin: user.isAdmin
        }
      });
    }
    res.json({ authenticated: false });
  });

  // Admin-only routes
  // Get all submissions
  app.get("/api/admin/submissions", isAuthenticated, isAdmin, async (req: Request, res: Response) => {
    try {
      // In a real implementation, we would add pagination and filtering
      const residents = await storage.getAllResidents();
      res.json({ data: residents });
    } catch (error) {
      console.error("Error fetching submissions:", error);
      res.status(500).json({ message: "Error fetching submissions" });
    }
  });

  // Get all contact form submissions
  app.get("/api/admin/contacts", isAuthenticated, isAdmin, async (req: Request, res: Response) => {
    try {
      const contacts = await storage.getAllContactSubmissions();
      res.json({ data: contacts });
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ message: "Error fetching contact submissions" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
