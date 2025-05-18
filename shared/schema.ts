import { pgTable, text, serial, integer, boolean, timestamp, jsonb, varchar, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session table for authentication
export const session = pgTable("session", {
  sid: varchar("sid").primaryKey(),
  sess: jsonb("sess").notNull(),
  expire: timestamp("expire").notNull(),
}, (table) => {
  return {
    expireIdx: index("session_expire_idx").on(table.expire),
  };
});

// Residents table for storing contact information and service requests
export const residents = pgTable("residents", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  postcode: text("postcode").notNull(),
  fullName: text("full_name"),
  phone: text("phone"),
  serviceInterest: text("service_interest"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertResidentSchema = createInsertSchema(residents).pick({
  email: true,
  postcode: true,
  fullName: true,
  phone: true,
  serviceInterest: true,
  message: true,
});

export type InsertResident = z.infer<typeof insertResidentSchema>;
export type Resident = typeof residents.$inferSelect;

// Contact form submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  postcode: text("postcode").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSchema = createInsertSchema(contactSubmissions).pick({
  fullName: true,
  email: true,
  postcode: true,
  phone: true,
  message: true,
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

// Users table (for admin access)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  isAdmin: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// User profile table for storing website visitor information
export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull().default(''),
  postcode: text("postcode").notNull().default(''),
  interests: text("interests").array().notNull().default([]),
  consentMarketing: boolean("consent_marketing").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// User activity table for tracking page views and resource access
export const userActivities = pgTable("user_activities", {
  id: serial("id").primaryKey(),
  userProfileId: integer("user_profile_id").notNull().references(() => userProfiles.id),
  activityType: text("activity_type").notNull(), // e.g., 'page_view', 'resource_access', 'calculator_use'
  resourceType: text("resource_type").notNull().default(''), // e.g., 'fact_sheet', 'calculator', 'form'
  resourceName: text("resource_name").notNull().default(''), // Name of the specific resource
  resourceCategory: text("resource_category").notNull().default(''), // e.g., 'benefits', 'debt', 'housing'
  metadata: jsonb("metadata").notNull().default({}), // Additional data about the activity
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserProfileSchema = createInsertSchema(userProfiles).pick({
  email: true,
  fullName: true,
  postcode: true,
  interests: true,
  consentMarketing: true,
});

export const insertUserActivitySchema = createInsertSchema(userActivities).pick({
  userProfileId: true,
  activityType: true,
  resourceType: true,
  resourceName: true,
  resourceCategory: true,
  metadata: true,
});

// Types
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type UserProfile = typeof userProfiles.$inferSelect;

export type InsertUserActivity = z.infer<typeof insertUserActivitySchema>;
export type UserActivity = typeof userActivities.$inferSelect;
