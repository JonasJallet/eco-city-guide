import { SIGN_IN } from "@/gql/requests/mutations";
import { GET_PROFILE } from "@/gql/requests/queries";
import { MockedResponse } from "@apollo/client/testing";

export const mockWithData_GetMyProfile: MockedResponse[] = [
  {
    request: {
      query: GET_PROFILE,
    },
    result: {
      data: {
        myProfile: {
          _typename: "User",
          id: "ffba84fc-2d80-4633-bbaf-bfd2a6ee6b36",
          email: "jj@jj.com",
          firstName: "jjj",
          lastName: "JJJ",
          hashedPassword: "zzzzzzzzzzzzz",
          role: "",
          userInitials: "",
          favoritesPlaces: {
            id: "1",
            createdAt: "",
            address: "",
            coordinates: [0.0, 0.0],
            categories: {
              id: "1",
              name: "",
              icon: "",
            },
            city: {
              id: "1",
              name: "",
              coordinates: [0.0, 0.0],
            },
            description: "aaaaaaaaa",
            name: "aaaaaaaaa",
          },
        },
      },
    },
  },
];

export const mocksWithUndefinedData_GetMyProfile: MockedResponse[] = [
  {
    request: {
      query: GET_PROFILE,
    },
    result: undefined,
  },
];

export const mockWithData_SignInForm = [
  {
    request: {
      query: SIGN_IN,
      variables: {
        email: "jj@jj.com",
        password: "123456789012",
      },
    },
    result: {
      data: {
        signIn: {
          _typename: "User",
          email: "jj@jj.com",
          firstName: "jjj",
          id: "ffba84fc-2d80-4633-bbaf-bfd2a6ee6b36",
          lastName: "JJJ",
        },
      },
    },
  },
];

export const mockWithInvalidData_SignInForm = [
  {
    request: {
      query: SIGN_IN,
      variables: {
        email: "axhje@lpdhdue.com",
        password: "123456789012",
      },
    },
    error: new Error("Email ou mot de passe incorrect."),
  },
];
