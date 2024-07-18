import { gql } from "@apollo/client";

export const GET_PLACES = gql`
  query Places($city: String) {
    places(city: $city) {
      id
      createdAt
      name
      coordinates
      address
      description
      city {
        name
      }
      categories {
        id
        name
        icon
      }
      city {
        id
        coordinates
      }
    }
  }
`;

export const GET_CITIES = gql`
  query GetCities {
    cities {
      name
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      icon
    }
  }
`;

export const GET_PROFILE = gql`
  query GetProfile {
    myProfile {
      id
      email
      firstName
      lastName
      hashedPassword
      role
      userInitials
      favoritesPlaces {
        id
        createdAt
        address
        coordinates
        categories {
          id
          name
          icon
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
