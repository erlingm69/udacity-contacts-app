import React, { Component } from 'react';
import { Route } from 'react-router-dom'
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

  createContact(contact) {
    ContactsAPI.create(contact).then(() => {
      this.setState((prev) => ({contacts: prev.contacts.concat([ contact])}))
    })

  }

  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
          <ListContacts
            contacts={this.state.contacts}
            onDeleteContact={this.removeContact} />)}/>
        <Route exact path="/create" 
        render={({history}) => <CreateContact
        onCreateContact={(c) => {
            this.createContact(c)
            history.push("/")
          }}/>} />
      </div>
    );
  }
}

export default App;
