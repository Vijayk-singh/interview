import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    f_Id: '',
    f_Image: null,
    f_Name: '',
    f_Email: '',
    f_Mobile: '',
    f_Designation: '',
    f_Gender: '', 
    f_Course: '',
    f_Createdate: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    console.log(formData); // Log form data on input change
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      f_Image: file
    });
    console.log(formData); // Log form data when file input changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('f_Id', formData.f_Id);
    formDataToSend.append('f_Name', formData.f_Name);
    formDataToSend.append('f_Email', formData.f_Email);
    formDataToSend.append('f_Mobile', formData.f_Mobile);
    formDataToSend.append('f_Designation', formData.f_Designation);
    formDataToSend.append('f_Gender', formData.f_Gender);
    formDataToSend.append('f_Course', formData.f_Course);
    formDataToSend.append('f_Createdate', formData.f_Createdate);
    formDataToSend.append('f_Image', formData.f_Image);

    try {
      const response = await axios.post('http://localhost:3000/api/registerEmployee', formData, {
        headers: {
          // 'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer eyJhbGciOiJIUzM4NCJ9.eyJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwWkNJNklqWTJNR1V5WldVek9XTTNaamMyT0dGalpUVm1PRFUwTVNJc0ltbGhkQ0k2TVRjeE1qZ3dPVGsxTkN3aVpYaHdJam94TnpFMU5EQXhPVFUwZlEuM2RTUE1uMjZVTEpEZ1FDNFpNcVVxQkduMkRFbVBpYS1TWFBNdnRhYVVkSSJ9.eQfbT4izPVXQETwz_eW_tHXry7Qf2NHu3nI6xs3fz0519tl4DTJtBEAyTIU1p76i'


        }
      });

      console.log('Employee added:', response.data);
       alert('Employee added:')
      // Reset form data after successful submission
      setFormData({
        f_Id: '',
        f_Image: null,
        f_Name: '',
        f_Email: '',
        f_Mobile: '',
        f_Designation: '',
        f_Gender: '',
        f_Course: '',
        f_Createdate: ''
      });
    } catch (error) {
      console.error('Error adding employee:', error);
      // Handle error state or show a notification to the user
    }
  };

  return (
    <Container>
      <h2>Add Employee</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Label>ID:</Form.Label>
            <Form.Control
              type="text"
              name="f_Id"
              value={formData.f_Id}
              onChange={handleInputChange}
              required
            />
          </Col>
          <Col>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              name="f_Name"
              value={formData.f_Name}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              name="f_Email"
              value={formData.f_Email}
              onChange={handleInputChange}
              required
            />
          </Col>
          <Col>
            <Form.Label>Mobile:</Form.Label>
            <Form.Control
              type="text"
              name="f_Mobile"
              value={formData.f_Mobile}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label>Designation:</Form.Label>
            <Form.Control
              type="text"
              name="f_Designation"
              value={formData.f_Designation}
              onChange={handleInputChange}
              required
            />
          </Col>
          <Col>
            <Form.Label>Gender:</Form.Label>
            <Form.Select
              name="f_Gender"
              value={formData.f_Gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Select>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label>Course:</Form.Label>
            <Form.Control
              type="text"
              name="f_Course"
              value={formData.f_Course}
              onChange={handleInputChange}
              required
            />
          </Col>
          <Col>
            <Form.Label>Joining Date:</Form.Label>
            <Form.Control
              type="date"
              name="f_Createdate"
              value={formData.f_Createdate}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label>Image:</Form.Label>
            <Form.Control
              type="file"
              name="f_Image"
              onChange={handleFileChange}
              
            />
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Add Employee
        </Button>
      </Form>
    </Container>
  );
};

export default AddEmployee;
