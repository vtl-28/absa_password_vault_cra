require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require('morgan'); // import morgan

const connectDB = require("./config/db_conn");
const userRoute = require("./routes/user");
const passwordHintRoute = require("./routes/password_hint");
const applicationPasswordsRoute = require("./routes/application_passwords");
connectDB();

app.use(express.static("public"));
app.use(express.static("assets"));
app.use(express.static("node_modules"));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.set("port", process.env.PORT || 3001);

app.use(morgan('tiny'));

app.use(userRoute);
app.use(passwordHintRoute);
app.use(applicationPasswordsRoute);

app.listen(app.get("port"), () => {
  console.log(
    `The server has started and is listening on port number: ${app.get("port")}`
  );
});
