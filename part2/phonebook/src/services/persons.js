import axios from "axios";

const url = "http://localhost:3001/api/persons";

const getPersons = () => {
  return axios.get(url).then((res) => res.data);
};

const addPerson = (personObject) => {
  return axios.post(url, personObject).then((res) => res.data);
};

const updatePerson = (id, personObject) => {
  return axios.put(`${url}/${id}`, personObject).then((res) => res.data);
};

const deletePerson = (id) => {
  return axios.delete(`${url}/${id}`).then((res) => res.data);
};

export default { getPersons, addPerson, updatePerson, deletePerson };
