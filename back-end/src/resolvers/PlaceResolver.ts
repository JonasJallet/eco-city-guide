import {
    Arg,
    Args,
    Authorized,
    Ctx,
    ID,
    Mutation,
    Query,
    Resolver,
  } from "type-graphql";
  import Place from "../entities/place";
  import { CreateOrUpdatePlace } from "../entities/place.args";
//   import { Context } from "..";
//   import User from "../entities/user";
  
  @Resolver()
  export class PlaceResolver {
    @Query(() => [Place])
    places(@Arg("category", { nullable: true }) category: number) {
      return Place.getPlaces();
    //   return Place.getPlaces(category ?? undefined);
    }
  
    @Query(() => Place)
    place(@Arg("id", () => ID) id: string) {
      return Place.getPlaceById(id);
    }
  
    // @Authorized()
    // @Mutation(() => Place)
    // createPlace(@Args() args: CreateOrUpdatePlace, @Ctx() { user }: Context) {
    //   return Place.saveNewPlace({ ...args, user: user as User });
    // }
  
    // @Authorized()
    @Mutation(() => Place)
    updatePlace(@Arg("id", () => ID) id: string, @Args() args: CreateOrUpdatePlace) {
      return Place.updatePlace(id, args);
    }
  
    // @Authorized()
    @Mutation(() => Place)
    async deletePlace(@Arg("id", () => ID) id: string) {
      return Place.deletePlace(id);
    }
  }