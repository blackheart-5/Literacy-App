const API_BASE_URL = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.1'

//process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'An error occurred');
  }
  return response.json();
}

export const updateUserSettings = async (settings) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store the auth token in localStorage
      },
      body: JSON.stringify(settings)
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error updating user settings:', error);
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};