import {render, screen} from "@testing-library/react";
import AuthLayout from "./AuthLayout";

// mock react-router Outlet
jest.mock("react-router", () => ({
  Outlet: jest.fn(() => <div data-testid="mock-outlet" />),
}));

// mock SVG import
jest.mock("@/assets/manage_money.svg", () => "manage_money.svg");

describe("AuthLayout", () => {
  it("renders image and Outlet", () => {
    render(<AuthLayout />);
    expect(
      screen.getByAltText("Manage Money Illustration")
    ).toBeInTheDocument();
    expect(screen.getByTestId("mock-outlet")).toBeInTheDocument();
  });
});
