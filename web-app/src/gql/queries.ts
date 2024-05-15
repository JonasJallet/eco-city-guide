import { gql } from "@apollo/client";

export const GET_PLACES = gql`
  query Places($city: String) {
    places(city: $city) {
      name
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
