import {
  Arg,
  Args,
  Authorized,
  ID,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import Place from "../entities/place";
import { CreatePlace, UpdatePlace } from "../types/place.args";

@Resolver()
export class PlaceResolver {
  @Query(() => [Place])
  places(
    @Arg("categoryIds", () => [String], { nullable: true })
    categoryIds: string[] | undefined,
    @Arg("city", () => String, { nullable: true }) city: string | undefined,
  ) {
    return Place.getPlaces(city, categoryIds);
  }

  @Query(() => Place)
  place(@Arg("id", () => ID) id: string) {
    return Place.getPlaceById(id);
  }

  @Authorized("webAdministrator", "cityAdministrator")
  @Mutation(() => Place)
  createPlace(@Args() args: CreatePlace) {
    return Place.saveNewPlace({ ...args });
  }

  @Authorized("webAdministrator", "cityAdministrator")
  @Mutation(() => Place)
  updatePlace(@Arg("id", () => ID) id: string, @Args() args: UpdatePlace) {
    return Place.updatePlace(id, args);
  }

  @Authorized("webAdministrator", "cityAdministrator")
  @Mutation(() => Place)
  async deletePlace(@Arg("id", () => ID) id: string) {
    return Place.deletePlace(id);
  }
}
