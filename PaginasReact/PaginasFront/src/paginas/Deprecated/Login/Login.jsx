import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form, InputGroup } from "react-bootstrap";

const Login = () => {
  const [username, setUsername] = useState("");

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleGoogleLogin = () => {
    // Redirigir al endpoint de Spring Security OAuth2
    window.location.href = "/oauth2/authorization/google";
  };

  return (
    <div className="bg-white text-dark py-5 min-vh-100">
      <Container>
        <Row className="justify-content-center">

          <Col md={4} className="mb-4 d-flex justify-content-center">
            <Card
              className="mb-3 border border-dark p-0 rounded-5"
              style={{ borderRadius: "5px", width: "400px" }}
            >
              <Card.Header className="bg-dark text-white fw-semibold px-4 py-3 border-0 text-center rounded-top-5">
                <h3>Iniciar Sesión</h3>
              </Card.Header>

              <Card.Body className="p-4 text-center">
                <div className="mb-4">
                  <h5 className="mb-3 text-muted">Inicia sesión con Google</h5>
                  <Button
                    onClick={handleGoogleLogin}
                    className="btn btn-light border border-dark w-100"
                    style={{ padding: "12px 24px" }}
                  >
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="Google"
                      style={{ height: "20px", marginRight: "10px" }}
                    />
                    Acceder con Google
                  </Button>
                </div>

                <div className="divider my-3">
                  <hr />
                  <span className="text-muted small">O</span>
                  <hr />
                </div>

                <Form.Group controlId="username">
                  <Form.Label>Usuario</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>@</InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Form.Group>
              </Card.Body>

              <Card.Footer className="d-flex justify-content-center border-0">
                <Button
                  as={Link}
                  to="/"
                  variant="outline-dark"
                  className="rounded-pill px-4"
                >
                  Volver al Inicio
                </Button>
              </Card.Footer>
            </Card>
          </Col>

        </Row>
      </Container>
    </div>
  );
};

export default Login;
