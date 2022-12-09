const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getEmployeeLoanApplicants);
router.get("/:id", controller.getEmployeeLoanApplicantById);
router.post("/", controller.createEmployeeLoanApplicant);
router.put("/:id", controller.updateEmployeeLoanApplicant);
router.delete("/:id", controller.deleteEmployeeLoanApplicant);

module.exports = router;
