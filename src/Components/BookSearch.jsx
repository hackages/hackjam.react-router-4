import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';

class _BookSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  search = (event) => {
    const searchTerm = event.target.value;
    if (!searchTerm) {
      this.props.history.replace('/dashboard');
      return this.setState({
        books: [],
      });
    }
    this.props.history.replace(`/dashboard/${searchTerm}`);
    axios.get(`http://localhost:5000/books?q=${searchTerm}`)
    .then(response => {
      this.setState({
        books: response.data,
      });
    });
  };

  componentDidMount() {
    const {match: {params: {name}}} = this.props;
    name && axios.get(`http://localhost:5000/books?q=${name}`)
    .then(response => {
      this.setState({
        books: response.data,
      });
    });
  }

  render() {
    const books = this.state.books.map(book => {
      return (
        <Link key={book.id} to={`/${book.id}`} className="collection-item">
          {book.title}
        </Link>
      );
    });
    return (
      <div id="search-component">
        <input id="search-box" placeholder="Search your library" value={this.props.match.params.name || ''}
               onChange={this.search}/>
        <div className="collection">
          {books}
        </div>
      </div>
    );
  }
}

export const BookSearch = withRouter(_BookSearch);