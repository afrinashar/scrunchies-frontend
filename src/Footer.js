import { Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Footer() {
  return (
    <>
      <Navbar bg="danger" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <p>Instagram</p>
            <button type="button" class="btn btn-light">ADMIN</button>
            <Form
            ></Form>
          </Nav>
        </Container>
      </Navbar>
    
    </>
  );
}

export default Footer;