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
