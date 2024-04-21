import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Login from './Login';
import Register from './Register';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import React, { useEffect } from 'react';



function Auth() {
   
  return (
    // <Stack gap={2} className="col-md-5 mx-auto ">
    <Container>
       
    <Card style={{ width: '100%' }} className='mt-5 '>
    <div class="row g-0">
    <div class="col-md-6">
  <Card.Img src="https://knowledgemission.kerala.gov.in/img/official-login.jpg" className='img-fluid rounded-start'/>
  </div>
  <div className='col-md-6'>
    <Card.Body className='mt-4 border-start '>
   
    <Card.Title>Welocome to Employees Portal </Card.Title>
    <Badge bg="" className='m-2 h4 pb-2 mb-4 text-danger border-bottom border-danger'>.....Please Login to Continue.....</Badge>
    
    <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3 border-success"
    >
      <Tab eventKey="home" title="Login" className=''>
       <Login/>
      </Tab>
      <Tab eventKey="profile" title="Register" className=''>
        <Register/>
      </Tab>
      
    
      
    </Tabs>
    </Card.Body>
    </div>
    </div>
    </Card>
 
     {/* <Image  src="https://knowledgemission.kerala.gov.in/img/official-login.jpg" rounded maxWidth="50px"/> */}


    </Container>
    // </Stack>
  );
}

export default Auth;