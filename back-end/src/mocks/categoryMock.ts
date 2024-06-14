import Category from "../entities/category";
import { getDataSource } from "../database";
import { CategoryMockFactory } from "../factories/categoryMockFactory";

const categories = [
  { name: "Parc", icon: "fa-solid fa-tree" },
  { name: "Association", icon: "fa-solid fa-hand-holding-heart" },
  { name: "Vestimentaire", icon: "fa-solid fa-shirt" },
  { name: "Véhicule", icon: "fa-solid fa-car" },
  { name: "Végétalien", icon: "fa-solid fa-carrot" },
  { name: "Plantes", icon: "fa-solid fa-seedling" },
  { name: "Décharge", icon: "fa-solid fa-recycle" },
  { name: "Loisirs", icon: "fa-solid fa-dice" },
  { name: "Alimentation", icon: "fa-solid fa-utensils" },
  { name: "Technologie", icon: "fa-solid fa-network-wired" },
];

export async function createCategoryMock(): Promise<Category[]> {
  const database = await getDataSource();
  const categoryRepository = database.getRepository(Category);
  const createdCategories: Category[] = [];

  for (const { name, icon } of categories) {
    const categoryData = await new CategoryMockFactory().create(name, icon);
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
    process.stdout.write("Error creating categories: " + error);
  });
