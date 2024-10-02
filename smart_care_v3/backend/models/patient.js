// patient module
// patient functions



// patient module
const { Patient, PatientPhone, PatientDetails } = require('../config/patients'); // تأكد من تحديث مسار النموذج

// إضافة مريض
async function addPatient(patient) {
    try {
        const newPatient = await Patient.create(patient); // إضافة المريض إلى قاعدة البيانات
        return newPatient.get({ plain: true }); // إرجاع بيانات المريض الجديد
    } catch (error) {
        throw new Error(`Error adding patient: ${error.message}`); // التعامل مع الأخطاء
    }
}

// تعديل مريض
async function editPatient(id, updatedData) {
    try {
        const patient = await Patient.findByPk(id); // البحث عن المريض باستخدام ID
        if (!patient) {
            throw new Error('Patient not found');
        }

        await Patient.update(updatedData, { where: { id } }); // تحديث بيانات المريض
        return true; // إرجاع true عند النجاح
    } catch (error) {
        throw new Error(`Error updating patient: ${error.message}`);
    }
}

// البحث عن مريض
async function findPatient(nat_id) {
    try {
        const patient = await Patient.findOne({
					where: {
							national_id: nat_id // استخدم national_id بدلاً من id
					},
					include: [PatientPhone, PatientDetails] // تضمين الجداول الأخرى إذا كنت بحاجة إلى ذلك
				});

        return patient ? patient.get({ plain: true }) : null; // إرجاع بيانات المريض
    } catch (error) {
        throw new Error(`Error finding patient: ${error.message}`);
    }
}

module.exports = { addPatient, editPatient, findPatient };















// async function addPatient (patient) {};
// async function editPatient(patient){};
// async function findPatient(patient){};

// module.exports = {addPatient, editPatient, findPatient};
