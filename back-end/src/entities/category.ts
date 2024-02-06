import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { CreateCategory } from "../types/category.args";

@Entity()
@ObjectType()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string;

  @Column()
  @Field()
  name!: string;

  constructor(category?: CreateCategory) {
    super();
    if (category) {
      this.name = category.name;
    }
  }

  static async saveNewCategory(categoryData: CreateCategory) {
    const newCategory = new Category(categoryData);
    return await newCategory.save();
  }

  static async getCategories(): Promise<Category[]> {
    const categories = await Category.find();
    return categories;
  }

  static async getCategoryById(id: string): Promise<Category> {
    const category = await Category.findOneBy({ id });
    if (!category) {
      throw new Error(`Category with ID ${id} does not exist.`);
    }
    return category;
  }

  static async deleteCategory(id: string): Promise<Category> {
    const category = await Category.getCategoryById(id);
    await Category.delete(id);
    return category;
  }
}

export default Category;
