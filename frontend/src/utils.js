
// const decodeJWT = (token) => {
// 	// Split the token into its parts
// 	const parts = token.split('.');
//   console.log(parts)
// 	// Check if the token is valid
// 	if (parts.length !== 3) {
// 			throw new Error('Invalid JWT token');
// 	}

// 	// Decode the payload (second part) from base64url to JSON
// 	const payload = parts[1];
// 	const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));

// 	return decodedPayload;
// };


// const handleReload = () => {
//   setTimeout(() => {
//     window.location.reload(); // Reloads the page after a delay
//   }, 2000); // Delay of 2000 milliseconds (2 seconds)
// };



// module.exports = { decodeJWT, handleReload};
