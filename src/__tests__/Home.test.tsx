import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../pages/home/Home";
import { useUser } from "../context/UserContext";
import { UserType } from "../utils/enums";

// Mock components
jest.mock("../pages/admin/AdminHome", () => () => <div>Admin Home</div>);
jest.mock("../pages/company/home/CompanyHome", () => () => (
  <div>Company Home</div>
));
jest.mock("../pages/investor/home/InvstorHome", () => () => (
  <div>Investor Home</div>
));
jest.mock("../pages/home/GuestHome", () => () => <div>Guest Home</div>);

// Mock useUser hook
jest.mock("../context/UserContext", () => ({
  useUser: jest.fn(),
}));

describe("Home Component", () => {
  //Integrain test
  it("renders AdminHome when user is an Admin", () => {
    (useUser as jest.Mock).mockReturnValue({
      user: { userType: UserType.Admin },
    });

    render(<Home />);

    expect(screen.getByText("Admin Home")).toBeInTheDocument();
    expect(screen.queryByText("Investor Home")).toBeNull();
    expect(screen.queryByText("Company Home")).toBeNull();
    expect(screen.queryByText("Guest Home")).toBeNull();
  });

  //Integration test
  it("renders InvestorHome when user is an Investor", () => {
    (useUser as jest.Mock).mockReturnValue({
      user: { userType: UserType.Investor },
    });

    render(<Home />);

    expect(screen.getByText("Investor Home")).toBeInTheDocument();
    expect(screen.queryByText("Admin Home")).toBeNull();
    expect(screen.queryByText("Company Home")).toBeNull();
    expect(screen.queryByText("Guest Home")).toBeNull();
  });

  //Integration test
  it("renders Company Home when user is a Company", () => {
    (useUser as jest.Mock).mockReturnValue({
      user: { userType: UserType.Company },
    });

    render(<Home />);

    expect(screen.getByText("Company Home")).toBeInTheDocument();
    expect(screen.queryByText("Admin Home")).toBeNull();
    expect(screen.queryByText("Investor Home")).toBeNull();
    expect(screen.queryByText("Guest Home")).toBeNull();
  });

  //Integration test
  it("renders GuestHome when no user is logged in", () => {
    (useUser as jest.Mock).mockReturnValue({
      user: null,
    });

    render(<Home />);

    expect(screen.getByText("Guest Home")).toBeInTheDocument();
    expect(screen.queryByText("Admin Home")).toBeNull();
    expect(screen.queryByText("Investor Home")).toBeNull();
    expect(screen.queryByText("Company Home")).toBeNull();
  });

  //Unit test
  it("renders a single child component", () => {
    (useUser as jest.Mock).mockReturnValue({
      user: null,
    });
    const { container } = render(<Home />);
    expect(container.firstChild?.childNodes.length).toBe(1);
  });
});
