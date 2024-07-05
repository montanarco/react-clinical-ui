import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/AddPatient.scss';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AddClinicals = () => {
  const [patient, setPatient] = useState(null);
  const { patientId } = useParams();
  const [componentName, setComponentName] = useState('');
  const [componentValue, setComponentValue] = useState('');
  const [clinicalData, setClinicalData] = useState([]);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8000/clinicalapi/patients/' + patientId); // Replace {patientId} with the actual patient ID
        setPatient(response.data);

        const clinicalData = await axios.get(`http://localhost:8000/clinicalapi/clinicals/patient/${patientId}`)
        setClinicalData(clinicalData.data);

      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    fetchPatientDetails();
  }, [patientId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      "patient": patientId,
      "componentName": componentName,
      "componentValue": componentValue
    };

    axios.post('http://localhost:8000/clinicalapi/clinicals/', data)
      .then(response => {
        toast.success('Clinical data added successfully!');
      })
      .catch(error => {
        console.log(error);
        toast.error('Error while storing the clinical Data!');
      });
  };



  return (
    <div>
      <div className='center'>
        <h2>Add Clinical Data</h2>
        {patient ? (
          <div>
            <h2>{patient.firstName} - {patient.lastName}</h2>
            <p>Age: {patient.age}</p>
          </div>
        ) : (
          <p>Loading patient details...</p>
        )}
      </div>

      <form className="form center">
        <div className="form-group">
          <label htmlFor="name">Component Name:</label>
          <input type="text" className="form-control" id="name" name="name" value={componentName} onChange={(e) => setComponentName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="value">Component Value:</label>
          <input type="text" className="form-control" id="value" name="value" value={componentValue} onChange={(e) => setComponentValue(e.target.value)} />
        </div>
        <br />
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Save</button>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {clinicalData && clinicalData.map((data, index) => (
            <tr key={index}>
              <td>{data.componentName}</td>
              <td>{data.componentValue}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <Link to="/" className="center"> Home</Link>
    </div>
  );
};

export default AddClinicals;