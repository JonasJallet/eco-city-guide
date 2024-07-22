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
    "\n  mutation CreateUser(\n    $firstName: String!\n    $lastName: String!\n    $email: String!\n    $password: String!\n    $role: String!\n  ) {\n    createUser(\n      firstName: $firstName\n      lastName: $lastName\n      email: $email\n      password: $password\n      role: $role\n    ) {\n      id\n      firstName\n      lastName\n      email\n      role\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation CreateCategory($name: String!, $icon: String!) {\n    createCategory(name: $name, icon: $icon) {\n      id\n      name\n      icon\n    }\n  }\n": types.CreateCategoryDocument,
    "\n  mutation CreatePlace(\n    $name: String!\n    $description: String!\n    $coordinates: Geometry!\n    $address: String!\n    $city: String!\n    $categoryIds: [String!]!\n  ) {\n    createPlace(\n      name: $name\n      description: $description\n      coordinates: $coordinates\n      address: $address\n      city: $city\n      categoryIds: $categoryIds\n    ) {\n      id\n      name\n      description\n      coordinates\n      address\n      city {\n        name\n      }\n      categories {\n        icon\n        name\n      }\n    }\n  }\n": types.CreatePlaceDocument,
    "\n  mutation AddFavoritePlace($placeId: String!) {\n    addFavoritePlace(placeId: $placeId) {\n      favoritesPlaces {\n        __typename\n        id\n        name\n        address\n        city {\n          __typename\n          id\n          name\n        }\n      }\n    }\n  }\n": types.AddFavoritePlaceDocument,
    "\n  mutation RemoveFavoritePlace($placeId: String!) {\n    removeFavoritePlace(placeId: $placeId) {\n      favoritesPlaces {\n        __typename\n        id\n        name\n        address\n        city {\n          __typename\n          id\n          name\n        }\n      }\n    }\n  }\n": types.RemoveFavoritePlaceDocument,
    "\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      id\n      email\n    }\n  }\n": types.SignInDocument,
    "\n  mutation SignOut {\n    signOut {\n      id\n    }\n  }\n": types.SignOutDocument,
    "\n  mutation DeleteUser($deleteUserId: ID!) {\n    deleteUser(id: $deleteUserId) {\n      id\n    }\n  }\n": types.DeleteUserDocument,
    "\n  mutation DeletePlace($id: ID!) {\n    deletePlace(id: $id) {\n      id\n    }\n  }\n": types.DeletePlaceDocument,
    "\n  mutation DeleteCategory($id: ID!) {\n    deleteCategory(id: $id) {\n      id\n    }\n  }\n": types.DeleteCategoryDocument,
    "\n  mutation UpdateUser(\n    $firstName: String!\n    $lastName: String!\n    $email: String!\n    $password: String!\n    $updateUserId: ID!\n  ) {\n    updateUser(\n      firstName: $firstName\n      lastName: $lastName\n      email: $email\n      password: $password\n      id: $updateUserId\n    ) {\n      id\n      firstName\n      lastName\n      email\n      hashedPassword\n    }\n  }\n": types.UpdateUserDocument,
    "\n  mutation SignUp(\n    $firstName: String!\n    $lastName: String!\n    $email: String!\n    $password: String!\n  ) {\n    signUp(\n      firstName: $firstName\n      lastName: $lastName\n      email: $email\n      password: $password\n    ) {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n": types.SignUpDocument,
    "\n  mutation UpdatePlace(\n    $name: String!\n    $description: String!\n    $coordinates: Geometry!\n    $address: String!\n    $city: String!\n    $id: ID!\n  ) {\n    updatePlace(\n      name: $name\n      description: $description\n      coordinates: $coordinates\n      address: $address\n      city: $city\n      id: $id\n    ) {\n      address\n      categories {\n        id\n        icon\n        name\n      }\n      name\n      description\n      id\n      city {\n        id\n        name\n        coordinates\n      }\n      coordinates\n    }\n  }\n": types.UpdatePlaceDocument,
    "\n  mutation UpdateCategory($name: String!, $icon: String!, $id: ID!) {\n    updateCategory(name: $name, icon: $icon, id: $id) {\n      name\n      icon\n    }\n  }\n": types.UpdateCategoryDocument,
    "\n  mutation Mutation(\n    $firstName: String!\n    $lastName: String!\n    $email: String!\n    $password: String!\n    $id: ID!\n  ) {\n    updateUser(\n      firstName: $firstName\n      lastName: $lastName\n      email: $email\n      password: $password\n      id: $id\n    ) {\n      id\n      role\n      lastName\n      userInitials\n      firstName\n      email\n    }\n  }\n": types.MutationDocument,
    "\n  query Places($city: String) {\n    places(city: $city) {\n      id\n      createdAt\n      name\n      coordinates\n      address\n      description\n      city {\n        name\n      }\n      categories {\n        id\n        name\n        icon\n      }\n      city {\n        id\n        coordinates\n      }\n    }\n  }\n": types.PlacesDocument,
    "\n  query GetCities {\n    cities {\n      name\n    }\n  }\n": types.GetCitiesDocument,
    "\n  query GetCategories {\n    categories {\n      id\n      name\n      icon\n      icon\n    }\n  }\n": types.GetCategoriesDocument,
    "\n  query GetUsers {\n    users {\n      id\n      firstName\n      lastName\n      email\n      role\n      favoritesPlaces {\n        name\n      }\n    }\n  }\n": types.GetUsersDocument,
    "\n  query GetProfile {\n    myProfile {\n      id\n      email\n      firstName\n      lastName\n      hashedPassword\n      role\n      userInitials\n      favoritesPlaces {\n        id\n        createdAt\n        address\n        coordinates\n        categories {\n          id\n          name\n          icon\n        }\n        city {\n          id\n          name\n          coordinates\n        }\n        description\n        name\n      }\n    }\n  }\n": types.GetProfileDocument,
    "\n  query isInFavorites($placeId: String!) {\n    isInFavorites(placeId: $placeId)\n  }\n": types.IsInFavoritesDocument,
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
export function graphql(source: "\n  mutation CreateUser(\n    $firstName: String!\n    $lastName: String!\n    $email: String!\n    $password: String!\n    $role: String!\n  ) {\n    createUser(\n      firstName: $firstName\n      lastName: $lastName\n      email: $email\n      password: $password\n      role: $role\n    ) {\n      id\n      firstName\n      lastName\n      email\n      role\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser(\n    $firstName: String!\n    $lastName: String!\n    $email: String!\n    $password: String!\n    $role: String!\n  ) {\n    createUser(\n      firstName: $firstName\n      lastName: $lastName\n      email: $email\n      password: $password\n      role: $role\n    ) {\n      id\n      firstName\n      lastName\n      email\n      role\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCategory($name: String!, $icon: String!) {\n    createCategory(name: $name, icon: $icon) {\n      id\n      name\n      icon\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCategory($name: String!, $icon: String!) {\n    createCategory(name: $name, icon: $icon) {\n      id\n      name\n      icon\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePlace(\n    $name: String!\n    $description: String!\n    $coordinates: Geometry!\n    $address: String!\n    $city: String!\n    $categoryIds: [String!]!\n  ) {\n    createPlace(\n      name: $name\n      description: $description\n      coordinates: $coordinates\n      address: $address\n      city: $city\n      categoryIds: $categoryIds\n    ) {\n      id\n      name\n      description\n      coordinates\n      address\n      city {\n        name\n      }\n      categories {\n        icon\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePlace(\n    $name: String!\n    $description: String!\n    $coordinates: Geometry!\n    $address: String!\n    $city: String!\n    $categoryIds: [String!]!\n  ) {\n    createPlace(\n      name: $name\n      description: $description\n      coordinates: $coordinates\n      address: $address\n      city: $city\n      categoryIds: $categoryIds\n    ) {\n      id\n      name\n      description\n      coordinates\n      address\n      city {\n        name\n      }\n      categories {\n        icon\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddFavoritePlace($placeId: String!) {\n    addFavoritePlace(placeId: $placeId) {\n      favoritesPlaces {\n        __typename\n        id\n        name\n        address\n        city {\n          __typename\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddFavoritePlace($placeId: String!) {\n    addFavoritePlace(placeId: $placeId) {\n      favoritesPlaces {\n        __typename\n        id\n        name\n        address\n        city {\n          __typename\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveFavoritePlace($placeId: String!) {\n    removeFavoritePlace(placeId: $placeId) {\n      favoritesPlaces {\n        __typename\n        id\n        name\n        address\n        city {\n          __typename\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveFavoritePlace($placeId: String!) {\n    removeFavoritePlace(placeId: $placeId) {\n      favoritesPlaces {\n        __typename\n        id\n        name\n        address\n        city {\n          __typename\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      id\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      id\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignOut {\n    signOut {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation SignOut {\n    signOut {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteUser($deleteUserId: ID!) {\n    deleteUser(id: $deleteUserId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteUser($deleteUserId: ID!) {\n    deleteUser(id: $deleteUserId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeletePlace($id: ID!) {\n    deletePlace(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeletePlace($id: ID!) {\n    deletePlace(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteCategory($id: ID!) {\n    deleteCategory(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteCategory($id: ID!) {\n    deleteCategory(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUser(\n    $firstName: String!\n    $lastName: String!\n    $email: String!\n    $password: String!\n    $updateUserId: ID!\n  ) {\n    updateUser(\n      firstName: $firstName\n      lastName: $lastName\n      email: $email\n      password: $password\n      id: $updateUserId\n    ) {\n      id\n      firstName\n      lastName\n      email\n      hashedPassword\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUser(\n    $firstName: String!\n    $lastName: String!\n    $email: String!\n    $password: String!\n    $updateUserId: ID!\n  ) {\n    updateUser(\n      firstName: $firstName\n      lastName: $lastName\n      email: $email\n      password: $password\n      id: $updateUserId\n    ) {\n      id\n      firstName\n      lastName\n      email\n      hashedPassword\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignUp(\n    $firstName: String!\n    $lastName: String!\n    $email: String!\n    $password: String!\n  ) {\n    signUp(\n      firstName: $firstName\n      lastName: $lastName\n      email: $email\n      password: $password\n    ) {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation SignUp(\n    $firstName: String!\n    $lastName: String!\n    $email: String!\n    $password: String!\n  ) {\n    signUp(\n      firstName: $firstName\n      lastName: $lastName\n      email: $email\n      password: $password\n    ) {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdatePlace(\n    $name: String!\n    $description: String!\n    $coordinates: Geometry!\n    $address: String!\n    $city: String!\n    $id: ID!\n  ) {\n    updatePlace(\n      name: $name\n      description: $description\n      coordinates: $coordinates\n      address: $address\n      city: $city\n      id: $id\n    ) {\n      address\n      categories {\n        id\n        icon\n        name\n      }\n      name\n      description\n      id\n      city {\n        id\n        name\n        coordinates\n      }\n      coordinates\n    }\n  }\n"): (typeof documents)["\n  mutation UpdatePlace(\n    $name: String!\n    $description: String!\n    $coordinates: Geometry!\n    $address: String!\n    $city: String!\n    $id: ID!\n  ) {\n    updatePlace(\n      name: $name\n      description: $description\n      coordinates: $coordinates\n      address: $address\n      city: $city\n      id: $id\n    ) {\n      address\n      categories {\n        id\n        icon\n        name\n      }\n      name\n      description\n      id\n      city {\n        id\n        name\n        coordinates\n      }\n      coordinates\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCategory($name: String!, $icon: String!, $id: ID!) {\n    updateCategory(name: $name, icon: $icon, id: $id) {\n      name\n      icon\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCategory($name: String!, $icon: String!, $id: ID!) {\n    updateCategory(name: $name, icon: $icon, id: $id) {\n      name\n      icon\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Mutation(\n    $firstName: String!\n    $lastName: String!\n    $email: String!\n    $password: String!\n    $id: ID!\n  ) {\n    updateUser(\n      firstName: $firstName\n      lastName: $lastName\n      email: $email\n      password: $password\n      id: $id\n    ) {\n      id\n      role\n      lastName\n      userInitials\n      firstName\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation Mutation(\n    $firstName: String!\n    $lastName: String!\n    $email: String!\n    $password: String!\n    $id: ID!\n  ) {\n    updateUser(\n      firstName: $firstName\n      lastName: $lastName\n      email: $email\n      password: $password\n      id: $id\n    ) {\n      id\n      role\n      lastName\n      userInitials\n      firstName\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Places($city: String) {\n    places(city: $city) {\n      id\n      createdAt\n      name\n      coordinates\n      address\n      description\n      city {\n        name\n      }\n      categories {\n        id\n        name\n        icon\n      }\n      city {\n        id\n        coordinates\n      }\n    }\n  }\n"): (typeof documents)["\n  query Places($city: String) {\n    places(city: $city) {\n      id\n      createdAt\n      name\n      coordinates\n      address\n      description\n      city {\n        name\n      }\n      categories {\n        id\n        name\n        icon\n      }\n      city {\n        id\n        coordinates\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCities {\n    cities {\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetCities {\n    cities {\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCategories {\n    categories {\n      id\n      name\n      icon\n      icon\n    }\n  }\n"): (typeof documents)["\n  query GetCategories {\n    categories {\n      id\n      name\n      icon\n      icon\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUsers {\n    users {\n      id\n      firstName\n      lastName\n      email\n      role\n      favoritesPlaces {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUsers {\n    users {\n      id\n      firstName\n      lastName\n      email\n      role\n      favoritesPlaces {\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProfile {\n    myProfile {\n      id\n      email\n      firstName\n      lastName\n      hashedPassword\n      role\n      userInitials\n      favoritesPlaces {\n        id\n        createdAt\n        address\n        coordinates\n        categories {\n          id\n          name\n          icon\n        }\n        city {\n          id\n          name\n          coordinates\n        }\n        description\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProfile {\n    myProfile {\n      id\n      email\n      firstName\n      lastName\n      hashedPassword\n      role\n      userInitials\n      favoritesPlaces {\n        id\n        createdAt\n        address\n        coordinates\n        categories {\n          id\n          name\n          icon\n        }\n        city {\n          id\n          name\n          coordinates\n        }\n        description\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query isInFavorites($placeId: String!) {\n    isInFavorites(placeId: $placeId)\n  }\n"): (typeof documents)["\n  query isInFavorites($placeId: String!) {\n    isInFavorites(placeId: $placeId)\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;