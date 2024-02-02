import { Field, ArgsType } from "type-graphql";
import { MinLength } from "class-validator";
import { Geometry } from "typeorm";
import { GeoJSONPoint } from "./scalar/geoJSONPoint"

@ArgsType()
export class CreatePlace {
  @Field()
  @MinLength(2)
  name!: string;

  @Field()
  description!: string;

  @Field((type) => GeoJSONPoint)
  coordinates!: Geometry;

//   @Field(() => [String])
//   categoryIds!: string[];
}
@ArgsType()
  export class UpdatePlace {
    @Field()
    @MinLength(2)
    name!: string;

  @Field()
  description!: string;

  @Field((type) => GeoJSONPoint)
  coordinates!: Geometry;

//   @Field(() => [String])
//   categoryIds?: string[];
}