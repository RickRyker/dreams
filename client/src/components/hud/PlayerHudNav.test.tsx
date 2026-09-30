/* @vitest-environment jsdom */
import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import { fireEvent, screen } from "@testing-library/dom";
import { describe, expect, it } from "vitest";
import { PlayerHudNav } from "./PlayerHudNav";
import { PlayerPanelsProvider } from "../../state/PlayerPanelsContext";
import { PlayerPanelsLayer } from "../player/PlayerPanelsLayer";

function renderWithProviders() {
  return render(
    <PlayerPanelsProvider>
      <PlayerHudNav />
      <PlayerPanelsLayer />
    </PlayerPanelsProvider>
  );
}

describe("PlayerHudNav", () => {
  it("toggles panel visibility from nav button clicks", () => {
    renderWithProviders();

    const inventoryButton = screen.getByRole("button", { name: "Inventory (I)" });
    expect(screen.queryByRole("dialog", { name: "Inventory" })).not.toBeInTheDocument();

    fireEvent.click(inventoryButton);
    expect(screen.getByRole("dialog", { name: "Inventory" })).toBeInTheDocument();

    fireEvent.click(inventoryButton);
    expect(screen.queryByRole("dialog", { name: "Inventory" })).not.toBeInTheDocument();
  });

  it("toggles panel visibility from keyboard shortcuts", () => {
    renderWithProviders();

    expect(screen.queryByRole("dialog", { name: "Journal" })).not.toBeInTheDocument();

    fireEvent.keyDown(window, { key: "j" });
    expect(screen.getByRole("dialog", { name: "Journal" })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "j" });
    expect(screen.queryByRole("dialog", { name: "Journal" })).not.toBeInTheDocument();
  });
});
