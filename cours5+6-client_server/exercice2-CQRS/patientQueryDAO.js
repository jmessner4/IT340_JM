let database = require("./database");

function retrievePatientList() {
    return database.patient.map(({creationDate, ...patient}) => patient);
}

function retrievePatient(id) {
    const patientGet = database.patient.filter((patient) => patient.id === id);
    return patientGet.map(({lastName, firstName, ...patient}) => { patient.name = firstName + " " + lastName;  return patient;});
}

module.exports = {retrievePatientList, retrievePatient};