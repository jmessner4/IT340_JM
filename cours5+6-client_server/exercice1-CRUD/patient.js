let patientID = 0;

function incrementID() {
    return patientID++;
}

class Patient {
    id;
    lastName;
    firstName;
    creationDate;

    constructor(lastName, firstName) {
        this.id = incrementID();
        this.lastName = lastName;
        this.firstName = firstName;
        this.creationDate = new Date();
    }
}

module.exports = Patient;