import { ID, Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import Category from "../entities/category";
import { CreateCategory } from "../types/category.args";

@Resolver()
export class CategoryResolver {
  @Mutation(() => Category)
  createCategory(@Args() args: CreateCategory) {
    return Category.saveNewCategory(args);
  }

  @Query(() => [Category])
  categories() {
    return Category.getCategories();
  }

  @Mutation(() => Category)
  async deleteCategory(@Arg("id", () => ID) id: string) {
    return Category.deleteCategory(id);
  }
}
