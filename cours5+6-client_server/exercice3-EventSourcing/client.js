const patientCommande = require("./patientCommand");
const patientQuery = require("./patientQuery");

// ******************* Exercice 3 ******************* 
patientCommande.addPatient("Rapp","Reneé");
patientCommande.addPatient("Elordi","Jacob");
patientCommande.addPatient("Loane","Lyndsay");

console.log("***************** test getPatientList *****************");
console.log(patientQuery.getPatientList());

patientCommande.savePatient(2,"Lynch","Ross");