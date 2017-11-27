import React from 'react';
import axios from 'axios';

import {BookSearch} from './BookSearch';
import {BookCard} from "./BookCard";

export class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      books: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/books').then((response) => {
      this.setState({books: response.data});
    });
  }

  render() {
    return (
      <div>
        <h3>All Books</h3>
        <BookSearch />
        <div className="row">

          {this.state.books.map(book => (
            <BookCard key={book.id} book={book}/>
          ))}

        </div>
      </div>
    );
  }
}
