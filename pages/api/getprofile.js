import fetch from 'node-fetch';



export default async function getUserProfile() {
  try {
    const response = await fetch(`/api/profile`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',

          //'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store the auth token in localStorage
          },
        body: JSON.stringify({email, username})
      }
    );
  
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'An error occurred');
  }
  return response.json();
}

export const updateUserSettings = async (settings) => {
  try {
    const response = await fetch(`/api/settings`, {
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

