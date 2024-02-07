import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  host: "database",
  username: "root",
  password: "root",
  database: "ecocityguide",
  synchronize: true,
  logging: true,
  port: 5432,
  entities: [__dirname + `/entities/*.{js,ts}`],
});
