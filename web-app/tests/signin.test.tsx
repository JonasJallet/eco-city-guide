import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import SignInPage, {
  GET_MY_PROFILE_SIGN_IN,
  SIGN_IN_FORM,
} from "@/pages/login/sign-in";

const mockRouterPush = jest.fn();

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

//simuler un utilisateur connecté
const mockWithData_GetMyProfile: MockedResponse[] = [
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

//mock pour le refetch
const mockWithoutData_GetMyProfile: MockedResponse[] = [
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

//Simuler l'abscence d'utilisateur connecté
const mocksWithNullData_GetMyProfile: MockedResponse[] = [
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

//Simuler la connexion d'un utilisateur inscrit en base de données
const mockWithData_SignInForm = [
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

//mock pour la connexion d'un utilisateur avec des identifiants invalides
const mockWithInvalidData_SignInForm = [
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
////Test si un utilisateur est déjà connecté
test("redirects to home page if user is already signed in", async () => {
  render(
    <MockedProvider mocks={mockWithData_GetMyProfile} addTypename={false}>
      <SignInPage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(mockRouterPush).toHaveBeenCalledWith("/home");
  });
});

////Test si un utilisateur n'est pas déjà connecté
test("renders login page with input fields if user is not signed in", async () => {
  render(
    <MockedProvider mocks={mocksWithNullData_GetMyProfile} addTypename={false}>
      <SignInPage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(mockRouterPush).not.toHaveBeenCalledWith("/home");
  });
  await waitFor(() => {
    const emailInput = screen.getByPlaceholderText("@email");
    const submitButton = screen.getByRole("button", { name: /se connecter/i });
    const passWordInput = screen.getByPlaceholderText("Mot de passe");
    expect(submitButton).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toHaveAttribute("name", "email");
    expect(emailInput).toHaveAttribute("id", "email");
    expect(emailInput).toHaveAttribute("autoComplete", "username");
    expect(passWordInput).toHaveAttribute("type", "password");
    expect(passWordInput).toHaveAttribute("name", "password");
    expect(passWordInput).toHaveAttribute("id", "password");
    expect(passWordInput).toHaveAttribute("autoComplete", "current-password");
  });
});

//Test pour la connexion d'un utilisateur qui est enregistré en base de données
test("redirects to home page if user is recorded in dataBase and successfully connected", async () => {
  render(
    <MockedProvider
      mocks={[
        ...mockWithData_SignInForm,
        ...mockWithoutData_GetMyProfile,
        ...mockWithoutData_GetMyProfile,
      ]}
      addTypename={false}
    >
      <SignInPage />
    </MockedProvider>
  );

  fireEvent.change(screen.getByPlaceholderText(/@email/i), {
    target: { value: "jj@jj.com" },
  });
  fireEvent.change(screen.getByPlaceholderText(/mot de passe/i), {
    target: { value: "123456789012" },
  });

  fireEvent.click(screen.getByRole("button", { name: /se connecter/i }));

  await waitFor(() => {
    expect(mockRouterPush).toHaveBeenCalledWith("/home");
  });
});

//Test pour la connexion d'un utilisateur qui est enregistré en base de données
test("redirects to home page if user is recorded in dataBase and successfully connected", async () => {
  render(
    <MockedProvider
      mocks={[
        ...mockWithInvalidData_SignInForm,
        ...mockWithoutData_GetMyProfile,
        ...mockWithoutData_GetMyProfile,
      ]}
      addTypename={false}
    >
      <SignInPage />
    </MockedProvider>
  );

  fireEvent.change(screen.getByPlaceholderText(/@email/i), {
    target: { value: "axhje@lpdhdue.com" },
  });
  fireEvent.change(screen.getByPlaceholderText(/mot de passe/i), {
    target: { value: "123456789012" },
  });

  fireEvent.click(screen.getByRole("button", { name: /se connecter/i }));

  await waitFor(() => {
    expect(mockRouterPush).not.toHaveBeenCalledWith("/home");
  });
});
