import { gql } from "@apollo/client";

export const GET_PLACES = gql`
  query Places($city: String) {
    places(city: $city) {
      id
      name
      coordinates
      address
      description
      city {
        name
      }
      categories {
        name
      }
    }
  }
`;

export const GET_CITIES = gql`
  query GetCities {
    city {
      name
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
    }
  }
`;

export const GET_FAVORITES = gql`
  query favorites {
    myProfile {
      favoritesPlaces {
        id
        createdAt
        address
        coordinates
        categories {
          id
          name
        }
        city {
          id
          name
          coordinates
        }
        description
        name
      }
    }
  }
`;

export const IS_IN_FAVORITES = gql`
  query isInFavorites($placeId: String!) {
    isInFavorites(placeId: $placeId)
  }
`;
