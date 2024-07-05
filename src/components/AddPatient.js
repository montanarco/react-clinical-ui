import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddPatient.scss';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AddPatient = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/clinicalapi/patients/', {
        "firstName": firstName,
        "lastName": lastName,
        "age": age,
      });

      toast.success('Patient added successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='center'>
      <h2>Add Patient</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={handleLastNameChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={handleAgeChange}
            className="form-control"
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary">Add Patient</button>
      </form>
      <br />
      <Link to="/" className='center'> Home</Link>
    </div>
  );
};

export default AddPatient;