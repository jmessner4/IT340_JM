let database = require("./database");

function insertPatient(patient) {
    database.patient.push(patient);
    //console.log(database.patient);
}

function retrievePatientList() {
    return database.patient.map(({creationDate, ...patient}) => patient);
}

function getIndexByID(id){
    return database.patient.findIndex((patient) => patient.id === id);
}

function getPatientByID(id) {
    return database.patient[getIndexByID(id)];
}

function updatePatient(patient) {
    //database.patient[getIndexByID(patient.id)] = patient;         //Dans l'idée on manipule ça même si dans les faits c'est déjà modifié
    console.log(database.patient);
}

function retrievePatient(id) {
    const patientGet = database.patient.filter((patient) => patient.id === id);
    return patientGet.map(({lastName, firstName, ...patient}) => { patient.name = firstName + " " + lastName;  return patient;});
}

module.exports = {insertPatient, retrievePatientList, getPatientByID, updatePatient, retrievePatient};