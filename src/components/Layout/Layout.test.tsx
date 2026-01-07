import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout";

describe("Layout", () => {
  it("should render children content", () => {
    // Arrange
    const testContent = "Test Content";

    // Act
    render(
      <BrowserRouter>
        <Layout>
          <div>{testContent}</div>
        </Layout>
      </BrowserRouter>
    );

    // Assert
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it("should render Header component", () => {
    // Arrange & Act
    render(
      <BrowserRouter>
        <Layout>
          <div>Content</div>
        </Layout>
      </BrowserRouter>
    );

    // Assert
    expect(screen.getByText("React Pattern Playground")).toBeInTheDocument();
  });

  it("should wrap children in main element", () => {
    // Arrange
    const testId = "test-child";

    // Act
    const { container } = render(
      <BrowserRouter>
        <Layout>
          <div data-testid={testId}>Child Content</div>
        </Layout>
      </BrowserRouter>
    );

    // Assert
    const mainElement = container.querySelector("main");
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toContainElement(screen.getByTestId(testId));
  });

  it("should have correct layout structure", () => {
    // Arrange & Act
    const { container } = render(
      <BrowserRouter>
        <Layout>
          <div>Test</div>
        </Layout>
      </BrowserRouter>
    );

    // Assert
    const layoutContainer = container.firstChild;
    const header = container.querySelector("header");
    const main = container.querySelector("main");

    expect(layoutContainer).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
  });

  it("should accept React.ReactNode as children", () => {
    // Arrange & Act
    render(
      <BrowserRouter>
        <Layout>
          <>
            <div>First</div>
            <div>Second</div>
          </>
        </Layout>
      </BrowserRouter>
    );

    // Assert
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });
});
