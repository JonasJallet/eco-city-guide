export function createCategoryDataset(names: string[]) {
  const categories = names.map((name) => ({ name }));
  return categories;
}

export const sampleListOfCategories = ["Parc", "Clothing", "Food"];
export const newCategoriesDataset = createCategoryDataset(
  sampleListOfCategories
);
