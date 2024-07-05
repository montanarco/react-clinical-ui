import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
  const [patientDetails, setPatientDetails] = useState([]);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8000/clinicalapi/patients/');
        setPatientDetails(response.data);
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    fetchPatientDetails();
  }, []);

  const deletePatient = (patientId) => {
    // Delete the patient's clinical data
    axios.delete(`http://localhost:8000/clinicalapi/clinicals/${patientId}`)
      .then(() => {
        // After the clinical data is deleted, delete the patient
        return axios.delete(`http://localhost:8000/clinicalapi/patients/${patientId}`);
      })
      .then(() => {
        toast.success('Patient deleted successfully!');
        // Remove the deleted patient from the state
        setPatientDetails(prevState => prevState.filter(patient => patient._id !== patientId));
      })
      .catch(error => {
        console.log(error);
        toast.error('Error while deleting the patient!');
      });
  };

  return (
    <div className="container">
      <h1 className="my-3">Patient Details</h1>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Clinical Data</th>
            <th>Patient Removal</th>
            {/* Add more table headers for other patient details */}
          </tr>
        </thead>
        <tbody>
          {patientDetails.map((patient) => (
            <tr key={patient._id}>
              <td>{patient.firstName}</td>
              <td>{patient.lastName}</td>
              <td>{patient.age}</td>
              <td><Link to={`/addClinicals/${patient._id}`} className="btn btn-primary">Add Data</Link></td>
              <td><button className="btn btn-primary" onClick={() => deletePatient(patient._id)}>Delete Patient</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/addPatient" className="btn btn-primary">Add Patient</Link>
    </div>
  );
};

export default Home;