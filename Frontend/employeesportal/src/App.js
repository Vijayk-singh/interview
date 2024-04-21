
import './App.css';
import Auth from './Componenets/Auth';
import { AuthContext } from './AuthContext';
import React, { useContext} from 'react';
import EmployeeList from './Componenets/EmployeesList';
import Dashboard from './Componenets/Dashboard'
import { MainNav } from './Componenets/MainNav';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Componenets/Layout';
import AddEmployee from './Componenets/AddEmployee';



function App() {
  const { isLoggedIn } = useContext(AuthContext);
 
  return (
    <div className="pp">
      <BrowserRouter>
      <Routes>
  {/* <MainNav/> */}
  <Route path="/" element={isLoggedIn?<Layout/>:""}>
  <Route path="/Employees" element= {isLoggedIn?<EmployeeList/>:<Auth/>} />
  <Route path="/AddEmployee" element= {isLoggedIn?<AddEmployee/>:<Auth/>} />
  <Route index element= {isLoggedIn?<Dashboard/>:<Auth/>} />
  </Route>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;


  