let database = require("./database");
const cache = require("./cache.js");

function retrievePatientList() {
    //return database.patient.map(({creationDate, ...patient}) => patient);
    return database.patientList;

}

function retrievePatient(id) {
    /*const patientGet = database.patient.filter((patient) => patient.id === id);
    return patientGet.map(({lastName, firstName, ...patient}) => { patient.name = firstName + " " + lastName;  return patient;});*/
    return cache.patientCache[id];
}

module.exports = {retrievePatientList, retrievePatient};