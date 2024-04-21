import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { Button } from 'react-bootstrap';

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
  };

  return (
    <Button onClick={handleLogout} variant='outline-danger'>
      Logout
     
    </Button>
  );
};

export default LogoutButton;
