require('dotenv').config({ path: './config/.env' });


const verifySession = ((req, res, next) => {
	const tabToken = req.headers['tab-token']; // git the tab token

	// Fetch the session from the database or in-memory store

	if (req.session && req.session.tabToken === tabToken) {
			// Session is valid and specific to this tab
			next();
	} else {
			// Invalid session or token mismatch
			res.status(401).json({ message: 'Invalid session' });
	}
});


module.exports = verifySession;
