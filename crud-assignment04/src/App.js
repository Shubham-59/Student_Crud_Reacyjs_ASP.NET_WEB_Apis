import React from 'react';
import './App.css';
import Create from './Create';
import Header from './Header';
import Read from './Read';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Update from './Update';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<Create />} />
          <Route exact path="/read" element={<Read />} />
          <Route exact path="/update" element={<Update />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
