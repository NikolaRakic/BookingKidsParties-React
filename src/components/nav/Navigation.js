import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { AuthenticationService } from "../../services/AuthenticationService";

export default function Navigation() {
  let pathname = window.location.pathname;

  const logOut = () => {
    AuthenticationService.logout();
  };

  return (
    <Navbar bg="dark" variant={"dark"} expand="lg" className="nav">
      <Container>
        <Navbar.Brand href="/pocetna">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              href="/pocetna"
              className={`${pathname.match("/pocetna") ? "active" : ""}`}
            >
              Početna
            </Nav.Link>
            <Nav.Link
              href="/pruzaoci-usluga"
              className={`${
                pathname.match("/pruzaoci-usluga") ? "active" : ""
              }`}
            >
              Pružaoci usluga
            </Nav.Link>
            {AuthenticationService.getRole() === null ? (
              <>
                <Nav.Link
                  href="/prijava"
                  className={`${pathname.match("/prijava") ? "active" : ""}`}
                >
                  Prijava
                </Nav.Link>
                <Nav.Link
                  href="/registracija"
                  className={`${
                    pathname.match("/registracija") ? "active" : ""
                  }`}
                >
                  Registracija
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link>{AuthenticationService.getUsername()}</Nav.Link>
                <Nav.Link onClick={logOut}>Odjava</Nav.Link>
                {AuthenticationService.getRole() === "ROLE_ADMINISTRATOR" ? (
                  <>
                    <NavDropdown title="Admin" id="basic-nav-dropdown">
                      <NavDropdown.Item href="/pruzaoci-usluga/registracija">
                        Dodaj pružaoca usluga
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        Another action
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">
                        Something
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">
                        Separated link
                      </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/pruzaoci-usluga/registracija">
                      Dodaj pružaoca usluga
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link>Rezervacije</Nav.Link>
                    {AuthenticationService.getRole() ===
                    "ROLE_SERVICE_PROVIDER" ? (
                      <>
                      <Nav.Link href="/pruzaoci-usluga/dodaj-ponudu">Dodaj ponudu</Nav.Link>
                      <Nav.Link href={"/izmeni-profil/" + AuthenticationService.getUserId()}>Izmeni profil</Nav.Link>
                      </>
                      //logged user/parent
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
