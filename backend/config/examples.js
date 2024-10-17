const { Patient, PatientDetails } = require('./patients'); // Import the models

// Function to create sample patients and details
async function createSampleData() {
    try {
        // Example 1: Patient and their details
        const patient1 = await Patient.create({
            name: 'John Doe',
            gender: 'Male',
            age: 45,
            national_id: '123456789',
            phone_number: '555-1234',
            department: 'Cardiology',
            state: 'CA'
        });
        await PatientDetails.create({
            complain: 'Chest pain',
            treatment: 'Aspirin and rest',
            history: 'High blood pressure',
            diagnosis: 'Angina',
            heart_rate: 78,
            temp: 37.0,
            sugar: 110,
            oxygen_sat: 98,
            blood_pressure: '120/80',
            res_rate: 18,
            discharge_notes: 'Stable condition',
            patient_id: patient1.id
        });

        // Example 2: Another patient and details
        const patient2 = await Patient.create({
            name: 'Jane Smith',
            gender: 'Female',
            age: 34,
            national_id: '987654321',
            phone_number: '555-5678',
            department: 'Neurology',
            state: 'NY'
        });
        await PatientDetails.create({
            complain: 'Headache',
            treatment: 'Ibuprofen',
            history: 'Migraine',
            diagnosis: 'Migraine',
            heart_rate: 72,
            temp: 36.8,
            sugar: 100,
            oxygen_sat: 99,
            blood_pressure: '115/75',
            res_rate: 16,
            discharge_notes: 'Condition improved',
            patient_id: patient2.id
        });

        // Example 3: Third patient
        const patient3 = await Patient.create({
            name: 'Robert Lee',
            gender: 'Male',
            age: 29,
            national_id: '456789123',
            phone_number: '555-7890',
            department: 'Orthopedics',
            state: 'TX'
        });
        await PatientDetails.create({
            complain: 'Back pain',
            treatment: 'Physical therapy',
            history: 'Previous injury',
            diagnosis: 'Disc herniation',
            heart_rate: 80,
            temp: 37.2,
            sugar: 105,
            oxygen_sat: 97,
            blood_pressure: '125/80',
            res_rate: 20,
            discharge_notes: 'Referred to physical therapy',
            patient_id: patient3.id
        });

        // Example 4: Fourth patient
        const patient4 = await Patient.create({
            name: 'Linda Green',
            gender: 'Female',
            age: 52,
            national_id: '321654987',
            phone_number: '555-5432',
            department: 'Endocrinology',
            state: 'FL'
        });
        await PatientDetails.create({
            complain: 'Fatigue',
            treatment: 'Levothyroxine',
            history: 'Hypothyroidism',
            diagnosis: 'Hypothyroidism',
            heart_rate: 65,
            temp: 36.5,
            sugar: 95,
            oxygen_sat: 96,
            blood_pressure: '110/70',
            res_rate: 14,
            discharge_notes: 'Regular follow-up required',
            patient_id: patient4.id
        });

        // Example 5: Fifth patient
        const patient5 = await Patient.create({
            name: 'Emily Brown',
            gender: 'Female',
            age: 41,
            national_id: '654321987',
            phone_number: '555-2345',
            department: 'Oncology',
            state: 'IL'
        });
        await PatientDetails.create({
            complain: 'Unexplained weight loss',
            treatment: 'Chemotherapy',
            history: 'Breast cancer',
            diagnosis: 'Cancer',
            heart_rate: 85,
            temp: 38.5,
            sugar: 90,
            oxygen_sat: 95,
            blood_pressure: '135/85',
            res_rate: 22,
            discharge_notes: 'Advised for regular monitoring',
            patient_id: patient5.id
        });

        console.log('Sample data inserted successfully.');
    } catch (error) {
        console.error('Error inserting sample data:', error);
    }
}

// Call the function to create sample data
createSampleData();
