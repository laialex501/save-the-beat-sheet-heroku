import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../styles/style.css";

const Unauthenticated = (props) => {
  return (
    <Container fluid className="d-flex fullscreen">
      <Row className="align-self-center w-100">
        <Col className="mx-auto" xs={10} sm={9} md={8} lg={7} xl={6}>
          <div className="error-text text-danger">
            You must login to access this resource
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Unauthenticated;
