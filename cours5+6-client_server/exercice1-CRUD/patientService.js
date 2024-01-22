const Patient = require("./patient");
const patientDAO = require("./patientDAO");


function addPatient(lastName, firstName) {
    const patient = new Patient(lastName, firstName);
    patientDAO.insertPatient(patient);
}

function getPatientList() {
    return patientDAO.retrievePatientList();
}

function savePatient(id, lastName, firstName) {
    const patient = patientDAO.getPatientByID(id);
    patient.lastName = lastName;
    patient.firstName = firstName;
    patientDAO.updatePatient(patient);
}

function getPatient(id) {
    return patientDAO.retrievePatient(id);
}

module.exports = {addPatient, getPatientList, savePatient, getPatient};