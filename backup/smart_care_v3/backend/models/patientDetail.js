
//patientDetail Table

const { Patient, PatientDetails } = require("../config/patients");

// add patient to database 
async function addPatientMedical (patient){
    try {
        const newPatient = await PatientDetails.create(patient); // إضافة المريض إلى قاعدة البيانات
        return newPatient.get({ plain: true }); // إرجاع بيانات المريض الجديد
    } catch (error) {
        throw new Error(`Error adding patient: ${error.message}`); // التعامل مع الأخطاء
    }

};




async function editPatientMedical(id, updatedData) {
    try {
        const patient = await Patient.findByPk(id); // البحث عن المريض باستخدام ID
        if (!patient) {
            throw new Error('Patient not found');
        }

        await PatientDetails.update(updatedData, { where: { patient_id: id } });
        return true; // إرجاع true عند النجاح
    } catch (error) {
        throw new Error(`Error updating patient: ${error.message}`);
    }
}

async function getPatientsInDepartment(departmentName) {
    try {
        const patients = await Patient.findAll({
            where: {
                department: departmentName, // Replace with actual department
               // state: ['new', 'persist'] // Status should be either 'new' or 'persist'
            },
						include: [PatientDetails], // تضمين جدول PatientDetails لجلب البيانات المرتبطة
            order: [
                ['createdAt', 'DESC'] // Sort by createdAt in descending order
            ]
        });
        console.log(patients);
        // Check if patients array is empty
        if (patients.length === 0) {
            return null; // يمكن إرجاع null إذا لم يوجد مرضى
        }

        return patients; // Return the array of patients
    } catch (error) {
        console.error(`Error fetching patients: ${error.message}`);
        throw error; // Handle the error
    }
}




module.exports = { addPatientMedical, editPatientMedical, getPatientsInDepartment };
