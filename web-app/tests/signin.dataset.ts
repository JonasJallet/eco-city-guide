import { GET_MY_PROFILE_SIGN_IN, SIGN_IN_FORM } from "@/pages/login/sign-in";
import { MockedResponse } from "@apollo/client/testing";

///mock + firewent
export const mockWithData_GetMyProfile: MockedResponse[] = [
  {
    request: {
      query: GET_MY_PROFILE_SIGN_IN,
    },
    result: {
      data: {
        myProfile: {
          id: "ffba84fc-2d80-4633-bbaf-bfd2a6ee6b36",
          email: "jj@jj.com",
          firstName: "jjj",
          lastName: "JJJ",
        },
      },
    },
  },
];

export const mockWithoutData_GetMyProfile: MockedResponse[] = [
  {
    request: {
      query: GET_MY_PROFILE_SIGN_IN,
      variables: {},
    },
    result: {
      data: {
        myProfile: {
          id: "ffba84fc-2d80-4633-bbaf-bfd2a6ee6b36",
          email: "jj@jj.com",
          firstName: "jjj",
          lastName: "JJJ",
        },
      },
    },
  },
];

export const mocksWithNullData_GetMyProfile: MockedResponse[] = [
  {
    request: {
      query: GET_MY_PROFILE_SIGN_IN,
    },
    result: {
      data: {
        myProfile: null,
      },
    },
  },
];

export const mockWithData_SignInForm = [
  {
    request: {
      query: SIGN_IN_FORM,
      variables: {
        email: "jj@jj.com",
        password: "123456789012",
      },
    },
    result: {
      data: {
        signIn: {
          id: "ffba84fc-2d80-4633-bbaf-bfd2a6ee6b36",
          email: "jj@jj.com",
          firstName: "jjj",
          lastName: "JJJ",
        },
      },
    },
  },
];

export const mockWithInvalidData_SignInForm = [
  {
    request: {
      query: SIGN_IN_FORM,
      variables: {
        email: "axhje@lpdhdue.com",
        password: "123456789012",
      },
    },
    result: {
      data: {
        signIn: {
          id: "",
          email: "",
          firstName: "",
          lastName: "",
        },
      },
    },
  },
];
