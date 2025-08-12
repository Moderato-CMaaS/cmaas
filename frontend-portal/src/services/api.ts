// Base API service for making requests
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// API Key interface
export interface ApiKey {
  id: string;
  name: string; 
  key: string; // This will be partially masked when retrieved
  createdAt: string;
  lastUsed?: string; // Optional as it might not be available for new keys
}

// Type for API key creation response
export interface ApiKeyCreationResponse {
  id: string;
  name: string;
  key: string; // Full key is only returned when created
  createdAt: string;
}

// Error response interface
export interface ApiError {
  message: string;
  statusCode: number;
}

// Mock data for development
let mockApiKeys: ApiKey[] = [
  {
    id: 'key-1',
    name: 'Production API Key',
    key: 'pk_live_51NBzT8aKZ9DsLExGFhnJYnuSLGTOr5DYKmsNr92XE',
    createdAt: '2023-09-15T14:28:32.000Z',
    lastUsed: '2023-12-01T09:14:23.000Z',
  },
  {
    id: 'key-2',
    name: 'Development API Key',
    key: 'pk_test_51NBzT8aKZ9DsLExGFhnJYnuSLGTOr5DYKmsNr92XE',
    createdAt: '2023-10-21T08:12:45.000Z',
    lastUsed: '2023-11-28T16:32:11.000Z',
  },
];

// Helper function to generate random API key
const generateRandomApiKey = (): string => {
  const prefix = 'pk_' + (Math.random() > 0.5 ? 'live' : 'test') + '_';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const keyLength = 40;
  let result = prefix;
  
  for (let i = 0; i < keyLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return result;
};

// Simulate delay to mimic API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API Keys Service with mock implementation
export const apiKeyService = {
  // Get all API keys
  getApiKeys: async (): Promise<ApiKey[]> => {
    console.log('Fetching API keys...');
    // Simulate network delay
    await delay(800);
    
    // Return deep copy of mock data
    return JSON.parse(JSON.stringify(mockApiKeys));
  },

  // Create a new API key
  createApiKey: async (name: string): Promise<ApiKeyCreationResponse> => {
    console.log(`Creating API key with name: ${name}`);
    // Simulate network delay
    await delay(1000);
    
    const newKey = generateRandomApiKey();
    const newApiKey: ApiKey = {
      id: `key-${Date.now()}`,
      name,
      key: newKey,
      createdAt: new Date().toISOString(),
    };
    
    mockApiKeys.push(newApiKey);
    
    return {
      id: newApiKey.id,
      name: newApiKey.name,
      key: newKey, // Return the full key for creation response
      createdAt: newApiKey.createdAt,
    };
  },

  // Delete an API key
  deleteApiKey: async (id: string): Promise<void> => {
    console.log(`Deleting API key with ID: ${id}`);
    // Simulate network delay
    await delay(500);
    
    const initialLength = mockApiKeys.length;
    mockApiKeys = mockApiKeys.filter(key => key.id !== id);
    
    // If no key was removed, simulate an error
    if (mockApiKeys.length === initialLength) {
      throw new Error(`API key with ID ${id} not found`);
    }
  },
};
