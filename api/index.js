const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const brandRoutes = require('./routes/brandRoutes');
const user = require("./routes/userRoutes");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

app.use('/api/v1/', brandRoutes);
app.use('/api/v1/', user);

module.exports = app