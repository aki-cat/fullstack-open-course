const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log("Missing argument: password. Try node mongo.js [password]");
    process.exit(1);
}

const password = encodeURIComponent(process.argv[2]);
const url = `mongodb+srv://fullstack:${password}@cluster0.avaz8hp.mongodb.net/?appName=Cluster0`;

mongoose.set('strictQuery', false);
mongoose.connect(url, { family: 4 });

const Person = mongoose.model("Person", new mongoose.Schema({
    name: String,
    number: String
}));

/**
 * Add a person to the People collection
 * @param {string} name
 * @param {string} number
 * @returns {Promise<void>}
 */
function addPerson(name, number) {
    return new Person({ name, number }).save().then(result => {
        console.log(`added ${name} ${number} to phonebook`);
    });
}

/**
 * List all people in the People collection
 * @returns {Promise<void>}
 */
function listPeople() {
    return Person.find({}).then(people => {
        console.log("phonebook:");
        people.map(person => {
            console.log(`${person.name} ${person.number}`);
        });
    });
}

/**
 * Runs the program
 * @returns {Promise<void>}
 */
function run() {
    if (process.argv.length >= 5) {
        const name = process.argv[3];
        const number = process.argv[4];
        return addPerson(name, number);
    } else {
        return listPeople();
    }
}

run().then(() => {
    mongoose.connection.close();
}).catch(err => console.error(err));
