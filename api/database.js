const app = require("./index");
const mongoose = require("mongoose");
const ip = require('./utils/ipAddress')
const port = 8000;

mongoose
  .connect(
    "mongodb+srv://kickz:kickz@tupt.cgbhu8l.mongodb.net/Kickz?retryWrites=true&w=majority&appName=TUPT",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    console.log(ip)
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.listen(port, () => {
  console.log("Server is running on port 8000");
});
