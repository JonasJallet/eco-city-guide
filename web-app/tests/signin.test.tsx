import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import {
  mockWithData_GetMyProfile,
  mockWithoutData_GetMyProfile,
  mocksWithNullData_GetMyProfile,
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

  test("renders login page with input fields if user is not connected", async () => {
    render(
      <MockedProvider
        mocks={mocksWithNullData_GetMyProfile}
        addTypename={false}
      >
        <SignInPage />
      </MockedProvider>
    );
    await waitFor(() => {
      expect(mockRouterPush).not.toHaveBeenCalledWith("/home");
    });
    await waitFor(() => {
      const emailInput = screen.getByPlaceholderText("@email");
      const submitButton = screen.getByRole("button", {
        name: /se connecter/i,
      });
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
});
