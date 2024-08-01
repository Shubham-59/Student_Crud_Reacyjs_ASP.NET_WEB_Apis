import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './Read.css'; 
import { Link } from 'react-router-dom';

const Read = () => {
  const [data, setData] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const getData = () => {
    axios.get('https://localhost:7166/api/StudentAPI')
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const setLocalStorage = (id, firstName, lastName, dateOfBirth) => {
    localStorage.setItem("id", id);
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("dateOfBirth", dateOfBirth);
  };

  const deleteData = (id) => {
    axios.delete(`https://localhost:7166/api/StudentAPI/${id}`)
      .then(() => {
        getData();
      })
      .catch((error) => {
        console.error("There was an error deleting the data!", error);
      });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <div className="table-container">
        <div className="form-check form-switch">
          <input 
            className="form-check-input" 
            type="checkbox" 
            role="switch" 
            id="flexSwitchCheckDefault"
            checked={isDarkMode}
            onChange={toggleDarkMode}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </label>
        </div>
        <div className='d-flex justify-content-between align-items-center my-container'>
          <h2 className='my-title'>Student Information....!!!!</h2>
          <Link to="/">
            <button className='btn btn-secondary my-button'>Add Info</button>
          </Link>
        </div>
        <table className={`table align-middle mb-0 ${isDarkMode ? 'table-dark' : 'bg-white'}`}>
          <thead className={`bg-light ${isDarkMode ? 'dark-mode-headers' : ''}`}>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Birth</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{new Date(item.dateOfBirth).toLocaleDateString()}</td>
                <td>
                  <Link to="/update">
                    <button 
                      type="button" 
                      className="btn btn-link btn-sm btn-rounded" 
                      aria-label="Edit"
                      onClick={() => setLocalStorage(item.id, item.firstName, item.lastName, item.dateOfBirth)}
                    >
                      ✏️ Edit
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-link btn-sm btn-rounded"
                    aria-label="Delete"
                    onClick={() => deleteData(item.id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Read;
