const sequelize = require('./db'); // assuming the db config file for Sequelize instance


const departmentTrigger = sequelize.query(`
      CREATE OR REPLACE FUNCTION update_state_on_department_change()
      RETURNS TRIGGER AS $$
      BEGIN
        IF TG_OP = 'INSERT' OR (NEW.department <> OLD.department) THEN
          NEW.status := 'new';
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER update_state_on_department_change
      BEFORE INSERT OR UPDATE ON "Patients"
      FOR EACH ROW
      EXECUTE FUNCTION update_state_on_department_change();
    `);

const updateTrigger = sequelize.query(`
      CREATE OR REPLACE FUNCTION update_patient_state_on_patientdetails_change()
      RETURNS TRIGGER AS $$
      BEGIN
        UPDATE "Patients"
        SET status = 'resident'
        WHERE id = NEW.patient_id;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER update_patient_state_on_patientdetails_change
      AFTER INSERT OR UPDATE ON "PatientDetails"
      FOR EACH ROW
      EXECUTE FUNCTION update_patient_state_on_patientdetails_change();
    `);

module.exports = {departmentTrigger, updateTrigger}
