import { faker } from "@faker-js/faker";
import db from "#db/client";
import { createEmployee } from "../db/queries/employees.js";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  for (let i = 0; i < 10; i++) {
    const name = faker.person.fullName();
    const birthday = faker.date.birthdate();
    const salary = faker.finance.amount({ min: 50, max: 120, dec: 0 });
    const newEmployee = await createEmployee({ name, birthday, salary });
  }
}
