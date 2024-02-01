import { Field, Float, Int, ArgsType } from "type-graphql";
import { Min, MinLength } from "class-validator";
import { Geometry, Point } from "typeorm";
import { GeoJSONPoint } from "./scalar/geoJSONPoint";

// type Point {
//   Latitude: Float!
//   Longitude: Float!
// }

@ArgsType()
export class CreatePlace {
  @Field()
  @MinLength(2)
  name!: string;

  @Field()
  description!: string;

//   @Field(() => [String])
//   categoryIds!: string[];

  @Field(() => GeoJSONPoint)
  coordinates!: Geometry;
}

@ArgsType()
export class UpdatePlace {
  @Field()
  @MinLength(2)
  name!: string;

  @Field()
  description!: string;

//   @Field(() => [String])
//   categoryIds?: string[];

  @Field(() => GeoJSONPoint)
  coordinates!: Geometry;
}