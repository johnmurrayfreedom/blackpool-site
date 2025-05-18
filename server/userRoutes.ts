import { Request, Response } from 'express';
import { storage } from './storage';
import { 
  userProfiles, 
  insertUserProfileSchema, 
  insertUserActivitySchema 
} from '../shared/schema';
import { z } from 'zod';

/**
 * User profile routes
 * 
 * These routes handle:
 * 1. Creating/updating user profiles
 * 2. Tracking user activities 
 * 3. High Level CRM integration
 */

// Schema for front-end user profile submission
const userDataSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  fullName: z.string().optional(),
  postcode: z.string().optional(),
  interests: z.array(z.string()).optional(),
  consentMarketing: z.boolean().default(false),
  resourceType: z.string(),
  resourceName: z.string(),
  resourceCategory: z.string().optional(),
});

// High Level CRM integration
async function sendToHighLevel(userData: z.infer<typeof userDataSchema>) {
  try {
    // In a real implementation, you would make an API call to High Level CRM
    // For example:
    /*
    const response = await fetch('https://api.gohighlevel.com/v1/contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GO_HIGH_LEVEL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userData.email,
        firstName: userData.fullName ? userData.fullName.split(' ')[0] : '',
        lastName: userData.fullName ? userData.fullName.split(' ').slice(1).join(' ') : '',
        address: {
          postalCode: userData.postcode
        },
        tags: [userData.resourceCategory, 'Website Visitor'],
        customField: {
          interests: userData.interests?.join(', ')
        }
      }),
    });
    return response.ok;
    */
    
    // For now, just log the data that would be sent
    console.log('Would send to High Level CRM:', userData);
    return true;
  } catch (error) {
    console.error('Error sending to High Level CRM:', error);
    return false;
  }
}

// Register user profile routes
export function registerUserRoutes(app: any) {
  // Create or update user profile
  app.post('/api/user-profile', async (req: Request, res: Response) => {
    try {
      // Validate request data
      const userData = userDataSchema.parse(req.body);
      
      // Check if user already exists
      let userProfile = await storage.getUserProfileByEmail(userData.email);
      
      if (userProfile) {
        // Update existing profile
        userProfile = await storage.updateUserProfile(userProfile.id, {
          fullName: userData.fullName,
          postcode: userData.postcode,
          interests: userData.interests,
          consentMarketing: userData.consentMarketing,
        });
      } else {
        // Create new profile
        userProfile = await storage.createUserProfile({
          email: userData.email,
          fullName: userData.fullName,
          postcode: userData.postcode,
          interests: userData.interests,
          consentMarketing: userData.consentMarketing,
        });
      }
      
      // Record this activity
      await storage.createUserActivity({
        userProfileId: userProfile.id,
        activityType: 'resource_access',
        resourceType: userData.resourceType,
        resourceName: userData.resourceName,
        resourceCategory: userData.resourceCategory || '',
        metadata: {
          timestamp: new Date().toISOString(),
          userAgent: req.headers['user-agent'],
        },
      });
      
      // Send to High Level CRM if user consented
      if (userData.consentMarketing) {
        await sendToHighLevel(userData);
      }
      
      res.status(200).json({
        message: 'User profile updated successfully',
        userProfile,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: 'Validation error', 
          errors: error.errors 
        });
      } else {
        console.error('Error updating user profile:', error);
        res.status(500).json({ 
          message: 'An error occurred while processing your request' 
        });
      }
    }
  });

  // Record page view
  app.post('/api/track/pageview', async (req: Request, res: Response) => {
    try {
      const { email, page, referrer } = req.body;
      
      // If email is provided, associate with user profile
      if (email) {
        const userProfile = await storage.getUserProfileByEmail(email);
        
        if (userProfile) {
          await storage.createUserActivity({
            userProfileId: userProfile.id,
            activityType: 'page_view',
            resourceType: 'page',
            resourceName: page,
            resourceCategory: '',
            metadata: {
              timestamp: new Date().toISOString(),
              referrer: referrer || '',
              userAgent: req.headers['user-agent'],
            },
          });
        }
      }
      
      // Always return success, even if user not found, to prevent probing
      res.status(200).json({
        message: 'Activity recorded'
      });
    } catch (error) {
      console.error('Error recording page view:', error);
      // Still return success to client to prevent issues with tracking
      res.status(200).json({
        message: 'Activity received'
      });
    }
  });

  // Get user profile by email (only for authenticated admin users)
  app.get('/api/admin/user-profiles', async (req: Request, res: Response) => {
    try {
      // Only accessible by admin
      if (!req.isAuthenticated || !(req as any).isAuthenticated() || !(req as any).user?.isAdmin) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      
      const userProfiles = await storage.getAllUserProfiles();
      res.json({ data: userProfiles });
    } catch (error) {
      console.error('Error fetching user profiles:', error);
      res.status(500).json({ message: 'Error fetching user profiles' });
    }
  });

  // Get activities for a specific user profile (only for authenticated admin users)
  app.get('/api/admin/user-activities/:userProfileId', async (req: Request, res: Response) => {
    try {
      // Only accessible by admin
      if (!req.isAuthenticated || !(req as any).isAuthenticated() || !(req as any).user?.isAdmin) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      
      const userProfileId = parseInt(req.params.userProfileId);
      
      if (isNaN(userProfileId)) {
        return res.status(400).json({ message: 'Invalid user profile ID' });
      }
      
      const activities = await storage.getUserActivities(userProfileId);
      res.json({ data: activities });
    } catch (error) {
      console.error('Error fetching user activities:', error);
      res.status(500).json({ message: 'Error fetching user activities' });
    }
  });
}