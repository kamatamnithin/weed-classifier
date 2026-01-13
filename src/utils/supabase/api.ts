import { supabase, SERVER_URL } from './client';
import { publicAnonKey } from './info';

export interface SignupData {
  email: string;
  password: string;
  name: string;
}

export interface PredictionData {
  prediction: 'Weed' | 'Crop';
  confidence: number;
  imageName: string;
  filePath?: string;
  timestamp: number;
}

// Sign up new user
export async function signUp({ email, password, name }: SignupData) {
  try {
    const response = await fetch(`${SERVER_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Signup failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
}

// Sign in user
export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
}

// Sign out user
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}

// Get current session
export async function getSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  } catch (error) {
    console.error('Get session error:', error);
    return null;
  }
}

// Upload image to server
export async function uploadImage(imageData: string, fileName: string, accessToken: string) {
  try {
    const response = await fetch(`${SERVER_URL}/upload-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ imageData, fileName }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Image upload failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Image upload error:', error);
    throw error;
  }
}

// Get ML prediction from server
export async function getPrediction(imageData: string, fileName: string, accessToken: string) {
  try {
    const response = await fetch(`${SERVER_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ imageData, fileName }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Prediction failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Prediction error:', error);
    throw error;
  }
}

// Save prediction result to database
export async function savePrediction(predictionData: PredictionData, accessToken: string) {
  try {
    const response = await fetch(`${SERVER_URL}/save-prediction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(predictionData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Save prediction failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Save prediction error:', error);
    throw error;
  }
}

// Get prediction history from server
export async function getPredictionHistory(accessToken: string) {
  try {
    const response = await fetch(`${SERVER_URL}/predictions`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch history');
    }

    const data = await response.json();
    return data.predictions;
  } catch (error) {
    console.error('Get history error:', error);
    throw error;
  }
}

// Get statistics from server
export async function getStatistics(accessToken: string) {
  try {
    const response = await fetch(`${SERVER_URL}/stats`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch statistics');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get statistics error:', error);
    throw error;
  }
}
