const patientCommande = require("./patientCommand");
const patientQuery = require("./patientQuery");

// ******************* Exercice 2 ******************* 
patientCommande.addPatient("Lynch","Ross");
patientCommande.addPatient("Elordi","Jacob");
patientCommande.addPatient("Lyndsay","Loane");

console.log("***************** test getPatientList *****************");
console.log(patientQuery.getPatientList());

patientCommande.savePatient(2,"Loane","Lyndsay");

console.log("***************** test getPatient depuis cache *****************");
console.log(patientQuery.getPatient(1));