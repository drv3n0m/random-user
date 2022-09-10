const express = require("express");
const userRoutes = require("./routes/v1/users.route.js");
const app = express();
const PORT = 4000;

app.use(express.json());

app.use("/api/v1/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome To Random User Database");
});

app.all("*", (req, res) => {
  res.send("OOPS!!! Not Found..");
});

app.listen(PORT, () => {
  console.log(`server run at ${PORT}`);
});
