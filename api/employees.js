import express from "express";
const router = express.Router();
export default router;
import {
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  createEmployee,
} from "#db/queries/employees";

// TODO: this file!

router
  .route("/employees")
  .get(async (req, res) => {
    const employees = await getEmployees();
    res.send(employees);
  })
  .post(async (req, res) => {
    if (!req.body) {
      return res.status(400).send("No req.body found");
    } else if (!req.body.name || !req.body.birthday || !req.body.salary) {
      return res.status(400).send("You're missing something!");
    } else {
      try {
        const { name, birthday, salary } = req.body;
        const response = await createEmployee(name, birthday, salary);
        return res.status(201).send(response);
      } catch (error) {
        return res.status(400).send(error.message);
      }
    }
  });

router
  .route("/employees/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    const response = await getEmployee(id);
    try {
      if (!/^\d+$/.test(id) || id < 0) {
        return res
          .status(400)
          .send(
            "Employee id is incorrect. Try starting with 1 if you're going to guess."
          );
      } else if (!response) {
        return res.status(404).send("Employee does not exist");
      } else {
        const response = await getEmployee(id);
        return res.status(200).send(response);
      }
    } catch (error) {
      return res.status(400).send(error.message);
    }
  })
  .put(async (req, res) => {
    const { id } = req.params;
    if (req.body === undefined) {
      return res.status(400).send("No body!");
    } else if (!req.body.name || !req.body.birthday || !req.body.salary) {
      return res
        .status(400)
        .send("Something is missing here. Try socializing.");
    } else if (!/^-?\d+(\.\d+)?$/.test(id) || id < 0) {
      return res
        .status(400)
        .send(
          "Employee id is incorrect. Try starting with 1 if you're going to guess."
        );
    } else {
      try {
        const { name, birthday, salary } = req.body;
        const response = await updateEmployee(id, name, birthday, salary);
        if (!response) {
          return res.status(404).send("Id does not exist");
        }
        return res.send(response);
      } catch (error) {
        return res.status(400).send(error.message);
      }
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    const response = await getEmployee(id);
    try {
      if (!/^\d+$/.test(id) || id < 0) {
        return res
          .status(400)
          .send(
            "Employee id is incorrect. Try starting with 1 if you're going to guess."
          );
      } else if (!response) {
        return res.status(404).send("Id does not exist");
      } else {
        const response = await deleteEmployee(id);
        return res.status(204).send(response);
      }
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });
