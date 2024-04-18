import { ID, Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import Category from "../entities/category";
import { CreateCategory, UpdateCategory } from "../types/category.args";

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

  @Mutation(() => Category)
  async updateCategory(
    @Arg("id", () => ID) id: string,
    @Args() args: UpdateCategory,
  ) {
    return Category.updateCategory(id, args);
  }
}
