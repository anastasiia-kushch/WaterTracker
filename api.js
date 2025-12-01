import axios from 'axios';

const API_URL = 'https://692e10d4e5f67cd80a4dccd1.mockapi.io/watertracker/user';

let user = null;

export async function fetchUser() {
  try {
    const response = await axios.get(API_URL);
    user = response.data[0];
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}
