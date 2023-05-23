import React, { Component } from 'react';
import { ContactList } from './Contacts/contacts';
import { Filter } from './Filter/filter';
import Form from './ContactForm/contactForm';
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const contact = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contact);

    if (parseContacts) {
      this.setState({
        contacts: parseContacts,
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const addedContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (addedContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(addedContacts));
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  newContact = data => {
    const usedName = this.state.contacts.find(
      el => el.name.toLowerCase() === data.name.toLowerCase()
    );

    if (usedName) return alert(usedName.name + '  is already in contacts.');

    this.setState(({ contacts }) => ({
      contacts: [data, ...contacts],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contacts => contacts.id !== id),
    }));
  };

  getContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
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
        <Form newContact={this.newContact}></Form>
        <h2 style={{ fontSize: '50px', fontWeight: 'bold', marginTop: '20px' }}>
          Contacts
        </h2>
        {this.state.contacts.length > 0 ? (
          <>
            <Filter
              value={this.state.filter}
              onChange={this.handleChange}
            ></Filter>
            <ContactList
              deleteContact={this.deleteContact}
              contacts={this.getContacts()}
            ></ContactList>
          </>
        ) : (
          'You have no contacts'
        )}
      </div>
    );
  }
}
