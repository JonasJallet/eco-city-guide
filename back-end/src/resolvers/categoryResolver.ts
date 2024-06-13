import {
  ID,
  Arg,
  Args,
  Mutation,
  Query,
  Resolver,
  Authorized,
} from "type-graphql";
import Category from "../entities/category";
import { CreateCategory, UpdateCategory } from "../types/category.args";

@Resolver()
export class CategoryResolver {
  @Query(() => [Category])
  categories() {
    return Category.getCategories();
  }

  @Authorized("webAdministrator", "cityAdministrator")
  @Mutation(() => Category)
  createCategory(@Args() args: CreateCategory) {
    return Category.saveNewCategory(args);
  }

  @Authorized("webAdministrator", "cityAdministrator")
  @Mutation(() => Category)
  async deleteCategory(@Arg("id", () => ID) id: string) {
    return Category.deleteCategory(id);
  }

  @Authorized("webAdministrator", "cityAdministrator")
  @Mutation(() => Category)
  async updateCategory(
    @Arg("id", () => ID) id: string,
    @Args() args: UpdateCategory,
  ) {
    return Category.updateCategory(id, args);
  }
}
