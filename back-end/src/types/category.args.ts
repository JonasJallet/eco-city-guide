import { Field, ArgsType } from "type-graphql";
import { MinLength } from "class-validator";

@ArgsType()
export class CreateCategory {
  @Field()
  @MinLength(3)
  name!: string;
}

@ArgsType()
export class UpdateCategory {
  @Field()
  @MinLength(3)
  name!: string;
}
