const express = require("express")
const router = express.Router()
const User = require("../models/users");

router.get("/", (req, res) => {
    User.find()
        .then((doc) => {
            res.render("index", { users: doc });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error fetching users");
        });
});

module.exports = router;