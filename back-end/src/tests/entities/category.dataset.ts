export function createCategoryDataset(names: string[], icons: string[]) {
  const categories = names.map((name, index) => ({
    name,
    icon: icons[index],
  }));

  return categories;
}

export const sampleListOfCategories = ["Parc", "Clothing", "Food"];
export const sampleListOfIcons = ["park-icon", "clothing-icon", "food-icon"];
export const newCategoriesDataset = createCategoryDataset(
  sampleListOfCategories,
  sampleListOfIcons,
);
