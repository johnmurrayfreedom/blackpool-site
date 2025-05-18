import { 
  residents, type Resident, type InsertResident,
  contactSubmissions, type ContactSubmission, type InsertContact,
  users, type User, type InsertUser,
  userProfiles, type UserProfile, type InsertUserProfile,
  userActivities, type UserActivity, type InsertUserActivity
} from "../shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Resident operations
  getResident(id: number): Promise<Resident | undefined>;
  getResidentByEmail(email: string): Promise<Resident | undefined>;
  createResident(resident: InsertResident): Promise<Resident>;
  getAllResidents(): Promise<Resident[]>;
  
  // Contact form operations
  getContactSubmission(id: number): Promise<ContactSubmission | undefined>;
  createContactSubmission(contact: InsertContact): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  
  // User profile operations
  getUserProfile(id: number): Promise<UserProfile | undefined>;
  getUserProfileByEmail(email: string): Promise<UserProfile | undefined>;
  createUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  updateUserProfile(id: number, profile: Partial<InsertUserProfile>): Promise<UserProfile>;
  getAllUserProfiles(): Promise<UserProfile[]>;
  
  // User activity operations
  createUserActivity(activity: InsertUserActivity): Promise<UserActivity>;
  getUserActivities(userProfileId: number): Promise<UserActivity[]>;
  getRecentUserActivities(limit?: number): Promise<UserActivity[]>;
}

// Memory storage implementation (for development)
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private residents: Map<number, Resident>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private userProfiles: Map<number, UserProfile>;
  private userActivities: Map<number, UserActivity>;
  private userCurrentId: number;
  private residentCurrentId: number;
  private contactCurrentId: number;
  private userProfileCurrentId: number;
  private userActivityCurrentId: number;

  constructor() {
    this.users = new Map();
    this.residents = new Map();
    this.contactSubmissions = new Map();
    this.userProfiles = new Map();
    this.userActivities = new Map();
    this.userCurrentId = 1;
    this.residentCurrentId = 1;
    this.contactCurrentId = 1;
    this.userProfileCurrentId = 1;
    this.userActivityCurrentId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    // Ensure isAdmin is at least false if not provided
    const user: User = { 
      ...insertUser, 
      id, 
      isAdmin: insertUser.isAdmin ?? false 
    };
    this.users.set(id, user);
    return user;
  }
  
  // Resident methods
  async getResident(id: number): Promise<Resident | undefined> {
    return this.residents.get(id);
  }
  
  async getResidentByEmail(email: string): Promise<Resident | undefined> {
    return Array.from(this.residents.values()).find(
      (resident) => resident.email === email,
    );
  }
  
  async createResident(insertResident: InsertResident): Promise<Resident> {
    const id = this.residentCurrentId++;
    const createdAt = new Date();
    
    // Ensure all nullable fields are explicitly null rather than undefined
    const resident: Resident = { 
      ...insertResident, 
      id, 
      createdAt,
      fullName: insertResident.fullName ?? null,
      phone: insertResident.phone ?? null,
      message: insertResident.message ?? null,
      serviceInterest: insertResident.serviceInterest ?? null
    };
    
    this.residents.set(id, resident);
    return resident;
  }
  
  // Contact form methods
  async getContactSubmission(id: number): Promise<ContactSubmission | undefined> {
    return this.contactSubmissions.get(id);
  }
  
  async createContactSubmission(insertContact: InsertContact): Promise<ContactSubmission> {
    const id = this.contactCurrentId++;
    const createdAt = new Date();
    
    // Ensure all nullable fields are explicitly null rather than undefined
    const contact: ContactSubmission = { 
      ...insertContact, 
      id, 
      createdAt,
      phone: insertContact.phone ?? null
    };
    
    this.contactSubmissions.set(id, contact);
    return contact;
  }
  
  async getAllResidents(): Promise<Resident[]> {
    return Array.from(this.residents.values());
  }
  
  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }
  
  // User profile methods
  async getUserProfile(id: number): Promise<UserProfile | undefined> {
    return this.userProfiles.get(id);
  }
  
  async getUserProfileByEmail(email: string): Promise<UserProfile | undefined> {
    return Array.from(this.userProfiles.values()).find(
      (profile) => profile.email.toLowerCase() === email.toLowerCase(),
    );
  }
  
  async createUserProfile(profile: InsertUserProfile): Promise<UserProfile> {
    const id = this.userProfileCurrentId++;
    const createdAt = new Date();
    const updatedAt = new Date();
    
    // Create a complete user profile object with defaults for optional fields
    const userProfile: UserProfile = {
      id,
      email: profile.email,
      fullName: profile.fullName || '',
      postcode: profile.postcode || '',
      interests: profile.interests || [],
      consentMarketing: profile.consentMarketing || false,
      createdAt,
      updatedAt
    };
    
    this.userProfiles.set(id, userProfile);
    return userProfile;
  }
  
  async updateUserProfile(id: number, profile: Partial<InsertUserProfile>): Promise<UserProfile> {
    const existingProfile = this.userProfiles.get(id);
    
    if (!existingProfile) {
      throw new Error(`User profile with ID ${id} not found`);
    }
    
    // Update profile fields while maintaining existing values for fields not included in the update
    const updatedProfile: UserProfile = {
      ...existingProfile,
      ...profile,
      updatedAt: new Date(),
      // Ensure arrays remain arrays even if not included in update
      interests: profile.interests || existingProfile.interests,
    };
    
    this.userProfiles.set(id, updatedProfile);
    return updatedProfile;
  }
  
  async getAllUserProfiles(): Promise<UserProfile[]> {
    return Array.from(this.userProfiles.values());
  }
  
  // User activity methods
  async createUserActivity(activity: InsertUserActivity): Promise<UserActivity> {
    const id = this.userActivityCurrentId++;
    const createdAt = new Date();
    
    // Create a complete user activity object with defaults
    const userActivity: UserActivity = {
      id,
      userProfileId: activity.userProfileId,
      activityType: activity.activityType,
      resourceType: activity.resourceType || '',
      resourceName: activity.resourceName || '',
      resourceCategory: activity.resourceCategory || '',
      metadata: activity.metadata || {},
      createdAt
    };
    
    this.userActivities.set(id, userActivity);
    return userActivity;
  }
  
  async getUserActivities(userProfileId: number): Promise<UserActivity[]> {
    return Array.from(this.userActivities.values())
      .filter(activity => activity.userProfileId === userProfileId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async getRecentUserActivities(limit: number = 100): Promise<UserActivity[]> {
    return Array.from(this.userActivities.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0] || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0] || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // Ensure isAdmin is at least false if not provided
    const userWithDefaults = {
      ...insertUser,
      isAdmin: insertUser.isAdmin ?? false
    };
    
    const result = await db.insert(users).values(userWithDefaults).returning();
    return result[0];
  }
  
  // Resident methods
  async getResident(id: number): Promise<Resident | undefined> {
    const result = await db.select().from(residents).where(eq(residents.id, id));
    return result[0] || undefined;
  }
  
  async getResidentByEmail(email: string): Promise<Resident | undefined> {
    const result = await db.select().from(residents).where(eq(residents.email, email));
    return result[0] || undefined;
  }
  
  async createResident(insertResident: InsertResident): Promise<Resident> {
    // Ensure all nullable fields are explicitly null rather than undefined
    const residentWithDefaults = {
      ...insertResident,
      fullName: insertResident.fullName ?? null,
      phone: insertResident.phone ?? null,
      message: insertResident.message ?? null,
      serviceInterest: insertResident.serviceInterest ?? null
    };
    
    const result = await db.insert(residents).values(residentWithDefaults).returning();
    return result[0];
  }
  
  // Contact form methods
  async getContactSubmission(id: number): Promise<ContactSubmission | undefined> {
    const result = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id));
    return result[0] || undefined;
  }
  
  async createContactSubmission(insertContact: InsertContact): Promise<ContactSubmission> {
    // Ensure all nullable fields are explicitly null rather than undefined
    const contactWithDefaults = {
      ...insertContact,
      phone: insertContact.phone ?? null
    };
    
    const result = await db.insert(contactSubmissions).values(contactWithDefaults).returning();
    return result[0];
  }
  
  async getAllResidents(): Promise<Resident[]> {
    return await db.select().from(residents).orderBy(desc(residents.createdAt));
  }
  
  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }
  
  // User profile methods
  async getUserProfile(id: number): Promise<UserProfile | undefined> {
    const result = await db.select().from(userProfiles).where(eq(userProfiles.id, id));
    return result[0] || undefined;
  }
  
  async getUserProfileByEmail(email: string): Promise<UserProfile | undefined> {
    const result = await db.select().from(userProfiles).where(eq(userProfiles.email, email));
    return result[0] || undefined;
  }
  
  async createUserProfile(profile: InsertUserProfile): Promise<UserProfile> {
    // Create profile with default values for optional fields
    const profileWithDefaults = {
      ...profile,
      interests: profile.interests || [],
      consentMarketing: profile.consentMarketing || false
    };
    
    const result = await db.insert(userProfiles).values(profileWithDefaults).returning();
    return result[0];
  }
  
  async updateUserProfile(id: number, profile: Partial<InsertUserProfile>): Promise<UserProfile> {
    // First check if the profile exists
    const existingProfile = await this.getUserProfile(id);
    
    if (!existingProfile) {
      throw new Error(`User profile with ID ${id} not found`);
    }
    
    const updatedProfile = {
      ...profile,
      updatedAt: new Date()
    };
    
    const result = await db
      .update(userProfiles)
      .set(updatedProfile)
      .where(eq(userProfiles.id, id))
      .returning();
    
    return result[0];
  }
  
  async getAllUserProfiles(): Promise<UserProfile[]> {
    return await db.select().from(userProfiles).orderBy(desc(userProfiles.createdAt));
  }
  
  // User activity methods
  async createUserActivity(activity: InsertUserActivity): Promise<UserActivity> {
    const activityWithDefaults = {
      ...activity,
      metadata: activity.metadata || {}
    };
    
    const result = await db.insert(userActivities).values(activityWithDefaults).returning();
    return result[0];
  }
  
  async getUserActivities(userProfileId: number): Promise<UserActivity[]> {
    return await db
      .select()
      .from(userActivities)
      .where(eq(userActivities.userProfileId, userProfileId))
      .orderBy(desc(userActivities.createdAt));
  }
  
  async getRecentUserActivities(limit: number = 100): Promise<UserActivity[]> {
    return await db
      .select()
      .from(userActivities)
      .orderBy(desc(userActivities.createdAt))
      .limit(limit);
  }
}

export const storage = new DatabaseStorage();
