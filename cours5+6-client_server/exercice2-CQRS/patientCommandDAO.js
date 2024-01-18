let database = require("./database");

/*function setPatientWithoutDate(patient) {
    delete patient.creationDate;
    return patient;
}*/

function insertPatient(patient) {
    database.patient.push(patient);
}

function insertPatientList({creationDate, ...patient}) {
    database.patientList.push(patient);
}

function getIndexByID(id){
    return database.patient.findIndex((patient) => patient.id === id);
}

function getIndexByIDList(id){
    return database.patientList.findIndex((patient) => patient.id === id);
}

function getPatientByID(id) {
    return database.patient[getIndexByID(id)];
}

function getPatientByIDList(id) {
    return database.patientList[getIndexByIDList(id)];
}

function updatePatient(patient) {
    //database.patient[getIndexByID(patient.id)] = patient;         //Dans l'idée on manipule ça même si dans les faits c'est déjà modifié
    console.log(database.patient);
}

function updatePatientList(patient) {
    //database.patient[getIndexByID(patient.id)] = patient;         //Dans l'idée on manipule ça même si dans les faits c'est déjà modifié
    console.log(database.patientList);
}

module.exports = {insertPatient, insertPatientList, getPatientByID, getPatientByIDList, updatePatient, updatePatientList};