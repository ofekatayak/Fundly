import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Timestamp } from "firebase/firestore";
import Company from "../models/Company";
import InvestmentsView from "../components/investor/my-investments/InvestmentsView";

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
    deadline: Timestamp.now(),
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
    deadline: Timestamp.now(),
    minInvestment: 2000,
    raisePurpose: ["Purpose 2"],
    raisedAmount: 100000,
    currentInvestmentsAmount: 50000,
  },
  ["doc3.pdf", "doc4.pdf"]
);

describe("InvestmentsView", () => {
  //Integration test
  it("renders NoData and Button when there are no companies", () => {
    render(<InvestmentsView companies={[]} title="Investments" />);

    expect(screen.getByTestId("no-data")).toHaveTextContent(
      "No investments yet"
    );
    expect(
      screen.getByRole("button", { name: /find investments!/i })
    ).toBeInTheDocument();
  });

  //Integration test
  it("renders InvestmentList when there are companies", () => {
    render(
      <InvestmentsView
        companies={[mockCompany1, mockCompany2]}
        title="Investments"
      />
    );

    expect(screen.getByText("Investments")).toBeInTheDocument();
    expect(screen.getByTestId("investment-list")).toHaveTextContent(
      "InvestmentList with 2 companies"
    );
  });

  //Unit test
  it("renders correct elements when there are no companies", () => {
    render(<InvestmentsView companies={[]} title="Test Investments" />);

    // Check for the "No investments yet" message
    expect(screen.getByText("No investments yet")).toBeInTheDocument();

    // Check for the "Find Investments!" button
    const button = screen.getByRole("button", { name: /Find Investments!/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle("background-color: rgb(57, 149, 140)");
  });

  //Unit test
  it("renders InvestmentList when companies are provided", () => {
    const mockCompanies = [mockCompany1, mockCompany2];
    render(
      <InvestmentsView companies={mockCompanies} title="Test Investments" />
    );

    expect(screen.getByTestId("investment-list")).toHaveTextContent(
      "InvestmentList with 2 companies"
    );
  });
});
