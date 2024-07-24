import { Field, ArgsType } from "type-graphql";
import { MinLength, IsEmail } from "class-validator";
import { UserRole } from "../entities/user";

@ArgsType()
export class CreateUser {
  @Field()
  @MinLength(3, { message: "Le prénom doit comporter au moins 3 caractères" })
  firstName!: string;

  @Field()
  @MinLength(3, {
    message: "Le nom doit comporter au moins 3 caractères",
  })
  lastName!: string;

  @Field()
  @IsEmail({}, { message: "L'email doit être une adresse email valide" })
  email!: string;

  @Field()
  @MinLength(12, {
    message: "Le mot de passe doit comporter au moins 12 caractères",
  })
  password!: string;

  @Field(() => String, { nullable: true })
  role!: UserRole | null;
}

@ArgsType()
export class UpdateUser {
  @Field()
  @MinLength(3, { message: "Le prénom doit comporter au moins 3 caractères" })
  firstName?: string;

  @Field()
  @MinLength(3, {
    message: "Le nom de famille doit comporter au moins 3 caractères",
  })
  lastName?: string;

  @Field()
  @IsEmail({}, { message: "L'email doit être une adresse email valide" })
  email?: string;

  @Field()
  @MinLength(12, {
    message: "Le mot de passe doit comporter au moins 12 caractères",
  })
  password?: string;

  @Field(() => String, { nullable: true })
  role!: UserRole | null;
}

@ArgsType()
export class SignInUser {
  @Field()
  @IsEmail({}, { message: "L'email doit être une adresse email valide" })
  email!: string;

  @Field()
  password!: string;
}
