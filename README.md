# challengeMajorkey
Challenge import a csv file and create mongo collection

1. First steeps
First, we must install NodeJs in the next link: https://nodejs.org/en/
Second, we must install MongoDB, in the link: https://www.mongodb.com/
in the console we will use NPM to install some dependences, use the next commands
• “$ npm install mongoose –save” to install mongoose
• “$ npm install --save-dev jest” to install JEST, this is a framework to make unit
test
2. Required packages into our code
• “Fs” to manage file system.
• “Mongoose” to create the connection with the database.
3. Unit test
For the test we will use JEST, there we will make a change in the JSON Package, as seen in the following code:
“scripts”: {
“test”: “jest” },

4. Run test with npm test
