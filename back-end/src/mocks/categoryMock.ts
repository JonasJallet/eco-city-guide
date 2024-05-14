import Category from "../entities/category";
import { getDataSource } from "../database";
import { CategoryMockFactory } from "../factories/categoryMockFactory";

const categories: string[] = [
  "Parc",
  "Association",
  "Vestimentaire",
  "Véhicule", 
  "Végétalien", 
  "Plantes",
  "Décharge",
  "Points de vente bio",
  "Alimentation",
  "Technologie",
];

export async function createCategoryMock(): Promise<Category[]> {
  const database = await getDataSource();
  const categoryRepository = database.getRepository(Category);
  const createdCategories: Category[] = [];

  for (const categoryName of categories) {
    const categoryData = await new CategoryMockFactory().create(categoryName);
    const savedCategory = await categoryRepository.save(categoryData);
    createdCategories.push(savedCategory);
  }

  return createdCategories;
}

createCategoryMock()
  .then(() => {
    process.stdout.write("Generated Categories Data saved to the database.");
  })
  .catch((error) => {
    process.stdout.write("Error creating categories:", error);
  });
