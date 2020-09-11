const express = require("express");
const app = express();
const port = 3001;
const people = require("./routes/people");

app.use((req, res, next) => {
  console.log(req.path, req.query);
  next();
});
app.use("/api/people", people);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
