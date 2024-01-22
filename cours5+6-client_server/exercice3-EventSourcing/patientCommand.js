const Patient = require("./patient");
const commandDAO = require("./patientCommandDAO");
const eventStore = require("./eventStore");



function addPatient(lastName, firstName) {
    const patient = new Patient(-1, lastName, firstName);
    eventStore.addEvent("patientAdded", patient.id, patient);

}

function savePatient(id, lastName, firstName) {

    const patient = eventStore.restorePatient(id);
    patient.lastName = lastName;
    patient.firstName = firstName;
    eventStore.addEvent("patientSaved", patient.id, patient);
}

module.exports = {addPatient, savePatient};