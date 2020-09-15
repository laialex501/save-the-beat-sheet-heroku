// Essential imports for application
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
// Utilities
const debug = require("debug")("server");
const compression = require("compression");
const helmet = require("helmet");
const { expressCspHeader, INLINE, NONE, SELF } = require("express-csp-header");
const path = require("path");

// Run passport config (require syntax runs file)
require("./auth/passport-config");

// Allow use of environmental variables
require("dotenv").config();

// Initialize express app
const app = express();
debug("Initialized express app");

// Enable cross-origin resource sharing
const whitelist = process.env.CORS_WHITELIST.split(", ");
debug("CORS whitelist is: ", whitelist);
const corsOptions = {
  origin: "*",
  credentials: true,
  exposedHeaders: ["x-auth-token"],
};
app.use(cors(corsOptions));

// Middleware to set HTTP headers for protecting against common vulnerabilities
app.use(helmet());

// Set CSP headers
app.use(
  expressCspHeader({
    directives: {
      "default-src": [SELF],
      "script-src": [
        SELF,
        INLINE,
        "https://apis.google.com",
        "https://accounts.google.com",
      ],
      "style-src": [SELF, INLINE],
      "img-src": [SELF, "data:"],
      "frame-src": ["https://accounts.google.com"],
    },
  })
);

// Body parsing middleware for requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cookie parsing middleware for requests
app.use(cookieParser());

// Initialize passport
app.use(passport.initialize());

// DB Config
const uri = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((err) => console.log(err));
const connection = mongoose.connection;
connection.once("open", () => console.log("Successfully connected to MongoDB"));

// Compress HTTP response of all routes for performance
app.use(compression());

// Router config
//const indexRouter = require("./routes/index.route");
const beatSheetRouter = require("./routes/beat-sheet.route");
const authRouter = require("./routes/auth.route");

// Set routes
//app.use("/api/", indexRouter);
app.use("/api/beatsheets", beatSheetRouter);
app.use("/api/auth", authRouter);

// If no route is found, send the static React app
app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

// Port config
const port = process.env.PORT || process.env.SERVER_PORT;

// Run server
app.listen(port, () => console.log(`Server up and running on port ${port}`));
