

async function signout (req, res) {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Failed to log out');
    }
    res.clearCookie('sessionId'); // Clear the session cookie
    return res.status(200).send('Logged out successfully');
  });
};

module.exports = {signout};
