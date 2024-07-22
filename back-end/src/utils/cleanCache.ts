import { getCache } from "../cache";

const cleanCache = async () => {
  console.log("Cleaning cache...");
  const cacheClient = await getCache();
  await cacheClient.flushAll();
  console.log("\x1b[32mCache cleaned.\x1b[0m");
  process.exit(0);
};

cleanCache().catch((error) => {
  console.error("\x1b[31Unexpected error:\x1b[0m", error);
  process.exit(1);
});
