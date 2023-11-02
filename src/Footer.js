import Form from './Form'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Footer() {
  return (
    <>
      <Navbar className="sticky-bottom" bg="primary" data-bs-theme="light">
        <Container>
          <Navbar.Brand className='d-flex flex-row'  href="https://instagram.com/scrunchies_jebasheeba8?igshid=MzMyNGUyNmU2YQ==">  <img  style={{height:20, width:20}} class=" h-5px w-2px" src="https://pngimg.com/uploads/instagram/instagram_PNG10.png" alt="Card image cap"></img>   <h3 className='text-center text-light fst-italic'>Scrunchies</h3></Navbar.Brand>
          <Nav className="me-auto">
             
             
            <Form class="float-end" ></Form>
          </Nav>
        </Container>
      </Navbar>
    
    </>
  );
}

export default Footer;