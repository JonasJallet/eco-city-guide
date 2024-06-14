import { gql } from "@apollo/client";

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($name: String!) {
    createCategory(name: $name) {
      id
      name
    }
  }
`;

export const CREATE_PLACE = gql`
  mutation CreatePlace(
    $name: String!
    $description: String!
    $coordinates: Geometry!
    $address: String!
    $city: String!
    $categoryIds: [String!]!
  ) {
    createPlace(
      name: $name
      description: $description
      coordinates: $coordinates
      address: $address
      city: $city
      categoryIds: $categoryIds
    ) {
      id
      name
      description
      coordinates
      address
      city {
        name
      }
      categories {
        icon
        name
      }
    }
  }
`;

export const ADD_FAVORITE_PLACE = gql`
  mutation AddFavoritePlace($placeId: String!) {
    addFavoritePlace(placeId: $placeId) {
      favoritesPlaces {
        __typename
        id
        name
        address
        city {
          __typename
          id
          name
        }
      }
    }
  }
`;

export const REMOVE_FAVORITE_PLACE = gql`
  mutation RemoveFavoritePlace($placeId: String!) {
    removeFavoritePlace(placeId: $placeId) {
      favoritesPlaces {
        __typename
        id
        name
        address
        city {
          __typename
          id
          name
        }
      }
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      email
      firstName
      lastName
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut {
      id
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId) {
      id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $updateUserId: ID!
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      id: $updateUserId
    ) {
      id
      firstName
      lastName
      email
      hashedPassword
    }
  }
`;
