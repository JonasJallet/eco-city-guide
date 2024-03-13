import { faker } from "@faker-js/faker";

export function createCategoryDataset(numberOfCategories: number) {
    const categories = [];
    for (let i = 0; i < numberOfCategories; i++) {
        categories.push({
            name: faker.commerce.department(),
        });
    }
    return categories;
}

export const categories = createCategoryDataset(3);
