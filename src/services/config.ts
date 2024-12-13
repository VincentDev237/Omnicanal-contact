import axios from "axios";

const API_URL = 'http://localhost:5000/api';


// ==================================================> GET
export const getAllContacts = () => {
  const url = `${API_URL}/contacts`;
  return axios.get(url);
};

// export const getContact = (contactID) => {
//   const url = `${SERVER_URL}/contacts/${contactID}`;
//   return axios.get(url);
// };

// export const getAllGroups = () => {
//   const url = `${SERVER_URL}/groups/`;
//   return axios.get(url);
// };

// export const getGroup = (groupID) => {
//   const url = `${SERVER_URL}/groups/${groupID}`;
//   return axios.get(url);
// };

// // ==================================================> POST
// export const createContact = (contact) => {
//   const url = `${SERVER_URL}/contacts/`;
//   return axios.post(url, contact);
// };

// // ==================================================> UPDATE(PUT)
// export const updateContact = (contact, contactID) => {
//   const url = `${SERVER_URL}/contacts/${contactID}`;
//   return axios.put(url, contact);
// };

// // ==================================================> DELETE
// export const deleteContact = (contactID) => {
//   const url = `${SERVER_URL}/contacts/${contactID}`;
//   return axios.delete(url);
// };


export default API_URL;
