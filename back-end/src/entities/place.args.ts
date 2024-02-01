import { Field, Float, Int, ArgsType } from "type-graphql";
import { Min, MinLength } from "class-validator";
import { Point } from "typeorm";


// type PointP {
//   longittude : Float,
//   latitude : Float;
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

  // @Field(() => [])
    // type: "point";
    // coordinates!: number[];
    // point!: Point[];

//   @Field(() => [Number])
//   notes!: number[];
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

  // @Field(() => [])
    // type: "point";
    // coordinates!: number[];
    // point!: Point[];
}