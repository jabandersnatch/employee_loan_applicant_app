const getEmployeeLoanApplicants = "SELECT * FROM employee_loan_applicant";
const getEmployeeLoanApplicantById =
  "SELECT * FROM employee_loan_applicant WHERE id = $1";
const checkEmployeeLoanApplicantByDocumentNumber =
  "SELECT * FROM employee_loan_applicant WHERE document_number = $1";
const createEmployeeLoanApplicant =
  "INSERT INTO employee_loan_applicant (first_name, last_name, document_type, document_number, email, phone, enterprise_id) VALUES ($1, $2, $3, $4, $5, $6, $7)";
const updateEmployeeLoanApplicant =
  "UPDATE employee_loan_applicant SET first_name = $1, last_name = $2, document_type = $3, document_number = $4, email = $5, phone = $6, enterprise_id = $7 WHERE id = $8";
const deleteEmployeeLoanApplicant =
  "DELETE FROM employee_loan_applicant WHERE id = $1";

module.exports = {
  getEmployeeLoanApplicants,
  getEmployeeLoanApplicantById,
  checkEmployeeLoanApplicantByDocumentNumber,
  createEmployeeLoanApplicant,
  updateEmployeeLoanApplicant,
  deleteEmployeeLoanApplicant,
};
