import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form, InputGroup } from "react-bootstrap";

const Login = () => {
  const [username, setUsername] = useState("");

  const handleChange = (e) => {
    setUsername(e.target.value);
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
                <h3>Login</h3>
              </Card.Header>

              <Card.Body className="p-4 text-center">
                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
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
                  to="/menu"
                  variant="outline-dark"
                  className="rounded-pill px-4"
                >
                  Ir al Menú
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
