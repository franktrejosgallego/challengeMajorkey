const fs = require('fs');
const mongoose = require('mongoose');



// define Schema
var PatientsSchema = mongoose.Schema({
    ProgramIdentifier: { type: Number, require: true},
    DataSource: { type: String, require: true},
    CardNumber: { type: Number, require: true},
    MemberID: {type: Number, require: true},
    FirstName: { type: String, require: false},
    LastName: {type: String, require: true},
    DateofBirth: {type: String, require: true},
    Address1: {type: String, require: true},
    Address2: {type: String, require: false},
    City: {type: String, require: true},
    State: {type: String, require: true},
    Zipcode: {type: String, require: true},
    Telephonenumber: {type: String, require: false},
    EmailAddress: {type: String, require: false},
    CONSENT: {type: String, require: true}, // Y or N
    MobilePhone : {type: String, require: true}
});

var emailsSchema = mongoose.Schema({
    id: {type: Number, require: true},
    name: {type: String, require: true},
    scheduleDate: {type:Date, require: true}
});

exports.ProcessFile = function(filePath)
{
    const fileLines = this.readFile(filePath)
    const patientsCollection = this.processLines(fileLines);
    this.saveCollection(patientsCollection, "Patients", PatientsSchema);
    const EmailCollection = this.generateMailCollection(patientsCollection);
    this.saveCollection(EmailCollection, "Emails", emailsSchema);
}

exports.readFile = function (path) {
    if (path) {
        try {
            if (fs.existsSync(path)) {
                const allFileContents = fs.readFileSync(path, 'utf-8');
                return allFileContents.split(/\r?\n/)
            }else{
                console.log("File does not exist!");
            }
        }
        catch (err) {
            console.error(err);
        }
    }
}
    
exports.processLines = function (fileLines){
    if (fileLines) {
        var collection = [];
        fileLines.forEach(line =>  {
            lineVector = line.split('|');
            item = {
                ProgramIdentifier: lineVector[0],
                DataSource: lineVector[1],
                CardNumber: lineVector[2],
                MemberID: lineVector[3],
                FirstName: lineVector[4],
                LastName: lineVector[5],
                DateofBirth: lineVector[6],
                Address1: lineVector[7],
                Address2: lineVector[8],
                City: lineVector[9],
                State: lineVector[10],
                Zipcode: lineVector[11],
                Telephonenumber: lineVector[12],
                EmailAddress: lineVector[13],
                CONSENT: lineVector[14],
                MobilePhone : lineVector[15]
            };
            collection.push(item);
        });
    }

    return collection;
}

exports.generateMailCollection = function (patientsCollection) {
    if (patientsCollection) {

            let counter = 1;
            const date = new Date();
            let emailCollection = [];

            const filtered = patientsCollection.filter(x => x.CONSENT === "Y");
            filtered.forEach(element => {
                item = {
                    id: counter,
                    name: 'Day ' + counter,
                    scheduleDate: date.setDate(date.getDate() + counter)
                }
                emailCollection.push(item);
                counter++;
        });
    return emailCollection;
    }
}

exports.saveCollection = function (theCollection, collectionName, schemaModel) {
    if (theCollection) {
        mongoose.connect('mongodb://localhost:27017/test');
        
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
 
        db.once('open', function() {
            console.log("Connection Successful!");
             
            var patients = db.model(collectionName, schemaModel, collectionName);
         
            patients.collection.insertMany(theCollection, function (err, docs) {
              if (err){ 
                  return console.error(err);
              } else {
                console.log("Multiple documents inserted to Collection " + collectionName);
              }
            });
        });
    }
}
