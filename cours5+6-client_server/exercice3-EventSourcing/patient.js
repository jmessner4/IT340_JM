let patientID = 0;

function incrementID() {
    return patientID++;
}

class Patient {
    id;
    lastName;
    firstName;
    creationDate;

    constructor(id, lastName, firstName) {
        if(id === -1) {
            this.id = incrementID();
        } else {
            this.id = id;
        }
        this.lastName = lastName;
        this.firstName = firstName;
        this.creationDate = new Date();
    }
}

module.exports = Patient;