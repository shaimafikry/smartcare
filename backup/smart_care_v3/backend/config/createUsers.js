const { User } = require('./users')
const readline = require('readline-sync');  // Import readline-sync for easier prompts
const bcrypt = require('bcrypt');           // Import bcrypt for password hashing

// Function to insert a new user with all data from terminal
async function insertUser() {
    try {
        // Prompt for user details from the terminal
        const email = readline.question('Enter email: ');
        const plainPassword = readline.question('Enter password: ', { hideEchoBack: true });
        const role = readline.question('Enter role: ');
        const name = readline.question('Enter name: ');
        const age = readline.questionInt('Enter age (optional, press enter to skip): ', { defaultInput: 25 });
        const department = readline.question('Enter department: ');
        const phone = readline.question('Enter phone:  (optional, press enter to skip): ', { defaultInput: '+201122744201' });
        const nationalId = readline.question('Enter national ID:  (optional, press enter to skip): ', { defaultInput: '30210101001010' });
        // Hash the password
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        // Create the new user
        const newUser = await User.create({
            email,
            password: hashedPassword,
            role,
            name,
            age,
            department,
            phone,
            national_id: nationalId
        });
        console.log('User successfully inserted:', newUser);
    } catch (error) {
        console.error('Error inserting user:', error);
    }
}

insertUser();
