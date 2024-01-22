

function addPatient(lastName, firstName) {
    const patient = new Patient(lastName, firstName);
    patientDAO.insertPatient(patient);
}