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
          email: "jj@jj.com",
          firstName: "jjj",
          id: "ffba84fc-2d80-4633-bbaf-bfd2a6ee6b36",
          lastName: "JJJ",
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
