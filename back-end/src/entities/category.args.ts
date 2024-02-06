import { Field, ArgsType } from "type-graphql";
import { MinLength } from "class-validator";

@ArgsType()
export class CreateCategory {
  @Field()
  @MinLength(1)
  name!: string;
}
