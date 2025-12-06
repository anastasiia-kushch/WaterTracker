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

export async function addLog(amount) {
  if (!user) {
    await fetchUser();
  }

  const today = new Date().toISOString().split('T')[0];

  const updatedLogs = { ...user.logs };

  if (!updatedLogs[today]) {
    updatedLogs[today] = [];
  } else {
    updatedLogs[today] = [...updatedLogs[today]];
  }

  updatedLogs[today].push(amount);

  const updatedDrunk = (user.drunk || 0) + amount;

  const response = await axios.put(`${API_URL}/${user.id}`, {
    ...user,
    drunk: updatedDrunk,
    logs: updatedLogs,
  });

  user = response.data;

  return user;
}

export { user };
