// backend/config/initDB.js
const createUsersTable = require('./createUsersTable');
const createPatientsTable = require('./createPatientsTable');
const createRelationshipsTable = require('./createRelationshipsTable'); // إضافة جدول العلاقات

const createTables = async () => {
  try {
    await createUsersTable();
    await createPatientsTable();
    await createRelationshipsTable(); // إنشاء الجداول للعلاقات
    console.log('All tables created successfully.');
  } catch (err) {
    console.error('Error creating tables:', err);
  } finally {
    pool.end(); // أغلق الاتصال بقاعدة البيانات بعد الانتهاء
  }
};

createTables();
