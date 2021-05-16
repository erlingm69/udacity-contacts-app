import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: ""
  }

  updateQuery(query) {
    this.setState({
      query: query.trim()
    })
  }

  render() {
    const {query} = this.state;
    const { contacts, onDeleteContact } = this.props;
    const showingContacts = query === "" ? contacts :
    contacts.filter((c) => (c.name.toLowerCase().includes(query.toLowerCase())));

    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input className="search-contacts" type="text"
          value={query} onChange={(e) => this.updateQuery(e.target.value)} />
            <Link className="add-contact" to="/create" />
        </div>
        {
          showingContacts.length !== contacts.length && (
            <div className="showing-contacts">
              <span>Now showing {showingContacts.length} of {contacts.length} contacts</span>
              <button onClick={() => this.updateQuery("")}>Show All</button>
            </div>
          )
        }
        <ol className="contact-list">{
          showingContacts.map((contact) => (
            <li key={contact.id} className="contact-list-item">
              <div className="contact-avatar"
                style={{ backgroundImage: `url(${contact.avatarURL})` }}>
              </div>
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.handle}</p>
              </div>
              <button className="contact-remove" onClick={() => onDeleteContact(contact)}></button>
            </li>
          ))
        }
        </ol>
      </div>
    )
  }
}

export default ListContacts