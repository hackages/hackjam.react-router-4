import React from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';
import {FavoriteBook} from "./FavoriteBook";
import {BookLine} from "./BookLine";

export class Books extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      books: [],
      inputContent: "",
      selectedBook: null
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios.get('http://localhost:5000/books').then((response) => {
      this.setState({books: response.data});
    });
  };

  add = () => {
    axios.post('http://localhost:5000/books', {title: this.state.inputContent}).then(this.refreshList);
  };

  remove = (bookId) => {
    axios.delete(`http://localhost:5000/books/${bookId}`).then(() => {
      this.refreshList();
      if (this.state.selectedBook && this.state.selectedBook.id === bookId) {
        this.setState({
          selectedBook: null,
        });
      }
    });
  };

  render() {
    return (
      <div>
        <h2>My Library</h2>
        <div>
          <input
            type="text"
            placeholder="Book's title"
            value={this.state.inputContent}
            onChange={(e) => this.setState({inputContent: e.target.value})}
          />
          <a
            className="btn-floating btn-large waves-effect waves-light red"
            style={{fontSize: 24}}
            onClick={this.add}>
            <span>+</span>
          </a>
        </div>
        <br />
        <hr />
        <table>
          <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Delete</th>
          </tr>
          </thead>
          <tbody>
          {this.state.books.map(book => (
            <BookLine
              key={book.id}
              book={book}
              selectBook={() => this.setState({selectedBook: book})}
              deleteBook={() => this.remove(book.id)}/>
          ))}
          </tbody>
        </table>
        <Route path='/books/:name' children={({match}) => {
          return match && <FavoriteBook title={match.params.name}/>
        }}/>
      </div>
    );
  }
}
