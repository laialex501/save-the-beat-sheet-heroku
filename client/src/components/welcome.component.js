import React from "react";

const debug = require("debug")("welcome.component");

class Welcome extends React.Component {
  render() {
    debug("Entering Welcome Component");
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
