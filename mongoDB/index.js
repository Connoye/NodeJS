require("./models/db");
const express = require("express");
const path = require("path");
const handlebars = require("handlebars");
const expHandle = require("express-handlebars");
const { allowInsecurePrototypeAccess } = require("@handlebars/allow-prototype-access");
const bodyParser = require("body-parser");

const studentController = require("./controllers/studentController");
var app = express();



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send(`
        <h2>Welcome to Students Database!</h2>
        <h3>Click here to get access to the <b><a href="/student/list">Database</a></b></h3>
    `);
});

app.set("views", path.join(__dirname, "/views"));

app.engine("hbs", expHandle.engine({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "/views/layouts/",
}));

app.set("view engine", "hbs");

app.listen(3000, () => {
    console.log("Server is connected to port 3000!");
});

app.use("/student", studentController);