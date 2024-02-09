import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../src/pages/login/sign-in";

describe("Page", () => {
  it("renders a link", () => {
    render(<Page />);

    expect(screen.getByRole("link", { name: "ici" })).toHaveAttribute(
      "href",
      "sign-up"
    );
  });

  it("checks the presence of a <h1> title", () => {
    render(<Page />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });

  it("checks the content of the <h1> title", () => {
    render(<Page />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading.textContent).toBe("Se connecter");
  });
});
