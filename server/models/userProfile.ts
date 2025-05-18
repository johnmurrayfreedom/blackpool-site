import { pgTable, text, serial, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User profile table for storing website visitor information
export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  fullName: text("full_name"),
  postcode: text("postcode"),
  interests: text("interests").array(),
  consentMarketing: boolean("consent_marketing").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// User activity table for tracking page views and resource access
export const userActivities = pgTable("user_activities", {
  id: serial("id").primaryKey(),
  userProfileId: serial("user_profile_id").references(() => userProfiles.id),
  activityType: text("activity_type").notNull(), // e.g., 'page_view', 'resource_access', 'calculator_use'
  resourceType: text("resource_type"), // e.g., 'fact_sheet', 'calculator', 'form'
  resourceName: text("resource_name"), // Name of the specific resource
  resourceCategory: text("resource_category"), // e.g., 'benefits', 'debt', 'housing'
  metadata: jsonb("metadata"), // Additional data about the activity
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