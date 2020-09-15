import React from "react";
import Button from "react-bootstrap/Button";
import { saveButtonVariant } from "../../styles/styleConfig";

const SaveButton = (props) => {
  return (
    <Button
      variant={saveButtonVariant}
      className="float-right"
      onClick={() => {
        props.onClick();
      }}
    >
      Save
    </Button>
  );
};

export default SaveButton;
