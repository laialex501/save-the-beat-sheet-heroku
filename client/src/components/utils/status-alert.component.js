import React from "react";
import { Alert } from "react-bootstrap";

const StatusAlert = (props) => {
  // If props.success does not exist then do not show
  const show = props.success === null ? false : true;

  // If status is success, return success alert, otherwise return failure alert
  return (
    <Alert
      show={show}
      onClose={() => props.onClose()}
      variant={props.success ? "success" : "danger"}
      dismissible
      transition
    >
      <Alert.Heading>{props.success ? "Success" : "Failure"}</Alert.Heading>
      <p>{props.success ? props.successMessage : props.failureMessage}</p>
      <hr />
    </Alert>
  );
};

export default StatusAlert;
