import React from 'react';
import { Link } from 'react-router-dom';

export const BookCard = ({book}) =>
  <div className="col s12 m4">
    <div className="card blue-grey darken-1">
      <div className="card-content white-text">
        <span className="card-title">{book.title}</span>
      </div>
      <div className="card-action">
        <Link to={`/${book.id}`}>Details</Link>
      </div>
    </div>
  </div>;
