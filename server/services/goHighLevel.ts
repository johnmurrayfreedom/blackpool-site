import axios from 'axios';

interface ContactData {
  email: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  phone?: string;
  address1?: string;
  city?: string;
  postalCode?: string;
  source?: string;
  tags?: string[];
  customField?: Record<string, string>;
}

export async function createContact(contactData: ContactData): Promise<any> {
  try {
    // Check if required credentials are available
    const apiKey = process.env.GO_HIGH_LEVEL_API_KEY;
    const locationId = process.env.GO_HIGH_LEVEL_LOCATION_ID;
    
    if (!apiKey || !locationId) {
      throw new Error('Missing Go High Level credentials: API key or location ID');
    }

    // Prepare the full name if provided in parts
    let fullName = contactData.name;
    if (!fullName && (contactData.firstName || contactData.lastName)) {
      fullName = [contactData.firstName, contactData.lastName].filter(Boolean).join(' ');
    }

    // Prepare the data for Go High Level
    const payload = {
      email: contactData.email,
      phone: contactData.phone || '',
      firstName: contactData.firstName || '',
      lastName: contactData.lastName || '',
      name: fullName || '',
      address1: contactData.address1 || '',
      city: contactData.city || '',
      postalCode: contactData.postalCode || '',
      source: contactData.source || 'website',
      tags: contactData.tags || ['website-inquiry'],
      customField: contactData.customField || {}
    };

    // Make the API request to Go High Level
    const response = await axios.post(
      `https://rest.gohighlevel.com/v1/contacts/`,
      payload,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Location-Id': locationId
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error creating contact in Go High Level:', error);
    throw error;
  }
}

export async function sendContactFormToHighLevel(formData: any): Promise<any> {
  const contactData: ContactData = {
    email: formData.email,
    name: formData.fullName,
    phone: formData.phone,
    postalCode: formData.postcode,
    source: 'contact-form',
    tags: ['contact-form-submission'],
    customField: {
      'message': formData.message || '',
      'service_interest': formData.serviceInterest || ''
    }
  };

  return createContact(contactData);
}