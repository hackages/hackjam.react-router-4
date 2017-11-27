import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export class BookSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
    }
  }

  search = (event) => {
    const searchTerm = event.target.value;
    if (!searchTerm) {
      return this.setState({
        books: [],
      });
    }
    axios.get(`http://localhost:5000/books?q=${searchTerm}`)
      .then(response => {
        this.setState({
          books: response.data,
        });
      });
  };

  render() {
    const books = this.state.books.map(book => {
      return (
          <a href={`/${book.id}`} key={book.id} className="collection-item">
            {book.title}
          </a>
      )
    });
    return (
      <div id="search-component">
        <input id="search-box" placeholder="Search your library" onKeyUp={this.search}/>
        <div className="collection">
          {books}
        </div>
      </div>
    );
  }
}
