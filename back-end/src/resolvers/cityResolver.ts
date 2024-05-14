import { Query, Resolver } from "type-graphql";
import City from "../entities/city";

@Resolver()
export class CityResolver {
  @Query(() => [City])
  cities() {
    return City.getCities();
  }
}
