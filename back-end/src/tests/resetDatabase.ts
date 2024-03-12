import { getDataSource } from "../database";

export function resetDatabase() {
    beforeEach(async () => {
        const database = await getDataSource();
        for (const entity of database.entityMetadatas) {
            const repository = database.getRepository(entity.name);
            await repository.query(
                `TRUNCATE "${entity.tableName}" RESTART IDENTITY CASCADE;`
            );
        }
    });

    afterAll(async () => {
        const database = await getDataSource();
        await database.destroy();
    });
}
