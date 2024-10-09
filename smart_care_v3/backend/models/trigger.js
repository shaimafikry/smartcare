module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_state_on_department_change()
      RETURNS TRIGGER AS $$
      BEGIN
        IF TG_OP = 'INSERT' OR (NEW.department <> OLD.department) THEN
          NEW.state := 'new';
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER update_state_on_department_change
      BEFORE INSERT OR UPDATE ON "Patients"
      FOR EACH ROW
      EXECUTE FUNCTION update_state_on_department_change();
    `);

    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_patient_state_on_patientdetails_change()
      RETURNS TRIGGER AS $$
      BEGIN
        UPDATE "Patients"
        SET state = 'persist'
        WHERE id = NEW.patient_id;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER update_patient_state_on_patientdetails_change
      AFTER INSERT OR UPDATE ON "PatientDetails"
      FOR EACH ROW
      EXECUTE FUNCTION update_patient_state_on_patientdetails_change();
    `);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS update_state_on_department_change ON "Patients";
      DROP FUNCTION IF EXISTS update_state_on_department_change;

      DROP TRIGGER IF EXISTS update_patient_state_on_patientdetails_change ON "PatientDetails";
      DROP FUNCTION IF EXISTS update_patient_state_on_patientdetails_change;
    `);
  }
};
