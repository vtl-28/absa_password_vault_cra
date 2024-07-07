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

//app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
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

// if(process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));
// }

// app.use(
//   expressSession({
//     secret: process.env.SESSION_SECRET,
//     saveUninitialized: true,
//     resave: false,
//     store: MongoStore.create({
//       mongoUrl: process.env.DB_URI,
//     }),
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24,
//     },
//   })
// );

//middleware to print session details of authenticated user
// app.use((req, res, next) => {
//   console.log(req.session);
//   console.log(req.user);
//   next();
// });

app.use(morgan('tiny'));

app.use(userRoute);
app.use(passwordHintRoute);
app.use(applicationPasswordsRoute);

app.listen(app.get("port"), () => {
  console.log(
    `The server has started and is listening on port number: ${app.get("port")}`
  );
});
