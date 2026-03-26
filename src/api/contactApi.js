import axios from 'axios';

const API_URL = 'http://localhost:5000/api/contacts';

const getAuthToken = () => {
  return localStorage.getItem('token');
};

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getAuthToken()}`
  }
});

export const getContacts = async () => {
  const response = await axios.get(API_URL, getAuthHeaders());
  return response.data;
};

export const getContact = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};

export const createContact = async (contactData) => {
  const response = await axios.post(API_URL, contactData, getAuthHeaders());
  return response.data;
};

export const updateContact = async (id, contactData) => {
  const response = await axios.put(`${API_URL}/${id}`, contactData, getAuthHeaders());
  return response.data;
};

export const deleteContact = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};
