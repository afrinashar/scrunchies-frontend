import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="light">
        <Container>
          <Navbar.Brand href=""><h1 className='text-center text-light fst-italic'>Scrunchies</h1></Navbar.Brand>
          <Nav className="me-auto">
            
          <Link to="./login"  >
      <button type="button" class="btn btn-light">ADMIN</button>
    </Link> 
          </Nav>
        </Container>
      </Navbar>
    
    </>
  );
}

export default NavBar;