import React, { Component } from 'react';
import ListContacts from './ListContacts'
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact'

class App extends Component {
  state = {
    contacts: [],
    screen: "list"
  }

  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({
        contacts: contacts
      })
    })
  }

  removeContact(contact) {
    this.setState((prev) => ({
      contacts: prev.contacts.filter((item) => (item.id !== contact.id))
    }
    ))

    ContactsAPI.remove(contact)
  }

  render() {
    return (
      <div>
        {this.state.screen === 'list' && (
          <ListContacts
            contacts={this.state.contacts}
            onDeleteContact={this.removeContact}
            onNavigate={(screen) => {
              this.setState({screen: "create"})
            }}
          />
        )}
        {this.state.screen === 'create' && (
          <CreateContact />
        )}    </div>
    );
  }
}

export default App;
