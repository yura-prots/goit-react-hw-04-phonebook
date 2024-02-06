import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import ContactsForm from 'components/ContactsForm';
import ContactsList from 'components/ContactsList';
import ContactsFilter from 'components/ContactsFilter';

import { Container, Wrapper, Title } from './App.styled';

const storageKey = 'local-contacts';
const localContacts = JSON.parse(localStorage.getItem(storageKey));

const App = () => {
  const [contacts, setContacts] = useState(localContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const isDuplicate = contacts.find(
      contact => contact.name === newContact.name
    );

    if (isDuplicate) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }

    setContacts(state => [...state, { ...newContact, id: nanoid() }]);
  };

  const findContact = searchQuery => {
    setFilter(searchQuery);
  };

  const deleteContact = id => {
    setContacts(state => state.filter(contact => contact.id !== id));
  };

  const visibleContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactsForm onAdd={addContact} />

      {contacts.length > 0 && (
        <Wrapper>
          <Title>Contacts</Title>
          <ContactsFilter filter={filter} toFind={findContact} />

          <ContactsList contacts={visibleContacts} toDelete={deleteContact} />
        </Wrapper>
      )}
    </Container>
  );
};

export default App;
