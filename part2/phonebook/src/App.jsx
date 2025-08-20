import { useState, useEffect } from "react";
import axios from "axios";

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

const Numbers = ({ filter, filteredItems, persons }) => {
  return (
    <>
      {filter
        ? filteredItems.map((person) => (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          ))
        : persons.map((person) => (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          ))}
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
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

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} has already been added`);
      return;
    }

    const nameObject = {
      name: newName,
      phoneNumber: newPhoneNumber,
    };

    setPersons(persons.concat(nameObject));
    setNewName("");
    setNewPhoneNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
      />
    </div>
  );
};

export default App;
