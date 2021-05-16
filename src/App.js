import React, { Component } from 'react';
import ListContacts from './ListContacts'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
  state = {
    contacts : [
     ]
  }

  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({
          contacts: contacts
        })
    })
  }

  removeContact(contact){
    this.setState((prev) => ({
      contacts: prev.contacts.filter((item) => (item.id !== contact.id))
    }
    ))
  }

  render() {
    return (
      <div>
        <ListContacts contacts={this.state.contacts} onDeleteContact={(contact) => this.removeContact(contact)}/>
      </div>
    );
  }
}

export default App;
