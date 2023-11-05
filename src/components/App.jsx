import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts') || [])
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      return alert(`${newContact.name} is already in contacts!`);
    }

    setContacts(prevState => [...prevState, { ...newContact, id: nanoid() }]);
  };

  const onFilterChange = evt => {
    setFilter(evt.target.value);
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContacts = filterContacts();

  return (
    <div>
      <h2>Phonebook</h2>
      <ContactForm onAddContact={addContact} />
      <h2>Contacts</h2>
      <Filter items={contacts} onChange={onFilterChange} />
      <ContactList items={filteredContacts} onDelete={deleteContact} />
    </div>
  );
};
