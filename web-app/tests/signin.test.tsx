import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import {
  mockWithData_GetMyProfile,
  mocksWithUndefinedData_GetMyProfile,
  mockWithData_SignInForm,
  mockWithInvalidData_SignInForm,
} from "./signin.dataset";
import SignInPage from "@/pages/login/sign-in";

const mockRouterPush = jest.fn();

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

describe("SignIn Page", () => {
  test("Redirection to home page if user is already signed in", async () => {
    render(
      <MockedProvider mocks={mockWithData_GetMyProfile} addTypename={false}>
        <SignInPage />
      </MockedProvider>
    );
    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith("/home");
    });
  });
  test("Renders login page with input fields if user is not connected", async () => {
    render(
      <MockedProvider
        mocks={mocksWithUndefinedData_GetMyProfile}
        addTypename={false}
      >
        <SignInPage />
      </MockedProvider>
    );
    await waitFor(() => {
      expect(mockRouterPush).not.toHaveBeenCalledWith("/home");
    });
  });
  test("Redirection to home page if user is recorded in dataBase and successfully connected", async () => {
    render(
      <MockedProvider
        mocks={[
          ...mocksWithUndefinedData_GetMyProfile,
          ...mocksWithUndefinedData_GetMyProfile,
          ...mockWithData_SignInForm,
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
    fireEvent.submit(screen.getByRole("form"));
    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith("/home");
    });
  });
  test("No redirection if user is not recorded in dataBase and not successfully connected", async () => {
    render(
      <MockedProvider
        mocks={[
          ...mocksWithUndefinedData_GetMyProfile,
          ...mocksWithUndefinedData_GetMyProfile,
          ...mockWithInvalidData_SignInForm,
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
    fireEvent.submit(screen.getByRole("form"));
    await screen.findByText(/Email ou mot de passe incorrect\./i);
    const errorText = screen.getByText(/Email ou mot de passe incorrect\./i);
    expect(errorText).toBeInTheDocument();
    await waitFor(() => {
      expect(mockRouterPush).not.toHaveBeenCalledWith("/home");
    });
  });
});
