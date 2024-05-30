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
      name
      description
      coordinates
      address
      city {
        name
      }
      categories {
        name
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
