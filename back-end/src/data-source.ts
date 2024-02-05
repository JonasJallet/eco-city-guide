import { DataSource } from "typeorm";
import Place from "./entities/place";

export default new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  host: "database",
  username: "root",
  password: "root",
  database: "ecocityguide",
  synchronize: true,
  logging: true,
  port: 5432,
  entities: [Place],
});