import React, { useState, useEffect } from 'react';
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

export default function CustomNavbar(props) {
    const [user, setUser] = useState('');

    useEffect(() => {
        async function init() {
            const data = await sessionStorage.getItem('userDetails');
            setUser(JSON.parse(data));
        }
        init();
    }, []);

    const logout = () => {
		localStorage.removeItem('userDetails');
		props.history.push('/login');
	}

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Classroom App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {user.id &&
                        <NavDropdown title={user.name} id="basic-nav-dropdown">
                            <NavDropdown.Item href="/home">Home</NavDropdown.Item>
                            {user.role === 'Instructor' &&
                                <NavDropdown.Item href="/create-course">Create Course</NavDropdown.Item>
                            }
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/login" onClick={logout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
