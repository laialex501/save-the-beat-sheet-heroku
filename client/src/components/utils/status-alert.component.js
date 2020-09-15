import React from "react";
import { Alert } from "react-bootstrap";
import {
  saveSuccessAlertVariant,
  saveFailureAlertVariant,
} from "../../styles/styleConfig";

const StatusAlert = (props) => {
  // If props.success does not exist then do not show
  const show = props.success === null ? false : true;

  // If status is success, return success alert, otherwise return failure alert
  return (
    <Alert
      show={show}
      onClose={() => props.onClose()}
      className="m-5"
      variant={
        props.success ? saveSuccessAlertVariant : saveFailureAlertVariant
      }
      dismissible
      transition
    >
      <Alert.Heading>{props.success ? "Success" : "Failure"}</Alert.Heading>
      <p>{props.success ? props.successMessage : props.failureMessage}</p>
    </Alert>
  );
};

export default StatusAlert;
