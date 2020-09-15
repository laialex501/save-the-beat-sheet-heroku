import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/style.css";

class Welcome extends React.Component {
  render() {
    return (
      <Container fluid className="d-flex fullscreen">
        <Row className="align-self-center w-100">
          <Col className="mx-auto" xs={10} sm={9} md={8} lg={7} xl={6}>
            <div className="welcome-title text-info">
              Welcome to Save the Beat Sheet!
            </div>
            <div className="welcome-text">
              This is an application for creating beat sheets.
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Welcome;
