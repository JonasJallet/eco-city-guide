import Category from "../entities/category";
import { getDataSource } from "../database";
import { CategoryMockFactory} from "../factories/categoryMockFactory";

const categories: string[] = [
    "Eco-Friendly Goods",
    "Green Ventures",
    "Sustainable Solutions",
    "Earth's Emporium",
    "Nature's Nook",
    "Planet-Safe Products",
    "Bio-Friendly Bargains",
    "Organic Outlets",
    "Eco-Conscious Commerce",
    "Green Living Marketplace"
];

export async function createCategoryMock(numberOfCategories: number): Promise<Category[]> {
    const database = await getDataSource();
    const categoryRepository = database.getRepository(Category);
    const createdCategories: Category[] = [];

    for (const categoryName of categories.slice(0, numberOfCategories)) {
        const categoryData = await new CategoryMockFactory().create(categoryName);
        const savedCategory = await categoryRepository.save(categoryData);
        createdCategories.push(savedCategory);
    }

    return createdCategories;
}

createCategoryMock(10)
    .then(() => {
        process.stdout.write("Generated Categories Data saved to the database.");
    })
    .catch((error) => {
        process.stdout.write("Error creating categories:", error);
    });
