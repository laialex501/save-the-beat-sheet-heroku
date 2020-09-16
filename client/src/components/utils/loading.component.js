import React from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import {
  loadingSpinnerAnimation,
  loadingSpinnerVariant,
} from "../../styles/styleConfig";

const Loading = (props) => {
  return (
    <Container fluid className="d-flex fullscreen">
      <Row className="align-self-center w-100">
        <Col className="mx-auto d-flex" xs={10} sm={9} md={8} lg={7} xl={6}>
          {/* Container for keeping spinner centered */}
          <div className="mx-auto">
            <Spinner
              animation={loadingSpinnerAnimation}
              variant={loadingSpinnerVariant}
              role="status"
            >
              <div className="loading-text text-muted sr-only">Loading...</div>
            </Spinner>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Loading;
