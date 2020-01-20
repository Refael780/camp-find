// ========================================
// SETUP
// ========================================
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var campground = require("./models/campground");
var seedDB = require("./seeds");
var comment = require("./models/comment");
var passport = require("passport");
var localStrategy = require("passport-local");
var User = require("./models/user");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
})
seedDB();

mongoose.connect("mongodb+srv://admin-refael:1234@logintest-gmaih.mongodb.net/campgroundApp");


// =====passport Config====
app.use(require("express-session")({
    secret: "this is practic web camp",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ========================================
// ROUTES
// ========================================
app.get("/", function (req, res) {
    console.log("<=  GET / (landing page)");
    res.render("landing");
})

app.get("/campgrounds", function (req, res) {
    console.log("<=  GET /campgrounds ");
    campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log(err);
            res.redirect("/");
        }
        else {
            res.render("campground/campgrounds", { campgrounds: campgrounds, currentUser: req.user });

        }
    })
})

app.post("/campgrounds", function (req, res) {
    console.log("=>  POST /campgrounds ");
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;

    var data = { name: name, image: image, description: description }
    campground.create(data, function (err, newCampground) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(newCampground);
            res.redirect("/campgrounds");

        }
    })


});
app.get("/campgrounds/new", isLoggedIn, function (req, res) {
    console.log("<=  GET /campgrounds/new ");
    res.render("campground/new", { currentUser: req.user });
})
app.get("/campgrounds/:id", function (req, res) {
    console.log("<=  GET /campgrounds/show ");


    ///to pull id of comment from  the campground's database and make him an comment object 
    campground.findById(req.params.id).populate("comments").exec(function (err, campFound) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(campFound);
            res.render("campground/show", { campground: campFound }, { currentUser: req.user });
        }
    })

})
app.get("/campgrounds/:id/comment/new", isLoggedIn, function (req, res) {

    console.log("<=  GET /campgrounds/:id/comment/new ");
    campground.findById(req.params.id, function (err, foundCamp) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(foundCamp);
            res.render("comment/new", { campground: foundCamp });

        }
    })
})

app.post("/campgrounds/:id/comment", function (req, res) {
    campground.findById(req.params.id, function (err, foundCamp) {
        if (err) {
            console.log(err)
        }
        else {
            comment.create(req.body.comment, function (err, data) {
                if (err) {
                    console.log(err);
                }
                else {

                    foundCamp.comments.push(data);
                    foundCamp.save();
                    console.log("made here");
                    //"/campgrounds/:id
                    res.redirect("/campgrounds/" + foundCamp._id);
                }
            })
        }
    })
})
// ========================================
// AUTH ROUTE
// ========================================
app.get("/Register", (req, res) => {
    res.render("register");

})

app.post("/Register", (req, res) => {
    const newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, (err, user) => {
        err ? console.log(err) : res.redirect("/campgrounds");
    });
});

app.get("/login", (req, res) => {
    res.render("login");
});
app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/register"
}), (req, res) => {
});

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/campgrounds");
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next()
    else
        res.redirect("/login");
}
// ========================================
// PORT LISTENING
// ========================================
app.listen(3000, function () {
    console.log("Yelcamp server has started");
});