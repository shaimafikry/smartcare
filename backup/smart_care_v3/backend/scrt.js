const crypto = require('crypto');
const secret = crypto.randomBytes(32).toString('hex');
console.log(secret);  // Use this output as your SESSION_SECRET
