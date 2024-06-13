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

export const GET_MY_PROFILE_INITIALS = gql`
  query GetMyProfileInitials {
    myProfile {
      id
      firstName
      lastName
      userInitials
    }
  }
`;

export const GET_MY_PROFILE_FAVORIES = gql`
  query GetMyProfileAndFavories {
    myProfile {
      id
      email
      firstName
      lastName
      hashedPassword
      favoritesPlaces {
        id
        name
        address
        coordinates
        createdAt
        description

        city {
          id
          name
          coordinates
        }
        categories {
          id
          name
          icon
        }
        owner {
          id
          createdAt
          firstName
          lastName
          userInitials
          role
          email
          hashedPassword
          favoritesPlaces {
            id
            name
          }
        }
      }
    }
  }
`;

export const REMOVE_FAVORI = gql`
  mutation RemoveFavoritePlace($placeId: String!) {
    removeFavoritePlace(placeId: $placeId) {
      email
    }
  }
`;
