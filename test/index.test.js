const helper = require('../challengeHelper');



describe('Challenge Test', () => {
    test('Test # 1, elements number in file', () => {
        const fileLines = helper.readFile('../data.csv')
        const patientsCollection = helper.processLines(fileLines);
    
        expect(patientsCollection).toHaveLength(19);
    });

    test('Test # 2, patients where first name is missing', () => {
        const fileLines = helper.readFile('../data.csv')
        const patientsCollection = helper.processLines(fileLines);
        const filtered = patientsCollection.filter(x => !x.FirstName);

        console.log(filtered);

        expect(filtered).toHaveLength(2);
    });

    test('test # 3', () => {
        const fileLines = helper.readFile('../data.csv')
        const patientsCollection = helper.processLines(fileLines);
        const filtered = patientsCollection.filter(x => !x.EmailAddress && x.CONSENT === "Y");

        console.log(filtered);

        expect(filtered).toHaveLength(1);
    });


    test('test # 4', () => {
        const fileLines = helper.readFile('../data.csv')
        const patientsCollection = helper.processLines(fileLines);
        const filtered = patientsCollection.filter(x => x.CONSENT === "Y");

        filtered.forEach(item =>{
            if (item.EmailAddress) {
                expect(item.EmailAddress).toMatch(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/);
            }
            
        });
    });


    test('test # 5', () => {
        const fileLines = helper.readFile('../data.csv')
        const patientsCollection = helper.processLines(fileLines);
        const EmailCollection = helper.generateMailCollection(patientsCollection);
    
        const date = new Date();
        const datePlusThreeDays = date.setDate(date.getDate() + 3);

        expect(datePlusThreeDays - EmailCollection[2].scheduleDate).toBeLessThan(10); 
    });

});