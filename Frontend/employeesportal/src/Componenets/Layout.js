import { Button, Container, Navbar } from "react-bootstrap";
import { Outlet ,Link} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import LogoutButton from "./LogoutButton";

const Layout = () => {
  
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
        <Navbar.Brand href="/" className="">EmployeesPortal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
        <Nav className="me-auto ">
           
       
            <Link to="/Employees" className="nav col-9">EmployeeList</Link>
          
            <Link to="/AddEmployee" className="col">AddEmployee</Link>
            </Nav>
            <LogoutButton/>
        </Navbar.Collapse>
        </Container>
        </Navbar>

      <Outlet />
    </>
  )
};

export default Layout;