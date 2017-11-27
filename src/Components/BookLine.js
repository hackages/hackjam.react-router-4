import React from 'react';
import {Link} from "react-router-dom";

export const BookLine = ({book, deleteBook, selectBook}) =>
  <tr>
    <td>{book.id}</td>
    <td onClick={selectBook}><Link to={`/books/${book.title}`}>{book.title}</Link></td>
    <td onClick={deleteBook}><i className="material-icons">delete</i></td>
  </tr>;
