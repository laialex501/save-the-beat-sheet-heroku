import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Loading = (props) => {
  return (
    <Container fluid className="d-flex fullscreen">
      <Row className="align-self-center w-100">
        <Col className="mx-auto" xs={10} sm={9} md={8} lg={7} xl={6}>
          <div className="loading-text text-muted">Loading...</div>
        </Col>
      </Row>
    </Container>
  );
};

export default Loading;
