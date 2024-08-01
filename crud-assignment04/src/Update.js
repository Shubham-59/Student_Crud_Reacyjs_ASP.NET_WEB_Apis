import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Update() {
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setFirstName(localStorage.getItem("firstName"));
    setLastName(localStorage.getItem("lastName"));
    setDateOfBirth(localStorage.getItem("dateOfBirth"));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`https://localhost:7166/api/StudentAPI/${id}`, {
      id: id,
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
    })
    .then(() => {
      navigate("/read"); // Redirect to /read after successful submission
    })
    .catch(error => {
      console.error("There was an error updating the data!", error);
    });
  }

  return (
    <>
      <form className="container" onSubmit={handleUpdate}>
        <h2 className='my-title'>Edit Student Information....!!!!</h2>
        <div className="mb-2">
          <div className="mb-1">
            <label htmlFor="firstNameInput" className="form-label">First Name</label>
            <input 
              type="text" 
              className="form-control" 
              id="firstNameInput"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
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
            />
          </div>
          <div className="mb-1">
            <label htmlFor="dateOfBirthInput" className="form-label">Date of Birth</label>
            <input 
              type="date" 
              className="form-control" 
              id="dateOfBirthInput" 
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-warning mx-2">Update</button>
        <Link to="/read">
          <button className='btn btn-danger mx-2'>Back</button>
        </Link>
      </form>
    </>
  );
}

export default Update;
