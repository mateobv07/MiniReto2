import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';


function NavBar({setShowRankings, getRankings}) {
    return (
        <Navbar bg="dark" variant="dark" fixed="top">
            <Container>
            <Navbar.Brand>SuperFutbol</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link onClick={() => (setShowRankings(false), getRankings())}>Home</Nav.Link>
                <Nav.Link onClick={() => (setShowRankings(true), getRankings())}>Ranking</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar;