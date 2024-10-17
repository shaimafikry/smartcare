


async function showUser(req, res) {
	// Assuming req.user is populated by the authToken middleware
	res.status(200).json({
			message: 'Welcome to the reception dashboard',
			user: req.user
	});
};

module.exports = { showUser};
