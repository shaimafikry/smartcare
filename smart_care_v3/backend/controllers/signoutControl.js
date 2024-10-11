

async function signout (req, res) {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Failed to log out');
    }
    res.clearCookie('sessionId');
		res.clearCookie('token'); // Clear the session cookie
    return res.status(200).json('Logged out successfully');
  });
};

module.exports = {signout};
