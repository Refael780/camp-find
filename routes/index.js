const express = require("express");
const router = express.Router();


app.get("/", function (req, res) {
    console.log("<=  GET / (landing page)");
    res.render("landing");
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