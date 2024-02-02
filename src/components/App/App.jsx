import { useState } from 'react';
import { nanoid } from 'nanoid';

import ContactsForm from 'components/ContactsForm';
import ContactsList from 'components/ContactsList';
import ContactsFilter from 'components/ContactsFilter';

import { Container, Wrapper, Title } from './App.styled';

const storageKey = 'contacts';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const componentDidMount = () => {
    const localContacts = localStorage.getItem(storageKey);
    const parsedContacts = JSON.parse(localContacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  };

  const componentDidUpdate = (prevProps, prevState) => {
    const { contacts } = this.state;

    if (contacts !== prevState.contacts) {
      localStorage.setItem(storageKey, JSON.stringify(contacts));
    }
  };

  const addContact = newContact => {
    const isDuplicate = this.state.contacts.find(
      contact => contact.name === newContact.name
    );

    if (isDuplicate) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }

    this.setState(prevState => {
      return {
        contacts: [
          ...prevState.contacts,
          {
            ...newContact,
            id: nanoid(),
          },
        ],
      };
    });
  };

  const findContact = searchQuery => {
    this.setState({ filter: searchQuery });
  };

  const deleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
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
