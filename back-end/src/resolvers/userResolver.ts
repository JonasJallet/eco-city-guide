import {
  ID,
  Arg,
  Args,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import User from "../entities/user";
import { CreateUser, UpdateUser, SignInUser } from "../types/user.args";
import { Context } from "..";
import { setUserSessionIdInCookie } from "../utils/cookie";

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  signUp(@Args() args: CreateUser) {
    return User.saveNewUser(args);
  }

  @Query(() => [User])
  users() {
    return User.getUsers();
  }

  @Authorized("webAdministrator", "user")
  @Mutation(() => User)
  updateUser(@Arg("id", () => ID) id: string, @Args() args: UpdateUser) {
    return User.updateUser(id, args);
  }

  @Authorized("webAdministrator", "user")
  @Mutation(() => User)
  async deleteUser(@Arg("id", () => ID) id: string) {
    return User.deleteUser(id);
  }

  @Mutation(() => User)
  async signIn(
    @Args() args: SignInUser,
    @Ctx() context: Context,
  ): Promise<User> {
    const { user, session } = await User.signIn(args);
    setUserSessionIdInCookie(context.res, session);
    return user;
  }

  @Authorized("user")
  @Query(() => User)
  async myProfile(@Ctx() { user }: Context): Promise<User> {
    return User.getUserById((user as User).id);
  }

  @Authorized("user")
  @Mutation(() => User)
  async addFavoritePlace(
    @Arg("placeId") placeId: string,
    @Ctx() { user }: Context,
  ): Promise<User> {
    return User.addFavoritePlace((user as User).id, placeId);
  }

  @Authorized("user")
  @Mutation(() => User)
  async removeFavoritePlace(
    @Arg("placeId") placeId: string,
    @Ctx() { user }: Context,
  ): Promise<User> {
    return User.deleteFavoritePlace((user as User).id, placeId);
  }

  @Authorized("user")
  @Query(() => Boolean)
  async isInFavorites(
    @Arg("placeId") placeId: string,
    @Ctx() { user }: Context,
  ): Promise<boolean> {
    return User.isInFavorites((user as User).id, placeId);
  }
}
