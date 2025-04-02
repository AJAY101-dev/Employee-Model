const express = require("express");

console.log(" coming to the routes folder ");
const empControllers = require("../controller/empController");

const router = express.Router();

//  Routes

router.post("/", empControllers.createEmployee);
router.post("/login", empControllers.validLogin);
router.get("/",empControllers.authenticateMiddleware, empControllers.getAllEmployees);
router.get("/search", empControllers.getAllEmployeesSearch);
router.get("/pagination", empControllers.getAllEmployeesPagination);
router.get("/:id", empControllers.getEmployeeById);
router.patch("/:id", empControllers.updateEmployee);
router.delete("/:id", empControllers.deleteEmployee);

module.exports = router;
