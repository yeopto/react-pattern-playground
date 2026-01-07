import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";

describe("Header", () => {
  it("should render the logo text", () => {
    // Arrange & Act
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // Assert
    expect(screen.getByText("React Pattern Playground")).toBeInTheDocument();
  });

  it("should render logo as a link to home", () => {
    // Arrange & Act
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // Assert
    const logoLink = screen.getByRole("link", {
      name: /React Pattern Playground/i,
    });
    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("should apply correct styles to header container", () => {
    // Arrange & Act
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // Assert
    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();
  });

  it("should render logo with correct heading level", () => {
    // Arrange & Act
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // Assert
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("React Pattern Playground");
  });
});
