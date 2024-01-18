const Patient = require("./patient");
const commandDAO = require("./patientCommandDAO");


function addPatient(lastName, firstName) {
    const patient = new Patient(lastName, firstName);
    commandDAO.insertPatient(patient);
    commandDAO.insertPatientList(patient);
}

function savePatient(id, lastName, firstName) {
    const patient = commandDAO.getPatientByID(id);
    patient.lastName = lastName;
    patient.firstName = firstName;
    commandDAO.updatePatient(patient);
    const patientList = commandDAO.getPatientByIDList(id);
    patientList.lastName = lastName;
    patientList.firstName = firstName;
    commandDAO.updatePatientList(patient);
}

module.exports = {addPatient, savePatient};