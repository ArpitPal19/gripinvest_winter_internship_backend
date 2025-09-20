
import sequelize from "./src/config/db.js";
export default async function () {
  await sequelize.close();
}
