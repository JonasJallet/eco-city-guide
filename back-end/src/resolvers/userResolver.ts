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
  @Query(() => [User])
  users() {
    return User.getUsers();
  }

  @Query(() => User)
  async myProfile(@Ctx() { user }: Context): Promise<User> {
    return User.getUserById((user as User).id);
  }

  @Query(() => Boolean)
  async isInFavorites(
    @Arg("placeId") placeId: string,
    @Ctx() { user }: Context,
  ): Promise<boolean> {
    return User.isInFavorites((user as User).id, placeId);
  }

  @Authorized("webAdministrator", "user")
  @Query(() => Boolean)
  async isAuthenticated(@Ctx() { user }: Context): Promise<boolean> {
    return user !== undefined && user !== null;
  }

  @Authorized("webAdministrator", "cityAdministrator", "user")
  @Mutation(() => User)
  updateUser(
    @Arg("id", () => ID) id: string,
    @Args() args: UpdateUser,
    @Ctx() { user }: Context,
  ) {
    this.checkUserPermissions(user as User, id);
    return User.updateUser(id, args);
  }

  @Authorized("webAdministrator", "cityAdministrator", "user")
  @Mutation(() => User)
  async deleteUser(
    @Arg("id", () => ID) id: string,
    @Ctx() { user }: Context,
  ): Promise<User> {
    this.checkUserPermissions(user as User, id);
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

  @Mutation(() => User)
  async signOut(@Ctx() { user }: Context): Promise<User | null> {
    await User.signOut(user as User);
    return user;
  }

  @Mutation(() => User)
  signUp(@Args() args: CreateUser) {
    return User.saveNewUser(args);
  }

  @Mutation(() => User)
  async addFavoritePlace(
    @Arg("placeId") placeId: string,
    @Ctx() { user }: Context,
  ): Promise<User> {
    return User.addFavoritePlace((user as User).id, placeId);
  }

  @Mutation(() => User)
  async removeFavoritePlace(
    @Arg("placeId") placeId: string,
    @Ctx() { user }: Context,
  ): Promise<User> {
    return User.deleteFavoritePlace((user as User).id, placeId);
  }

  private checkUserPermissions(currentUser: User, targetUserId: string): void {
    if (
      currentUser.role !== "webAdministrator" &&
      currentUser.id !== targetUserId
    ) {
      throw new Error("Vous n'avez pas les droits pour modifier ce compte");
    }
  }
}
