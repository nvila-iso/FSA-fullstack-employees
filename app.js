import express from "express";
const app = express();
export default app;
import employeeRoutes from "./api/employees.js";

// TODO: this file!
app.use(express.json());

app.route("/").get((req, res) => {
  res.send("Welcome to the FullStack Employee Squid Games!");
});

app.use(("/employees", employeeRoutes));

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Sorry! Did you make a wrong turn? t(-_-t)");
});
