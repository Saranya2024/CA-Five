import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './BookList.css';

function BookList() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://reactnd-books-api.udacity.com/books', {
      headers: { Authorization: 'whatever-you-want' }
    })
    .then(response => {
      setBooks(response.data.books);
    })
    .catch(error => {
      console.error("There was an error fetching the books!", error);
    });
  }, []);

  const handleSearch = (event) => setSearchTerm(event.target.value.toLowerCase());

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <h1>Kalvium Books</h1>
          <input type="text" placeholder="Search Books" value={searchTerm} onChange={handleSearch} />
          <Link to="/register">
            <button className="register-button">Register</button>
          </Link>
        </div>
      </header>
      <div className="book-grid">
        {filteredBooks.map(book => (
          <div key={book.id} className="book">
            <img src={book.imageLinks ? book.imageLinks.thumbnail : ''} alt={book.title} />
            <div className="book-info">
              <h3>{book.title}</h3>
              <p>**Free**</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;
