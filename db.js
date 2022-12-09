const Pool = require("pg").Pool;

const pool = new Pool({
  user: "express",
  host: "localhost",
  database: "employee_loan_applicant",
  password: "express",
  port: 5432,
});

module.exports = pool;
