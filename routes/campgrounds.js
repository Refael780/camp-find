///49-101
const express = require("express");
const router = express.Router();

router.get("/campgrounds", function (req, res) {
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

router.post("/campgrounds", function (req, res) {
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
router.get("/campgrounds/new", isLoggedIn, function (req, res) {
    console.log("<=  GET /campgrounds/new ");
    res.render("campground/new", { currentUser: req.user });
})
router.get("/campgrounds/:id", function (req, res) {
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