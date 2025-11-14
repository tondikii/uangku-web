import {render, screen} from "@testing-library/react";
import PageLoader from "./PageLoader";

jest.mock("react-spinners", () => ({
  PropagateLoader: () => <div data-testid="page-loader" />,
}));

describe("PageLoader", () => {
  it("renders the loader with the correct test id", () => {
    render(<PageLoader />);
    const loader = screen.getByTestId("page-loader");
    expect(loader).toBeInTheDocument();
  });

  it("renders inside a full screen container", () => {
    const {container} = render(<PageLoader />);
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper).toHaveClass("w-screen");
    expect(wrapper).toHaveClass("h-screen");
    expect(wrapper).toHaveClass("flex");
    expect(wrapper).toHaveClass("justify-center");
    expect(wrapper).toHaveClass("items-center");
  });
});
