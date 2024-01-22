class Event {
    name;
    patientId;
    payload;
    creationDate;

    constructor(name, patientId, payload) {
        this.name = name;
        this.patientId = patientId;
        this.payload = payload;
        this.creationDate = new Date();
    }
}

module.exports = Event;