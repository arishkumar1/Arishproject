if (process.env.NODE_ENV !="production"){
 require('dotenv').config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/review.js");
const session =require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/User.js");

const listingsRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");



const dbUrl = process.env.ATLASDB_URL ;

if (!dbUrl) {
  console.error("ERROR: ATLASDB_URL environment variable is not set!");
  process.exit(1);
}

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate); // Use ejs-mate for layout support
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

const store = MongoStore.create({
  mongoUrl:dbUrl,
  crypto:{
    secret:process.env.SECRET,
  },
  touchAFTER:24*3600,
});

store.on("error",(err) =>{
  console.log("ERROR in MONGO SESSION STORR", err);
});


const sessionOption ={
  store:store,
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 day
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // 7 days
  },
};


// app.get("/", (req, res) => {
//   res.send("Hi, I am root");
// });



app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
   res.locals.currUser = req.user;
  next();
});


// app.get("/demouser",async(req, res) => {
//    let fakeUser = new User({
//        email:  "student@gmail.com",
//         username: "delta-student",
//    });
//   let registerUser  = await User.register(fakeUser,"helloworld");
//   res.send(registerUser);
// });


app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);


app.all(/.*/, (req, res, next) => {
           next(new ExpressError(404, "Page Not Found"));
      });

app.use((err, req, res, next) => {
   let {statusCode=500, message="Something went wrong"} = err;
   res.status(statusCode).render("error.ejs",{ message });
});
 
app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
 







 


