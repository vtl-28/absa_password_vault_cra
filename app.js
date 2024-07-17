require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require('morgan');

const connectDB = require("./config/db_conn");
const userRoute = require("./routes/user");
const passwordHintRoute = require("./routes/password_hint");
const applicationPasswordsRoute = require("./routes/application_passwords");
connectDB();

// app.use(express.static("public"));
// app.use(express.static("assets"));
// app.use(express.static("node_modules"));
app.use(cors({ 
  origin: ["https://absa-password-vault-client.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
 }));
 // Handle preflight requests
app.options('*', cors());
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://absa-password-vault-client.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
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
