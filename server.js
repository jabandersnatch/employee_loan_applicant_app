// Import the express module
const express = require("express");
const employeeLoanApplicantRoutes = require("./src/employee_loan_applicant/routes");
const app = express();
const port = 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/employee_loan_applicant", employeeLoanApplicantRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
