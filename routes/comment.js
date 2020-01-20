
const express = require("express");
const router = express.Router();
router.get("/campgrounds/:id/comment/new", isLoggedIn, function (req, res) {

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

router.post("/campgrounds/:id/comment", function (req, res) {
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