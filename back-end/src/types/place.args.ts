import { Field, ArgsType } from "type-graphql";
import { MinLength, MaxLength } from "class-validator";
import { Geometry } from "typeorm";
import { GeoJSONPoint } from "./scalar/geoJSONPoint";

@ArgsType()
export class CreatePlace {
  @Field()
  @MinLength(3, { message: "Le nom doit contenir au moins 3 caractères" })
  name!: string;

  @Field()
  @MinLength(10, {
    message: "La description doit contenir au moins 10 caractères",
  })
  @MaxLength(180, {
    message: "La description ne doit pas contenir plus de 180 caractères",
  })
  description!: string;

  @Field((type) => GeoJSONPoint)
  coordinates!: Geometry;

  @Field()
  @MinLength(3, { message: "L'adresse doit contenir au moins 3 caractères" })
  address!: string;

  @Field()
  @MinLength(1, { message: "La ville doit contenir au moins 1 caractère" })
  city!: string;

  @Field(() => [String])
  categoryIds!: string[];

  @Field(() => String, { nullable: true })
  ownerId!: string | null;
}

@ArgsType()
export class UpdatePlace {
  @Field()
  @MinLength(3, { message: "Le nom doit contenir au moins 3 caractères" })
  name?: string;

  @Field()
  @MinLength(10, {
    message: "La description doit contenir au moins 10 caractères",
  })
  @MaxLength(180, {
    message: "La description ne doit pas contenir plus de 180 caractères",
  })
  description?: string;

  @Field((type) => GeoJSONPoint)
  coordinates?: Geometry;

  @Field()
  @MinLength(3, { message: "L'adresse doit contenir au moins 3 caractères" })
  address?: string;

  @Field()
  @MinLength(1, { message: "La ville doit contenir au moins 1 caractère" })
  city?: string;

  @Field(() => [String], { nullable: true })
  categoryIds?: string[];
}
