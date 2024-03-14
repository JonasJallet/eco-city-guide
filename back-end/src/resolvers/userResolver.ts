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
import Place from "../entities/place";
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

  @Mutation(() => User)
  updateUser(@Arg("id", () => ID) id: string, @Args() args: UpdateUser) {
    return User.updateUser(id, args);
  }

  @Mutation(() => User)
  async deleteUser(@Arg("id", () => ID) id: string) {
    return User.deleteUser(id);
  }

  @Mutation(() => User)
  async signIn(
    @Args() args: SignInUser,
    @Ctx() context: Context
  ): Promise<User> {
    const { user, session } = await User.signIn(args);
    setUserSessionIdInCookie(context.res, session);
    return user;
  }

  @Authorized()
  @Query(() => User)
  async myProfile(@Ctx() { user }: Context): Promise<User> {
    return user as User;
  }

  @Authorized()
  @Mutation(() => User)
  async addFavoritePlace(
    @Arg("placeId") placeId: string,
    @Ctx() { user }: Context
  ): Promise<User> {
    return User.addFavoritePlace((user as User).id, placeId);
  }

  @Authorized()
  @Mutation(() => User)
  async removeFavoritePlace(
    @Arg("placeId") placeId: string,
    @Ctx() { user }: Context
  ): Promise<User> {
    return User.deleteFavoritePlace((user as User).id, placeId);
  }

  @Authorized()
  @Query(() => User)
  async userFavoritesPlaces(@Ctx() { user }: Context): Promise<Place[]> {
    return (user as User).favoritesPlaces;
  }
}
