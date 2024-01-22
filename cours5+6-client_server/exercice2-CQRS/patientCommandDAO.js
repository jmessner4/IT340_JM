let database = require("./database");
const cache = require("./cache.js");

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

function insertPatientCache({lastName, firstName, ...patient}) {
    patient.name = firstName + " " + lastName;
    cache.patientCache[patient.id] = patient;
    console.log("----------- Log du cache après un add -----------");
    console.log(cache);
}

function getIndexByID(id, isList){
    if(isList) {
        return database.patientList.findIndex((patient) => patient.id === id);
    }
    return database.patient.findIndex((patient) => patient.id === id);
}

function getPatientByID(id) {
    return database.patient[getIndexByID(id, false)];
}

function getPatientByIDList(id) {
    return database.patientList[getIndexByID(id, true)];
}

function getPatientByIDCache(id) {
    return cache.patientCache[id];
}

function updatePatient(patient) {
    //database.patient[getIndexByID(patient.id)] = patient;         //Dans l'idée on manipule ça même si dans les faits c'est déjà modifié
    console.log(database.patient);
}

function updatePatientList(patient) {
    //database.patientList[getIndexByIDList(patient.id)] = patient;         //Dans l'idée on manipule ça même si dans les faits c'est déjà modifié
    console.log("PatientList");
    console.log(database.patientList);
}

function updatePatientCache({lastName, firstName, ...patient}) {
    cache.patientCache[patient.id] = patient;
    console.log("----------- Log du cache après un save -----------");
    console.log(cache);
}

module.exports = {insertPatient, insertPatientList, insertPatientCache, getPatientByID, getPatientByIDList, getPatientByIDCache, updatePatient, updatePatientList, updatePatientCache};