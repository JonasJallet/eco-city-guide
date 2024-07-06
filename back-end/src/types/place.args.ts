import { Field, ArgsType } from "type-graphql";
import { MinLength, MaxLength } from "class-validator";
import { Geometry } from "typeorm";
import { GeoJSONPoint } from "./scalar/geoJSONPoint";

@ArgsType()
export class CreatePlace {
  @Field()
  @MinLength(3)
  name!: string;

  @Field()
  @MinLength(10)
  @MaxLength(80)
  description!: string;

  @Field((type) => GeoJSONPoint)
  coordinates!: Geometry;

  @Field()
  @MinLength(8)
  address!: string;

  @Field()
  @MinLength(1)
  city!: string;

  @Field(() => [String])
  categoryIds!: string[];

  @Field(() => String, { nullable: true })
  ownerId!: string | null;
}
@ArgsType()
export class UpdatePlace {
  @Field()
  @MinLength(3)
  name?: string;

  @Field()
  @MinLength(10)
  @MaxLength(80)
  description?: string;

  @Field((type) => GeoJSONPoint)
  coordinates?: Geometry;

  @Field()
  @MinLength(8)
  address?: string;

  @Field()
  @MinLength(1)
  city?: string;

  @Field(() => [String], { nullable: true })
  categoryIds?: string[];
}
