var createError = require("http-errors");
var express = require("express");
var path = require("path");
//var cookieParser = require('cookie-parser');
var logger = require("morgan");
const session = require("express-session");
const fileStore = require("session-file-store")(session);

var indexRouter = require("./routes/index");
var calendarRouter = require("./routes/calendar");
var accountNoteRouter = require("./routes/accountNote");
var monthlyCategoryRouter = require("./routes/monthlyCategory");
var passwordlookupRouter = require("./routes/passwordlookup");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      //secure: true,     //https일때 쿠키 저장
      maxAge: 24 * 6 * 600000, //밀리초
    },
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/calendar", calendarRouter);
app.use("/accountNote", accountNoteRouter);
app.use("/monthlycategory", monthlyCategoryRouter);
app.use("/passwordlookup", passwordlookupRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
