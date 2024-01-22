const Event = require("./event");
const Patient = require("./patient");

eventList = [];

function addEvent(nameEvent, patientID, payload) {
    const newEvent = new Event(nameEvent, patientID, payload);
    eventList.push(newEvent);
    console.log("=============== eventList");
    console.log(eventList);
}

function restorePatient(id) {
    const pastEvents = eventList.filter((event) => event.patientId === id);
    return reviewEvents2(pastEvents);
}

function reviewEvents(events) {
    let patient;
    events.forEach(element => {
        switch(element.name) {
            case "patientAdded": 
                patient = new Patient(element.payload.id, element.payload.lastName, element.payload.firstName);
                patient.creationDate = element.payload.creationDate;
                break;
            case "patientSaved":
                patient.lastName = element.payload.lastName;
                patient.firstName = element.payload.firstName;
                break;
        };
    });
    console.log(patient)
    return patient;
}

function reviewEvents2(events) {
    const reducePatient = events.reduce(function (patient, currentEvent) {
        switch(currentEvent.name) {
            case "patientAdded": 
                patient.id = currentEvent.payload.id;
                patient.lastName = currentEvent.payload.lastName;
                patient.firstName = currentEvent.payload.firstName;
                patient.creationDate = currentEvent.payload.creationDate;
                return patient;
            case "patientSaved":
                patient.lastName = currentEvent.payload.lastName;
                patient.firstName = currentEvent.payload.firstName;
                return patient;
        };
    }, { });
    const patientFinal = new Patient(reducePatient.id, reducePatient.lastName, reducePatient.firstName);
    patientFinal.creationDate = reducePatient.creationDate;
    return patientFinal;

}

module.exports = {eventList, addEvent, restorePatient};