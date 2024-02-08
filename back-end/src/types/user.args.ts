import { Field, ArgsType } from "type-graphql";
import { MinLength, IsEmail } from "class-validator";

@ArgsType()
export class CreateUser {
  @Field()
  @MinLength(3)
  firstName!: string;

  @Field()
  @MinLength(3)
  lastName!: string;

  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @MinLength(12)
  password!: string;
}

@ArgsType()
export class UpdateUser {
  @Field()
  @MinLength(3)
  firstName!: string;

  @Field()
  @MinLength(3)
  lastName!: string;

  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @MinLength(12)
  password!: string;
}

@ArgsType()
export class SignInUser {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  password!: string;
}
