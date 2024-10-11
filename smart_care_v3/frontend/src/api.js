const API_URL = 'http://localhost:5000';






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
	try{
		const response = await fetch(`${API_URL}/${endpoint}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
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
