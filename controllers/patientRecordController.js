const { PatientRecord, Users } = require('../models');

// Get all patient records for a specific patient
exports.getPatientRecords = async (req, res) => {
    try {
        const patientId = req.params.patientId;
        console.log(patientId);

        // Fetch all records for a specific patient
        const records = await PatientRecord.findAll({
            where: { patientId },
            include: [
                {
                    model: Users,
                    as: 'doctor',
                    attributes: ['id', 'name', 'email']
                }
            ]
        });


        if (!records.length) {
            return res.render('doctor/patient-records', { records: [],patientId , message: 'No records found for this patient' });
        }

       return res.render('doctor/patient-records', { records,patientId , message: null });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong while fetching patient records' });
    }
};

// Create a new patient record
exports.createPatientRecord = async (req, res) => {
    try {
        const { patientId, diagnosis, treatment, prescription, notes } = req.body;

        const doctorId = req.user.id;
        // Create a new record
        const newRecord = await PatientRecord.create({
            patientId,
            doctorId,
            diagnosis,
            treatment,
            prescription,
            notes,
            admissionDate: new Date()
        });

        res.redirect('back');


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create patient record' });
    }
};

// Update an existing patient record
exports.updatePatientRecord = async (req, res) => {
    try {
        const recordId = req.params.id;
        const { diagnosis, treatment, prescription, notes } = req.body;

        // Find the patient record by its ID
        const record = await PatientRecord.findByPk(recordId);

        if (!record) {
            return res.status(404).json({ error: 'Record not found' });
        }

        // Update the record
        await record.update({ diagnosis, treatment, prescription, notes });
        res.json({ message: 'Patient record updated successfully', record });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update patient record' });
    }
};

// Delete a patient record
exports.deletePatientRecord = async (req, res) => {
    try {
        const recordId = req.params.id;

        // Find the patient record by its ID
        const record = await PatientRecord.findByPk(recordId);

        if (!record) {
            return res.status(404).json({ error: 'Record not found' });
        }

        // Delete the record
        await record.destroy();
        res.json({ message: 'Patient record deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete patient record' });
    }
};

// Get patient records by doctor (for doctors to view their patients)
exports.getDoctorRecords = async (req, res) => {
    try {
        const doctorId = req.params.doctorId;

        // Fetch all records assigned to a specific doctor
        const records = await PatientRecord.findAll({
            where: { doctorId },
            include: [
                {
                    model: Users,
                    as: 'patient',
                    attributes: ['id', 'name', 'email']  // Include patient's details
                }
            ]
        });

        if (!records) {
            return res.status(404).json({ error: 'No records found for this doctor' });
        }

        res.json(records);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong while fetching doctor records' });
    }
};

