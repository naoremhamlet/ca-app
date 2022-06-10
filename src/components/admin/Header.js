import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'

class Header extends Component {
    render() {
        return (
            <>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/admin">
                        Admin
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={()=>this.props.changeActive("users")} >Users</Nav.Link>
                        <Nav.Link onClick={()=>this.props.changeActive("docs")} >Upload-Docs</Nav.Link>
                        <Nav.Link onClick={()=>{
                            localStorage.removeItem('login-status');
                            window.location = "/login";
                        }} >Logout</Nav.Link>
                    </Nav>
                </Navbar>
            </>
        );
    }
}

export default Header;