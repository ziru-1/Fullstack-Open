import { useState } from "react";

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
              {person.name} {person.phoneNumber}
            </p>
          ))
        : persons.map((person) => (
            <p key={person.name}>
              {person.name} {person.phoneNumber}
            </p>
          ))}
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phoneNumber: "040-123456", id: 1 },
    { name: "Ada Lovelace", phoneNumber: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phoneNumber: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phoneNumber: "39-23-6423122", id: 4 },
  ]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");

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
