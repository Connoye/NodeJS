const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/StudentDB",
    {
        useNewUrlParser: true,
    },
    (err) => {
        if (!err) {
            console.log("Connection successful");
        } else {
            console.log("Connection error: " + err);
        }
    }
);

require("./student.model");