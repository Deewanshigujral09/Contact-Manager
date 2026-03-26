import { createContext, useState, useEffect, useContext } from 'react';
import * as contactApi from '../api/contactApi';
import { AuthContext } from './AuthContext';

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchContacts();
    } else {
      setContacts([]);
    }
  }, [user]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await contactApi.getContacts();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const addContact = async (contactData) => {
    try {
      const data = await contactApi.createContact(contactData);
      setContacts([data, ...contacts]);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create contact'
      };
    }
  };

  const editContact = async (id, contactData) => {
    try {
      const data = await contactApi.updateContact(id, contactData);
      setContacts(contacts.map(contact =>
        contact._id === id ? data : contact
      ));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update contact'
      };
    }
  };

  const removeContact = async (id) => {
    try {
      await contactApi.deleteContact(id);
      setContacts(contacts.filter(contact => contact._id !== id));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete contact'
      };
    }
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        loading,
        addContact,
        editContact,
        removeContact,
        fetchContacts
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
