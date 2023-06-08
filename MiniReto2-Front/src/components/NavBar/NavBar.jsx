import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';


function NavBar({setShowRankings}) {
    return (
        <Navbar bg="dark" variant="dark" fixed="top">
            <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link onClick={() => setShowRankings(false)}>Home</Nav.Link>
                <Nav.Link onClick={() => setShowRankings(true)}>Ranking</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar;