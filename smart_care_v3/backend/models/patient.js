
// patient module
const { Patient, PatientDetails } = require('../config/patients'); // تأكد من تحديث مسار النموذج
const { Op } = require('sequelize'); // Make sure to import Op for Sequelize operators


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

        await Patient.update(updatedData, { where: { id: id } });
        return true; // إرجاع true عند النجاح
    } catch (error) {
        throw new Error(`Error updating patient: ${error.message}`);
    }
}


// إخراج مريض (تعديل الحالة إلى 'out')
async function dischargePatient(id) {
    try {
        const patient = await Patient.findByPk(id); // البحث عن المريض باستخدام ID
        if (!patient) {
            throw new Error('Patient not found');
        }

        // تحديث حالة المريض إلى 'out'
        await Patient.update({ status: 'out' }, { where: { id: id } });
        return true; // إرجاع true عند النجاح
    } catch (error) {
        throw new Error(`Error discharging patient: ${error.message}`);
    }
}

// البحث عن مريض
async function findPatient(searchInput) {
    try {
        // Constructing the where clause to search by either national_id or name
        const whereClause = {
            [Op.or]: [
                {
                    national_id: searchInput // Search by national_id
                },
                {
                    name: {
                        [Op.iLike]: `%${searchInput}%` // Search by name with case-insensitive matching
                    }
                }
            ]
        };

        const patients = await Patient.findAll({
            where: whereClause,
            include: [PatientDetails], // Include related details
        });

        return patients.map(patient => patient.get({ plain: true })); // Return plain objects of the patients
    } catch (error) {
        throw new Error(`Error finding patients: ${error.message}`);
    }
}



// البحث عن مريض
async function receptionistFindPatient(searchInput) {
    try {
        // Constructing the where clause to search by either national_id or name
        const whereClause = {
            [Op.or]: [
                {
                    national_id: searchInput // Search by national_id
                },
                {
                    name: {
                        [Op.iLike]: `%${searchInput}%` // Search by name with case-insensitive matching
                    }
                }
            ]
        };

        const patients = await Patient.findAll({
            where: whereClause,
        });

        return patients.map(patient => patient.get({ plain: true })); // Return plain objects of the patients
    } catch (error) {
        throw new Error(`Error finding patients: ${error.message}`);
    }
}


module.exports = { addPatient, editPatient, findPatient, receptionistFindPatient, dischargePatient };















// async function addPatient (patient) {};
// async function editPatient(patient){};
// async function findPatient(patient){};

// module.exports = {addPatient, editPatient, findPatient};
