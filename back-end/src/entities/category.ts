import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { CreateCategory, UpdateCategory } from "../types/category.args";
import Place from "./place";

@Entity()
@ObjectType()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string;

  @Column({ unique: true })
  @Field()
  name!: string;

  @Column({ unique: true })
  @Field()
  icon!: string;

  @ManyToMany(() => Place, (place) => place.categories)
  places!: Place[];

  constructor(category?: CreateCategory) {
    super();
    if (category) {
      this.name = category.name;
      this.icon = category.icon;
    }
  }

  static async saveNewCategory(categoryData: CreateCategory) {
    const newCategory = new Category(categoryData);

    const existingName = await Category.findOneBy({ name: categoryData.name });
    if (existingName) {
      throw new Error("Une catégorie avec ce nom existe déjà.");
    }

    const existingIcon = await Category.findOneBy({ icon: categoryData.icon });
    if (existingIcon) {
      throw new Error("Une catégorie avec cet icône existe déjà.");
    }

    return await newCategory.save();
  }

  static async getCategories(): Promise<Category[]> {
    return await Category.find();
  }

  static async getCategoryById(id: string): Promise<Category> {
    const category = await Category.findOneBy({ id });
    if (!category) {
      throw new Error(`Category with ID ${id} does not exist.`);
    }
    return category;
  }

  static async updateCategory(
    id: string,
    categoryData: UpdateCategory,
  ): Promise<Category> {
    const category = await Category.getCategoryById(id);
    Object.assign(category, categoryData);

    await category.save();
    await category.reload();
    return category;
  }

  static async deleteCategory(id: string): Promise<Category> {
    const category = await Category.getCategoryById(id);
    await Category.delete(id);
    return category;
  }
}

export default Category;
