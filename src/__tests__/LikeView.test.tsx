import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Timestamp } from "firebase/firestore";
import Company from "../models/Company";
import LikedCompaniesView from "../components/investor/my-investments/LikeView";

// Mock useNavigate hook
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

// Mock NoData, Button, and InvestmentList components
jest.mock("../components/cummon/no-data/NoData", () => (props: any) => (
  <div data-testid="no-data">{props.messeage}</div>
));
jest.mock("../components/cummon/Button", () => (props: any) => (
  <button
    onClick={props.onClick}
    style={{ backgroundColor: props.backgroundColor }}
  >
    {props.label}
  </button>
));

jest.mock("../components/cummon/invest-card/InvestList", () => (props: any) => (
  <div data-testid="investment-list">
    InvestmentList with {props.companies.length} companies
  </div>
));

// Mock Company class
const mockCompany1 = new Company(
  "1",
  "Company 1",
  "email@company1.com",
  {
    website: "https://company1.com",
    promoVideoLink: "https://company1.com/video",
    country: "Country 1",
    registrarOfCompanies: true,
    category: "Category 1",
    description: "Description 1",
    about: "About Company 1",
    image: "path/to/image1.png",
    logo: "path/to/logo1.png",
  },
  {
    targetAmount: 100000,
    deadline: Timestamp.now(), // Use Timestamp instance
    minInvestment: 1000,
    raisePurpose: ["Purpose 1"],
    raisedAmount: 50000,
    currentInvestmentsAmount: 25000,
  },
  ["doc1.pdf", "doc2.pdf"]
);

const mockCompany2 = new Company(
  "2",
  "Company 2",
  "email@company2.com",
  {
    website: "https://company2.com",
    promoVideoLink: "https://company2.com/video",
    country: "Country 2",
    registrarOfCompanies: false,
    category: "Category 2",
    description: "Description 2",
    about: "About Company 2",
    image: "path/to/image2.png",
    logo: "path/to/logo2.png",
  },
  {
    targetAmount: 200000,
    deadline: Timestamp.now(), // Use Timestamp instance
    minInvestment: 2000,
    raisePurpose: ["Purpose 2"],
    raisedAmount: 100000,
    currentInvestmentsAmount: 50000,
  },
  ["doc3.pdf", "doc4.pdf"]
);

describe("LikedCompaniesView", () => {
  //Integration test
  it("renders EmptyLikeView when there are no companies", () => {
    render(<LikedCompaniesView companies={[]} title="Liked Companies" />);

    expect(screen.getByTestId("no-data")).toHaveTextContent(
      "You haven't saved any investments"
    );
    expect(
      screen.getByRole("button", { name: /find investments/i })
    ).toBeInTheDocument();
  });

  //Integration test
  it("renders PopulatedLikeView when there are companies", () => {
    render(
      <LikedCompaniesView
        companies={[mockCompany1, mockCompany2]}
        title="Liked Companies"
      />
    );

    expect(screen.getByText("Liked Companies")).toBeInTheDocument();
    expect(screen.getByTestId("investment-list")).toHaveTextContent(
      "InvestmentList with 2 companies"
    );
  });

  //Unit test
  it("applies correct title", () => {
    const testTitle = "Test Liked Companies";
    render(<LikedCompaniesView companies={[mockCompany1]} title={testTitle} />);

    const titleElement = screen.getByText(testTitle);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe("H2");
  });
});
