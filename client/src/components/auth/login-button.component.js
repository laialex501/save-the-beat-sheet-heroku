import React from "react";
import { Button } from "react-bootstrap";
import { loginButtonVariant } from "../../styles/styleConfig";

const LoginButton = (props) => {
  return (
    <Button variant={loginButtonVariant} href="/login">
      Login
    </Button>
  );
};

export default LoginButton;
