const patientService = require("./patientService");
const patientCommande = require("./patientCommand");
const patientQuery = require("./patientQuery");

// ******************* Exercice 1 ******************* 
patientService.addPatient("Seux","Catherine");
patientService.addPatient("Messner", "Bertrand");
patientService.addPatient("Schaeffer", "Christiane");
patientService.addPatient("Barbier", "Renée");
patientService.addPatient("Messner", "Alexandre");

console.log(patientService.getPatientList());

patientService.savePatient(1,"Messner", "Bertrand, Antoine"); 

console.log(patientService.getPatient(1));