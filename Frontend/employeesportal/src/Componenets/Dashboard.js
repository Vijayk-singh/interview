import { AuthContext } from '../AuthContext';
import React, { useContext } from 'react';
function DashBoard() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>asdf{isLoggedIn}</>
  );
}

export default DashBoard;