const queryDAO = require("./patientQueryDAO");

function getPatientList() {
    return queryDAO.retrievePatientList();
}

function getPatient(id) {
    return queryDAO.retrievePatient(id);
}

module.exports = {getPatientList, getPatient};