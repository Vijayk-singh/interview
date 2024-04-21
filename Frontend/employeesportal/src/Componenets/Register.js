// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import React, { useState } from 'react';
// import axios from 'axios';

// function Register() {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
  
//       // Prepare data object to send to the API
//       const userData = {
//         name,
//         email,
//         password
//       };
//   console.log(userData)
//       try {
//         setIsLoading(true); // Set loading state to true
  
//         // Send POST request to API endpoint
//         const response = await axios.post('http://localhost:3000/register', userData);
  
//         console.log('User registered successfully:', response.data);
  
//         // Reset form fields and loading state after successful registration
//         setName('');
//         setEmail('');
//         setPassword('');
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error registering user:', error);
//         setIsLoading(false); // Reset loading state on error
//       }}
//   return (
//     <Form>
//         <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>User Name</Form.Label>
//         <Form.Control type="text" placeholder="Enter Your Name" value={email}
//           onChange={(e) => setEmail(e.target.value)} />
//         <Form.Text className="text-muted">
//           We'll never share your email with anyone else.
//         </Form.Text>
//       </Form.Group>
//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Email address</Form.Label>
//         <Form.Control type="email" placeholder="Enter email" />
//         <Form.Text className="text-muted">
//           We'll never share your email with anyone else.
//         </Form.Text>
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="formBasicPassword">
//         <Form.Label>Password</Form.Label>
//         <Form.Control type="password" placeholder="Password"  value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required />
//       </Form.Group>
      
//       <Button variant="outline-success" type="submit"  className='m-2' onClick={handleSubmit}>
//       Register
//       </Button>
//     </Form>
//   );
// }

// export default Register;
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data object to send to the API
    const userData = {
      name,
      email,
      password
    };

    try {
      setIsLoading(true); // Set loading state to true

      // Send POST request to API endpoint
      const response = await axios.post('http://localhost:3000/register', userData);

      console.log('User registered successfully:', response.data);
      alert('User registered successfully:')

     localStorage.setItem('token', response.data.token)
     localStorage.setItem('user', response.data.name)
      // Reset form fields and loading state after successful registration
      setName('');
      setEmail('');
      setPassword('');
      setIsLoading(false);
    } catch (error) {
      console.error('Error registering user:', error);
      setIsLoading(false); // Reset loading state on error
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>User Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="outline-success" type="submit" className="m-2" disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </Button>
    </Form>
  );
}

export default Register;
