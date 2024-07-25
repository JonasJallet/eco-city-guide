import { getDataSource } from "../database";

const cleanDatabase = async () => {
  console.log("Cleaning database...");
  const dataSource = await getDataSource();
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.clearDatabase();
  await queryRunner.release();
  await dataSource.synchronize();
  console.log("\x1b[32mDatabase cleaned and synchronized.\x1b[0m");
  process.exit(0);
};

cleanDatabase().catch((error) => {
  console.error("\x1b[31Unexpected error:\x1b[0m", error);
  process.exit(1);
});
