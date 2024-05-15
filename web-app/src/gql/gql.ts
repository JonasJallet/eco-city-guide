/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CreateCategory($name: String!) {\n    createCategory(name: $name) {\n      id\n      name\n    }\n  }\n": types.CreateCategoryDocument,
    "\n  mutation CreatePlace(\n    $name: String!\n    $description: String!\n    $coordinates: Geometry!\n    $address: String!\n    $city: String!\n    $categoryIds: [String!]!\n  ) {\n    createPlace(\n      name: $name\n      description: $description\n      coordinates: $coordinates\n      address: $address\n      city: $city\n      categoryIds: $categoryIds\n    ) {\n      name\n      description\n      coordinates\n      address\n      city {\n        name\n      }\n      categories {\n        name\n      }\n    }\n  }\n": types.CreatePlaceDocument,
    "\n  mutation RemoveFavoritePlace($placeId: String!) {\n    removeFavoritePlace(placeId: $placeId) {\n      favoritesPlaces {\n        __typename\n        id\n        name\n        address\n        city {\n          __typename\n          id\n          name\n        }\n      }\n    }\n  }\n": types.RemoveFavoritePlaceDocument,
    "\n  query favorites {\n    myProfile {\n      favoritesPlaces {\n        id\n        createdAt\n        address\n        coordinates\n        categories {\n          id\n          name\n        }\n        city {\n          id\n          name\n          coordinates\n        }\n        description\n        name\n      }\n    }\n  }\n": types.FavoritesDocument,
    "\n  query GetMyProfileInitials {\n    myProfile {\n      id\n      firstName\n      lastName\n      userInitials\n    }\n  }\n": types.GetMyProfileInitialsDocument,
    "\n  mutation SignInForm($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n": types.SignInFormDocument,
    "\n  query GetMyProfileSignIn {\n    myProfile {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n": types.GetMyProfileSignInDocument,
    "\n  mutation SignUp(\n    $firstName: String!\n    $lastName: String!\n    $email: String!\n    $password: String!\n  ) {\n    signUp(\n      firstName: $firstName\n      lastName: $lastName\n      email: $email\n      password: $password\n    ) {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n": types.SignUpDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCategory($name: String!) {\n    createCategory(name: $name) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCategory($name: String!) {\n    createCategory(name: $name) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePlace(\n    $name: String!\n    $description: String!\n    $coordinates: Geometry!\n    $address: String!\n    $city: String!\n    $categoryIds: [String!]!\n  ) {\n    createPlace(\n      name: $name\n      description: $description\n      coordinates: $coordinates\n      address: $address\n      city: $city\n      categoryIds: $categoryIds\n    ) {\n      name\n      description\n      coordinates\n      address\n      city {\n        name\n      }\n      categories {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePlace(\n    $name: String!\n    $description: String!\n    $coordinates: Geometry!\n    $address: String!\n    $city: String!\n    $categoryIds: [String!]!\n  ) {\n    createPlace(\n      name: $name\n      description: $description\n      coordinates: $coordinates\n      address: $address\n      city: $city\n      categoryIds: $categoryIds\n    ) {\n      name\n      description\n      coordinates\n      address\n      city {\n        name\n      }\n      categories {\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveFavoritePlace($placeId: String!) {\n    removeFavoritePlace(placeId: $placeId) {\n      favoritesPlaces {\n        __typename\n        id\n        name\n        address\n        city {\n          __typename\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveFavoritePlace($placeId: String!) {\n    removeFavoritePlace(placeId: $placeId) {\n      favoritesPlaces {\n        __typename\n        id\n        name\n        address\n        city {\n          __typename\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query favorites {\n    myProfile {\n      favoritesPlaces {\n        id\n        createdAt\n        address\n        coordinates\n        categories {\n          id\n          name\n        }\n        city {\n          id\n          name\n          coordinates\n        }\n        description\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query favorites {\n    myProfile {\n      favoritesPlaces {\n        id\n        createdAt\n        address\n        coordinates\n        categories {\n          id\n          name\n        }\n        city {\n          id\n          name\n          coordinates\n        }\n        description\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMyProfileInitials {\n    myProfile {\n      id\n      firstName\n      lastName\n      userInitials\n    }\n  }\n"): (typeof documents)["\n  query GetMyProfileInitials {\n    myProfile {\n      id\n      firstName\n      lastName\n      userInitials\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignInForm($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n"): (typeof documents)["\n  mutation SignInForm($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMyProfileSignIn {\n    myProfile {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n"): (typeof documents)["\n  query GetMyProfileSignIn {\n    myProfile {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignUp(\n    $firstName: String!\n    $lastName: String!\n    $email: String!\n    $password: String!\n  ) {\n    signUp(\n      firstName: $firstName\n      lastName: $lastName\n      email: $email\n      password: $password\n    ) {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation SignUp(\n    $firstName: String!\n    $lastName: String!\n    $email: String!\n    $password: String!\n  ) {\n    signUp(\n      firstName: $firstName\n      lastName: $lastName\n      email: $email\n      password: $password\n    ) {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;