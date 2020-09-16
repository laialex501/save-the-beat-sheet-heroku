import React from "react";
import { Alert } from "react-bootstrap";
import {
  saveSuccessAlertVariant,
  saveFailureAlertVariant,
} from "../../styles/styleConfig";

const StatusAlert = (props) => {
  // If props.success does not exist then do not show
  const show = props.success === null ? false : true;

  // Set alert variants only if props.success is exactly true or false, do nothing for null
  var alertVariant;
  if (props.success === true) {
    alertVariant = saveSuccessAlertVariant;
  } else if (props.success === false) {
    alertVariant = saveFailureAlertVariant;
  }

  // Set message only if props.success is exactly true or false, do nothing for null
  var message;
  if (props.success === true) {
    message = props.successMessage;
  } else if (props.success === false) {
    message = props.failureMessage;
  }

  // Set heading only if props.success is exactly true or false, do nothing for null
  var heading;
  if (props.success === true) {
    heading = "Success";
  } else if (props.success === false) {
    heading = "Failure";
  }

  // If status is success, return success alert, otherwise return failure alert
  return (
    <Alert
      show={show}
      onClose={() => props.onClose()}
      className="m-5"
      variant={alertVariant}
      dismissible
      transition
    >
      <Alert.Heading>{heading}</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
};

export default StatusAlert;
