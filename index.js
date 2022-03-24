// require express and path modules
const express = require("express");
const path = require("path");

// require subreddit data
const allSubreddit = require("./resource/data.json");
// console.log(allSubreddit);

// execute express server app
const app = express();

// set app view engine
app.set("view engine", "ejs");
// set views directory
app.set("views", path.join(__dirname, "views"));
// set public assets directory
app.set(express.static(path.join(__dirname, "public")));

// handle get req on root route
app.get("/", (req, res) => {
    // render the home view
    res.send("home", { allSubreddit, title: home });
});

// handle subreddit routes
app.get("/r/:subredditName", (req, res) => {
    // destruct subreddit name from params obj
    const { subredditName } = req.params;
    // verify subreddit param is valid
    if (allSubreddit[subredditName]) {
        // true: destruct subreddit data
        const singleSubreddit = allSubreddit[subredditName];
        // render subreddit view
        res.render("subreddit", {
            title: subredditName,
            ...singleSubreddit,
        });
    } else {
        // false: render 404 page
        res.render("subreddit_404", { subredditName });
    }
});

// listen on port 8080
app.listen(8080, () => {
    // verify listening
    console.log("listening on port 8080");
});
