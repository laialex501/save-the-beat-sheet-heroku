import React from "react";

const debug = require("debug")("welcome.component");

class Welcome extends React.Component {
  render() {
    debug("Entering Welcome Component");
    console.log("Node env: ", process.env.NODE_ENV);
    console.log("Port: ", process.env.PORT);
    return (
      <React.Fragment>
        <div>
          <p>Welcome to Save the Beat Sheet!</p>
        </div>
      </React.Fragment>
    );
  }
}

export default Welcome;
