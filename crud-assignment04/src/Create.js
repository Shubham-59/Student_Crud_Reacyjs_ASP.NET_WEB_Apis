import React, { useState } from 'react';
import './Create.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Create = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    axios.post('https://localhost:7166/api/StudentAPI', {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
    })
    .then(() => {
      navigate("/read");
    })
    .catch((error) => {
      console.error("There was an error creating the student data!", error);
    });
  };

  return (
    <>
      <div className='d-flex justify-content-between align-items-center my-container'>
        <h2 className='my-title'>Student Information....!!!!</h2>
        <Link to="/read">
          <button className='btn btn-warning my-button'>Display Student Info</button>
        </Link>
      </div>
      <form className="container" onSubmit={handleSubmit}>
        <div className="mb-2">
          <div className="mb-1">
            <label htmlFor="firstNameInput" className="form-label">First Name</label>
            <input 
              type="text" 
              className="form-control" 
              id="firstNameInput"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-1">
            <label htmlFor="lastNameInput" className="form-label">Last Name</label>
            <input 
              type="text" 
              className="form-control" 
              id="lastNameInput"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="mb-1">
            <label htmlFor="dobInput" className="form-label">Date of Birth</label>
            <input 
              type="date" 
              className="form-control" 
              id="dobInput"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </>
  );
}

export default Create;
