/* @vitest-environment jsdom */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import NotFound from "./NotFound";
import ServerUnavailable from "./ServerUnavailable";
import VerifyEmail from "./VerifyEmail";

describe("Router screens", () => {
  it("renders not-found screen links", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Login" })).toHaveAttribute("href", "/login");
  });

  it("renders server-unavailable screen", () => {
    render(
      <MemoryRouter>
        <ServerUnavailable />
      </MemoryRouter>
    );

    expect(screen.getByText("Server Unavailable")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
  });

  it("shows invalid token state for verify page without token", () => {
    render(
      <MemoryRouter initialEntries={["/verify"]}>
        <VerifyEmail />
      </MemoryRouter>
    );

    expect(screen.getByText("Invalid or missing verification token.")).toBeInTheDocument();
  });
});
