import { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/persons";

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter shown with a <input value={filter} onChange={handleFilterChange} />
    </div>
  );
};

const PersonForm = ({
  newName,
  newPhoneNumber,
  handleNameChange,
  handlePhoneNumberChange,
  handleNameSubmit,
}) => {
  return (
    <form onSubmit={handleNameSubmit}>
      <div>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number:{" "}
          <input value={newPhoneNumber} onChange={handlePhoneNumberChange} />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Numbers = ({ filter, filteredItems, persons, handlePersonDelete }) => {
  return (
    <>
      {filter
        ? filteredItems.map((person) => (
            <Number
              key={person.id}
              person={person}
              handlePersonDelete={handlePersonDelete}
            />
          ))
        : persons.map((person) => (
            <Number
              key={person.id}
              person={person}
              handlePersonDelete={handlePersonDelete}
            />
          ))}
    </>
  );
};

const Number = ({ person, handlePersonDelete }) => {
  return (
    <p>
      {person.name} {person.number}{" "}
      <button onClick={() => handlePersonDelete(person)}>Delete</button>
    </p>
  );
};

const Notification = ({ message }) => {
  const success = {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  const error = {
    color: "red",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  if (message.message === null) {
    return null;
  }

  return (
    <div style={message.type === "success" ? success : error}>
      {message.message}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState({
    message: null,
    type: null,
  });

  useEffect(() => {
    personService
      .getPersons()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setNewPhoneNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    setFilteredItems(
      persons.filter((person) =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
      )
    );
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();

    const matchedPerson = persons.find((person) => person.name === newName);

    if (
      matchedPerson &&
      confirm(
        `${newName} has already been added, replace the old number with a new one?`
      )
    ) {
      const personObject = { ...matchedPerson, number: newPhoneNumber };
      personService
        .updatePerson(matchedPerson.id, personObject)
        .then((updatedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id === updatedPerson.id ? updatedPerson : person
            )
          );
          setMessage({
            message: `Updated ${updatedPerson.name}'s number to ${updatedPerson.number}`,
            type: "success",
          });
          setTimeout(() => {
            setMessage({
              message: null,
              type: null,
            });
          }, 5000);
        })
        .catch((error) => {
          setMessage({
            message: `Information of ${personObject.name} has already been remove from the server`,
            type: "error",
          });
          setPersons(persons.filter((person) => person.id !== personObject.id));
        });

      return;
    }

    const nameObject = {
      name: newName,
      number: newPhoneNumber,
    };

    personService.addPerson(nameObject).then((newPerson) => {
      setPersons(persons.concat(newPerson));
      setMessage({ message: `Added ${newPerson.name}`, type: "success" });
      setTimeout(() => {
        setMessage({
          message: null,
          type: null,
        });
      }, 5000);
    });

    setNewName("");
    setNewPhoneNumber("");
  };

  const handlePersonDelete = (person) => {
    confirm(`Delete ${person.name}?`) &&
      personService.deletePerson(person.id).then((deletedPerson) => {
        console.log(persons.filter((person) => person.id !== deletedPerson.id));
        setPersons(persons.filter((person) => person.id !== deletedPerson.id));
        setMessage({ message: `Deleted ${deletedPerson.name}`, type: "success" });
        setTimeout(() => {
          setMessage({
            message: null,
            type: null,
          });
        }, 5000);
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newPhoneNumber={newPhoneNumber}
        handleNameChange={handleNameChange}
        handlePhoneNumberChange={handlePhoneNumberChange}
        handleNameSubmit={handleNameSubmit}
      />
      <h2>Numbers</h2>
      <Numbers
        filter={filter}
        filteredItems={filteredItems}
        persons={persons}
        handlePersonDelete={handlePersonDelete}
      />
    </div>
  );
};

export default App;
