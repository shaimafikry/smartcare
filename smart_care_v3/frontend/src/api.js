const API_URL = 'http://localhost:5000';


// Function to get the token from sessionStorage
const getToken = () => {
  return sessionStorage.getItem('token'); // Retrieve token from sessionStorage
};



// GET request
export const fetchData = async (endpoint) => {
	const token = getToken(); // Get the token
  const response = await fetch(`${API_URL}/${endpoint}`,
		{
			method: 'GET',
			credentials: 'include',  // Include credentials (cookies)
			headers: {
				Authorization: token ? `Bearer ${token}` : '', // Set Authorization header if token exists
			},
		});
	console.log(response);
  if (!response.ok) {
    throw new Error('Network response was not ok during fetch');
  }
  return await response.json();
};




// POST request
export const postData = async (endpoint, data) => {
	try {

		const token = getToken(); // Get the token
		const response = await fetch(`${API_URL}/${endpoint}`, {
			method: 'POST',
			 headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '', // Set Authorization header if token exists
      },
			credentials: 'include',
			body: JSON.stringify(data),
		});
	  //  console.log("this is th response",response.json);
		if (!response.ok) {
      const errorData = await response.json();  // Parse error response body
      throw new Error(errorData.message || 'An unexpected error occurred.');
    }
		return await response.json();
	} catch (error){
    //handling Errors 
			throw new Error(`HTTP error! status: ${error.message}`);
		}
};


// PUT request
export const putData = async (endpoint, data) => {
	  console.log(data);
	try{
		const token = getToken(); // Get the token
		const response = await fetch(`${API_URL}/${endpoint}`, {
			method: 'PUT',
			headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '', // Set Authorization header if token exists
      },
			credentials: 'include',
			body: JSON.stringify(data),
		});

	  //  console.log("this is th response",response.json);
		if (!response.ok) {
      const errorData = await response.json();  // Parse error response body
      throw new Error(errorData.message || 'An unexpected error occurred.');
    }
		return await response.json();
	} catch (error){
    //handling Errors 
		  console.error('Error in putData:', error); // Log the error for debugging
			throw new Error(`HTTP error! status: ${error.message}`);
		}
};


// delete request
export const deleteData = async (endpoint, data = null) => {
	try {
		 const token = getToken(); // Get the token
			const response = await fetch(`${API_URL}/${endpoint}`, {
					method: 'DELETE', // Specify DELETE method
					headers: {
						'Content-Type': 'application/json',
						Authorization: token ? `Bearer ${token}` : '', // Set Authorization header if token exists
					},
					credentials: 'include',
					body: data ? JSON.stringify(data) : null, // Include body only if there's data
			});

			if (!response.ok) {
					const errorData = await response.json();  // Parse error response body
					throw new Error(errorData.message || 'An unexpected error occurred.');
			}
			return await response.json(); // Return the parsed JSON response
	} catch (error) {
			// Handling Errors 
			console.error('Error in deleteData:', error); // Log the error for debugging
			throw new Error(`HTTP error! status: ${error.message}`);
	}
};
