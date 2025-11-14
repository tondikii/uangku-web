import {render, screen} from "@testing-library/react";

// import the mocked function
import {useRouteError} from "react-router";

import ErrorPage from "./ErrorPage";

// mock react-router
jest.mock("react-router", () => ({
  useRouteError: jest.fn(),
}));

// mock SVG import
jest.mock("@/assets/error_404.svg", () => "error_404.svg");
jest.mock("@/assets/error_500.svg", () => "error_500.svg");

describe("ErrorPage", () => {
  it("renders 404 page when error status is 404", () => {
    (useRouteError as jest.Mock).mockReturnValue({status: 404});

    render(<ErrorPage />);

    // expect the 404 message
    expect(
      screen.getByText("The page you are looking for does not exist.")
    ).toBeInTheDocument();

    // expect the 404 image (by src)
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute(
      "src",
      expect.stringContaining("error_404.svg")
    );
  });

  it("renders 500 page when error status is not 404", () => {
    (useRouteError as jest.Mock).mockReturnValue({status: 500});

    render(<ErrorPage />);

    expect(
      screen.getByText(
        "Something went wrong on our end. Please try again later."
      )
    );

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute(
      "src",
      expect.stringContaining("error_500.svg")
    );
  });
});
