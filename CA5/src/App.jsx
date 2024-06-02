import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookList from './components/BookList';
import RegisterForm from './components/RegisterForm';

function App() {
  return (
    <Router>
      <div className="content">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
