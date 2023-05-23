import React from 'react';
import { useState } from 'react';
import { ContactList } from './Contacts/contacts';
import { Filter } from './Filter/filter';
import { Form } from './ContactForm/contactForm';
import { useEffect } from 'react';
export const App = () => {
  const [contacts, setContacts] = useState(() =>
    JSON.parse(window.localStorage.getItem('contacts'))
  );
  const [filter, setFilter] = useState('');
  // state = {
  //   contacts: [],
  //   filter: '',
  // };
  // componentDidMount() {
  //   const contact = localStorage.getItem('contacts');
  //   const parseContacts = JSON.parse(contact);

  //   if (parseContacts) {
  //     this.setState({
  //       contacts: parseContacts,
  //     });
  //   }

  // }
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // componentDidUpdate(prevProps, prevState) {
  //   const addedContacts = this.state.contacts;
  //   const prevContacts = prevState.contacts;

  //   if (addedContacts !== prevContacts) {
  //     localStorage.setItem('contacts', JSON.stringify(addedContacts));
  //   }
  // }
  ////////////////////////////
  // const handleChange = e => {
  //   setFilter(e.target.value);
  // };

  const newContact = data => {
    const usedName = contacts.find(
      el => el.name.toLowerCase() === data.name.toLowerCase()
    );

    if (usedName) return alert(usedName.name + '  is already in contacts.');
    setContacts(contacts => [data, ...contacts]);
    // this.setState(({ contacts }) => ({
    //   contacts: ,
    // }));
  };

  const deleteContact = id => {
    setContacts(contacts => contacts.filter(contacts => contacts.id !== id));
    // this.setState(prevState => ({
    //   contacts: prevState.contacts.filter(contacts => contacts.id !== id),
    // }));
  };

  const getContacts = () => {
    // const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: '100px',

        fontSize: 40,
        color: '#010101',
      }}
    >
      <Form newContact={newContact}></Form>
      <h2 style={{ fontSize: '50px', fontWeight: 'bold', marginTop: '20px' }}>
        Contacts
      </h2>
      {contacts.length > 0 ? (
        <>
          <Filter
            value={filter}
            onChange={e => setFilter(e.target.value)}
          ></Filter>
          <ContactList
            deleteContact={deleteContact}
            contacts={getContacts()}
          ></ContactList>
        </>
      ) : (
        'You have no contacts'
      )}
    </div>
  );
};
