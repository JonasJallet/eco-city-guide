import { Field, ArgsType } from "type-graphql";
import { MinLength, IsEmail } from "class-validator";
import { Geometry } from "typeorm";
import { GeoJSONPoint } from "./scalar/geoJSONPoint"
import { UserRole } from "./user";

@ArgsType()
export class CreateUser {
  @Field()
  @MinLength(1)
  firstName!: string;

  @Field()
  @MinLength(1)
  lastName!: string;

  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @MinLength(12)
  password!: string;

  @Field()
  role!: UserRole;


//   @Field(() => [String])
//   categoryIds!: string[];
}


@ArgsType()
export class UpdateUser {
  @Field()
  @MinLength(2)
  firstName!: string;

  @Field()
  @MinLength(2)
  lastName!: string;

  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @MinLength(2)
  password!: string;

//   @Field()
//   role!: string;


//   @Field(() => [String])
//   categoryIds!: string[];
}