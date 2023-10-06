const mongodb = require("mongodb");
const Person = require("../models/Person");

const PersonsCollection = (db) => {
  //makes 2 collections with the database, "persons" and "total"
  const collection = db.collection("persons");
  const totalCollection = db.collection("total");

  //gets the total amount of money
  const getTotal = () => {
    return totalCollection.findOne().then(result => result);
  }

  //updates the total amount of money
  const updateTotal = (amountToAdd) => {
    return totalCollection.findOne().then(total => {
      const newTotal = parseInt(total.total) + parseInt(amountToAdd);
      return totalCollection.updateOne({}, { $set: { total: newTotal } }).then(result => {
        return result;
      });
    });
  }

  //resets the total to 0 to restart the raffle
  const resetTotal = () => {
    return totalCollection.updateOne({}, { $set: { total: 0 } }).then(result => result);
  }

  //gets all the people currently entered in the raffle (duplicates allowed)
  const getAllPersons = () => {
    return collection
      .find()
      .toArray()
      .then((cursor) => {
        //console.log(`getAllPersons::returning ${cursor.length} items`);
        return cursor;
      });
  };

  //picks a random person from the persons collection
  const getRandomPerson = () => {
    return collection
      .find()
      .toArray()
      .then((cursor) => {
        let index = Math.floor(Math.random() * cursor.length);
        //console.log(cursor);
        //console.log(cursor[index]);
        return cursor[index];
      });
  };

  //creates a Person and adds it to the collection
  const createPerson = (name, amount) => {
    let person;
    for(let x=0; x < amount; x++) {
      person = Person(name, amount);
      collection.insertOne(person)
    }
    return person;
  };

  //deletes all the persons in the collection in order to restart the raffle
  const deletePersons = () => {
    return collection.deleteMany({});
  }

  return {
    createPerson,
    getAllPersons,
    deletePersons, 
    getRandomPerson,
    getTotal, 
    updateTotal,
    resetTotal
  };
};

module.exports = PersonsCollection;
