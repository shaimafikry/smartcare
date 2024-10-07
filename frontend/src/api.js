const API_URL = 'https://localhost:5000.com';

// GET request
export const fetchData = async (endpoint) => {
  const response = await fetch(`${API_URL}/${endpoint}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

// POST request
export const postData = async (endpoint, data) => {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
 //handling Errors 
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};
