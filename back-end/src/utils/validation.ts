import { GraphQLError } from "graphql";
import type { ValidationError as ClassValidatorValidationError } from "class-validator";
import type { GraphQLFormattedError } from "graphql";
import { ArgumentValidationError } from "type-graphql";
import { unwrapResolverError } from "@apollo/server/errors";

type IValidationError = Pick<
  ClassValidatorValidationError,
  "property" | "value" | "constraints" | "children"
>;

function formatValidationErrors(
  validationError: IValidationError,
): IValidationError {
  return {
    property: validationError.property,
    ...(validationError.value && { value: validationError.value }),
    ...(validationError.constraints && {
      constraints: validationError.constraints,
    }),
    ...(validationError.children &&
      validationError.children.length !== 0 && {
        children: validationError.children.map((child) =>
          formatValidationErrors(child),
        ),
      }),
  };
}

export class ValidationError extends GraphQLError {
  public constructor(validationErrors: ClassValidatorValidationError[]) {
    const messages = validationErrors
      .map((error) => Object.values(error.constraints || {}).join(", "))
      .join(", ");

    super(messages, {
      extensions: {
        code: "BAD_USER_INPUT",
        validationErrors: validationErrors.map((validationError) =>
          formatValidationErrors(validationError),
        ),
      },
    });

    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export function formattedValidationError(
  formattedError: GraphQLFormattedError,
  error: unknown,
): GraphQLFormattedError {
  const originalError = unwrapResolverError(error);

  if (originalError instanceof ArgumentValidationError) {
    return new ValidationError(originalError.extensions.validationErrors);
  }

  return formattedError;
}
