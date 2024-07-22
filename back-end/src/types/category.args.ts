import { Field, ArgsType } from "type-graphql";
import { MinLength } from "class-validator";

@ArgsType()
export class CreateCategory {
  @Field()
  @MinLength(3, { message: "Le nom doit comporter au moins 3 caractères" })
  name!: string;

  @Field()
  @MinLength(3, { message: "L'icône doit comporter au moins 3 caractères" })
  icon!: string;
}

@ArgsType()
export class UpdateCategory {
  @Field()
  @MinLength(3, { message: "Le nom doit comporter au moins 3 caractères" })
  name!: string;

  @Field()
  @MinLength(3, { message: "L'icône doit comporter au moins 3 caractères" })
  icon!: string;
}
