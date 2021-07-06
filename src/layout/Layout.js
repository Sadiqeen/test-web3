import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';

const Layout = (props) => {
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Test W3 js</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        { props.account
                            ? <Nav className="ml-auto">
                                <Nav.Link href="#" className="btn btn-light btn-sm mr-lg-2 mb-2 mb-lg-0 text-dark">{props.account.substr(0, 10)}...</Nav.Link>
                                <Nav.Link href="#" className="btn btn-danger btn-sm" onClick={props.ethDisabled}>Logout!</Nav.Link>
                            </Nav>
                            : <Nav className="ml-auto">
                                <Nav.Link href="#" className="btn btn-primary text-white btn-sm" onClick={props.ethEnabled} >Connect Wallet</Nav.Link>
                            </Nav>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="mt-5 text-center">
                {props.children}
            </Container>
        </>
    )
}

export default Layout;