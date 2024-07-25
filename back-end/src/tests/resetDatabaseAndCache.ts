import { getCache } from "../cache";
import { getDataSource } from "../database";

export function resetDatabaseAndCache() {
  beforeEach(async () => {
    const database = await getDataSource();
    for (const entity of database.entityMetadatas) {
      const repository = database.getRepository(entity.name);
      await repository.query(
        `TRUNCATE "${entity.tableName}" RESTART IDENTITY CASCADE;`,
      );
    }
    const cache = await getCache();
    await cache.flushAll();
  });

  afterAll(async () => {
    const database = await getDataSource();
    await database.destroy();
    const cache = await getCache();
    await cache.quit();
  });
}
