import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import DeleteEmployee from './DeleteEmployee';
const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        let token =localStorage.getItem('token');
        console.log(token)
        token =`Bearer ${token}`
        const response = await axios.get('http://localhost:3000/employeeslist', {
          headers: { 
            'Authorization': 'Bearer eyJhbGciOiJIUzM4NCJ9.eyJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwWkNJNklqWTJNR1V5WldVek9XTTNaamMyT0dGalpUVm1PRFUwTVNJc0ltbGhkQ0k2TVRjeE1qZ3dPVGsxTkN3aVpYaHdJam94TnpFMU5EQXhPVFUwZlEuM2RTUE1uMjZVTEpEZ1FDNFpNcVVxQkduMkRFbVBpYS1TWFBNdnRhYVVkSSJ9.eQfbT4izPVXQETwz_eW_tHXry7Qf2NHu3nI6xs3fz0519tl4DTJtBEAyTIU1p76i'
          }
        });
        setEmployees(response.data);
        console.log(response.data)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employees:', error);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

    const handleDeleteSuccess = (responseData) => {
      console.log('Employee deleted successfully:', responseData);
      // Perform any additional actions upon successful deletion
    };
  
    const handleDeleteError = (error) => {
      console.error('Error deleting employee:', error);
      // Handle error state or display error message to the user
    };
  return (
    <div className='container'>
      <div className='row mt-2 mb-1'>
      <h2 className='col-9 '>Employee List</h2><div className='col justify-content-end'></div> 
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.f_Name}</td>
                <td>{employee.f_Email}</td>
                <td>{employee.f_Designation}</td>
                <td>{employee.f_Mobile}</td>
                <td>{employee.f_Mobile}</td>
                <td> <DeleteEmployee
        id={employee._id}
        onDeleteSuccess={handleDeleteSuccess}
        onDeleteError={handleDeleteError}
      /></td>
              {/* <td>  <Button onClick={() => handleDelete(employee._id)} variant='outline-success'>Edit</Button></td> */}
                


              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default EmployeeList;
