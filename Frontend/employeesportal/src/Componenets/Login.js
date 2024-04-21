import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Prepare data object to send to the API
    const userData = {
      email,
      password
    };

    try {
      setIsLoading(true); // Set loading state to true

      // Send POST request to API endpoint for login
      const response = await axios.post('http://localhost:3000/login', userData);

      console.log('Login successful:', response.data);
     localStorage.setItem('token',response.data.token)
     alert('Login successful:')
    // Reload the current page
// Reload the current page
window.location.reload();


      // Reset form fields and loading state after successful login
      setEmail('');
      setPassword('');
      setIsLoading(false);
     

      // Handle further actions after successful login (e.g., redirect to dashboard)
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoading(false); // Reset loading state on error

      // Handle error (e.g., display error message to user)
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
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

      <Button variant="outline-primary" type="submit" className="m-2" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>

      <hr />

      <div className="text-warning mt-5 mb-4">New User? Please Register First</div>
    </Form>
  );
}

export default Login;
