import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UserProvider } from "../context/UserContext";
import Profile from "../components/investor/profile/profile";

// Mock Button component
jest.mock("../components/cummon/Button", () => ({
  __esModule: true,
  default: ({
    label,
    color,
    backgroundColor,
    borderColor,
  }: {
    label: string;
    color: string;
    backgroundColor: string;
    borderColor: string;
  }) => (
    <button style={{ color, backgroundColor, borderColor }}>{label}</button>
  ),
}));

// Mock PreferencesStep component
jest.mock("../components/auth/InvestorSignUpForm/PreferencesStep", () => ({
  __esModule: true,
  default: ({ isEditing }: { isEditing: boolean }) => (
    <div>{isEditing ? "Editing" : "Not Editing"}</div>
  ),
}));

// Mock useUser context
const mockUser = { name: "John Doe", email: "john.doe@example.com" };
jest.mock("../context/UserContext", () => {
  const actual = jest.requireActual("../context/UserContext");
  return {
    ...actual,
    useUser: () => ({ user: mockUser }),
  };
});

describe("Profile Component", () => {
  //Integration test
  it("renders Profile component with user data", () => {
    render(
      <UserProvider>
        <Profile />
      </UserProvider>
    );
    // Check if PreferencesStep is rendered
    expect(screen.getByText("Editing")).toBeInTheDocument();
    // Check if Button is rendered
    expect(screen.getByText("Delete account")).toBeInTheDocument();
  });

  //Unit test
  it("renders delete account button with correct styling", () => {
    render(
      <UserProvider>
        <Profile />
      </UserProvider>
    );
    const deleteButton = screen.getByText("Delete account");
    expect(deleteButton).toHaveStyle({
      color: "red",
      backgroundColor: "white",
      borderColor: "red",
    });
  });
});
