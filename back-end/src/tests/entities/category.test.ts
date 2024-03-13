import Category from "../../entities/category";
import { categories } from "./category.dataset";
import { resetDatabase } from "../resetDatabase";

describe("Category", () => {
    resetDatabase();
    const createNewCategory = async (categoryData: {
        name: string;
    }) => {
        return await Category.saveNewCategory({
            ...categoryData,
        });
    };

    describe("getCategories", () => {
        it("should return all categories", async () => {
            const createdCategories = await Promise.all(categories.map(createNewCategory));
            const getCategories = await Category.getCategories();
            expect(getCategories.length).toEqual(createdCategories.length);
        });
    });

    describe("getCategoryById", () => {
        it("should return one category by id", async () => {
            const createdCategory = await createNewCategory(categories[0]);
            const categoryId = createdCategory.id;
            const category = await Category.getCategoryById(categoryId);
            expect(category).toBeDefined();
            expect(category.id).toEqual(createdCategory.id);
        });
    });

    describe("saveNewCategory", () => {
        it("should create category and returns it", async () => {
            const createdCategory = await createNewCategory(categories[0]);
            expect(createdCategory).toMatchObject(categories[0]);
            const category = await Category.getCategoryById(createdCategory.id);
            expect(category.id).toEqual(createdCategory.id);
        });

        it("should throw error if trying to create category with same name", async () => {
            await createNewCategory(categories[1]);
            const duplicateCategoryName = createNewCategory(categories[1]);
            await expect(duplicateCategoryName).rejects.toThrow();
        });
    });

    describe("deleteCategory", () => {
        it("should delete category by id", async () => {
            const createdCategory = await createNewCategory(categories[1]);
            const categoryId = createdCategory.id;
            const deletedCategory = await Category.deleteCategory(categoryId);
            expect(deletedCategory).toBeDefined();
            await expect(Category.getCategoryById(categoryId)).rejects.toThrow();
        });
    });

    describe("updateCategory", () => {
        it("should return updated place", async () => {
            const createdCategory = await createNewCategory(categories[2]);
            const categoryId = createdCategory.id;
            const partialCategory = { name: "updated-name" };
            const updatedCategory = await Category.updateCategory(categoryId, partialCategory);
            expect(updatedCategory).toBeDefined();
            expect(updatedCategory.name).toEqual(partialCategory.name);
        });

        it("should throw error if category does not exist", async () => {
            const categoryId = "e34e6099-5c31-4e32-b5ec-fd0743730f18";
            const partialCategory = { name: "updated-name" };
            await expect(Category.updateCategory(categoryId, partialCategory)).rejects.toThrow(
                "Category with ID e34e6099-5c31-4e32-b5ec-fd0743730f18 does not exist."
            );
        });
    });
});
