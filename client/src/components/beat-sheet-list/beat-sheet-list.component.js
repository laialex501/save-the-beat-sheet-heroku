import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { v4 as uuidv4 } from "uuid";
import BeatSheetCard from "./beat-sheet-card.component";
import CreateBeatSheetDropdown from "./create-beat-sheet-dropdown.component";
import Unauthenticated from "../auth/unauthenticated.component";
import Error from "../utils/error.component";
import Loading from "../utils/loading.component";
const debug = require("debug")("beat-sheet-list.component");

class BeatSheetList extends React.Component {
  constructor(props) {
    super(props);

    if (!this.props.user) return;

    // Receive props
    const { author_username, author_id } = this.props.user;
    const isAuthenticated = this.props.isAuthenticated;

    // Set state
    this.state = {
      beat_sheets: [],
      author_username,
      author_id,
      isAuthenticated,
      isLoading: true,
      error: null,
    };

    this.handleDeleteBeatSheet = this.handleDeleteBeatSheet.bind(this);
    this.handleCreateBeatSheet = this.handleCreateBeatSheet.bind(this);
    this.handleGetBeatSheets = this.handleGetBeatSheets.bind(this);
  }

  componentDidMount() {
    this.handleGetBeatSheets();
  }

  // Retrieve beat sheets belonging the user identified by our jwt token in browser cookie
  handleGetBeatSheets() {
    debug("Getting beat sheets");
    // Set loading flag to true
    this.setState({ isLoading: true });
    const options = {
      method: "POST",
      mode: "cors",
      cache: "default",
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Retrieve beat sheets from server
    fetch("/api/beatsheets", options)
      .then((res) => {
        if (res.status === 200) {
          debug("Successfully retrieved beat sheets");
          this.setState({ error: false });
          return res.json();
        } else {
          debug("Failed to retrieve beat sheets");
          this.setState({ error: true });
          return;
        }
      })
      .then((result) => {
        if (!result) {
          return;
        }

        // Create new beat sheets
        const beatSheets = result.beatSheets;
        const new_beat_sheets = beatSheets.map((beat_sheet) => {
          // Clone only necessary parts of beat sheets
          const new_beat_sheet = Object.assign({}, beat_sheet, {
            acts: undefined,
          });
          delete new_beat_sheet["acts"];
          // Add uuidv4 to beat sheets
          new_beat_sheet.beat_sheet_uuid = uuidv4();
          return new_beat_sheet;
        });

        // Set beat sheets and loading flag to false once we have retrieved data
        this.setState({
          beat_sheets: new_beat_sheets,
          isLoading: false,
        });
      });
  }

  // Deleting a beat sheet
  handleDeleteBeatSheet(beat_sheet_uuid) {
    // Find the database ID of the beat sheet identified by the given beat_sheet_uuid
    var beatSheetID;
    this.state.beat_sheets.forEach((beat_sheet) => {
      if (beat_sheet.beat_sheet_uuid === beat_sheet_uuid) {
        beatSheetID = beat_sheet._id;
      }
    });

    // Delete beat sheet from server
    const body = JSON.stringify({ beatSheetID: beatSheetID });
    const options = {
      method: "POST",
      mode: "cors",
      body: body,
      cache: "default",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("/api/beatsheets/delete", options).then((res) => {
      if (res.status === 200) {
        debug("Successfully deleted beat sheet");
        // Retrieve new beat sheet list from server
        this.handleGetBeatSheets();
      } else {
        debug("Failed to delete beat sheet");
      }
    });
  }

  // Creating a beat sheet
  handleCreateBeatSheet(beat_sheet) {
    // Save beat_sheet to server
    const body = JSON.stringify({ beatSheet: beat_sheet });
    const options = {
      method: "POST",
      mode: "cors",
      body: body,
      cache: "default",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("/api/beatsheets/create", options).then((res) => {
      if (res.status === 200) {
        debug("Successfully created beat sheet");
        // Retrieve new beat sheet list from server
        this.handleGetBeatSheets();
      }
    });
  }

  render() {
    // User is not authenticated and not allowed to access this resource
    if (this.state.isAuthenticated === false) return <Unauthenticated />;

    // There was an error in retrieving this resource, assume isAuthenticated != false
    if (this.state.error === true) return <Error />;

    // Loading resource until we know that we are not authenticated, not authorized, or there was an error
    if (this.state.isLoading === true) return <Loading />;

    // User is authenticated and allowed to access this resource
    return (
      <Container fluid>
        <Row className="p-5 m-5 rounded-lg bg-dark">
          {/* Create Beat Sheets Dropdown */}
          <Col xl={12} className="mb-2">
            <CreateBeatSheetDropdown onClick={this.handleCreateBeatSheet} />
          </Col>
          {/* Render all beat sheets in array, set unique key to be uuid */}
          {this.state.beat_sheets.map((beat_sheet) => {
            return (
              <BeatSheetCard
                beat_sheet_props={beat_sheet}
                key={beat_sheet.beat_sheet_uuid}
                handleDeleteBeatSheet={this.handleDeleteBeatSheet}
              />
            );
          })}
        </Row>
      </Container>
    );
  }
}

export default BeatSheetList;
