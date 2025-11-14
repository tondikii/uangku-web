import {render, screen} from "@testing-library/react";
import App from "./App";

// Mock react-router Outlet (default case)
jest.mock("react-router", () => ({
  Outlet: () => <div data-testid="mock-outlet" />,
}));

// Mock PageLoader
jest.mock("@/components", () => ({
  PageLoader: () => <div data-testid="page-loader" />,
}));

describe("App components", () => {
  afterEach(() => {
    jest.resetModules(); // clear module cache so doMock works properly
  });

  it("renders the Outlet normally", () => {
    render(<App />);
    expect(screen.getByTestId("mock-outlet")).toBeInTheDocument();
  });

  it("renders the fallback (PageLoader) when child suspends", async () => {
    // custom Outlet mock that suspends
    jest.doMock("react-router", () => ({
      Outlet: () => {
        throw new Promise(() => {}); // force Suspense fallback
      },
    }));

    // re-import App after mocking
    const {default: SuspenseApp} = await import("./App");

    render(<SuspenseApp />);
    expect(await screen.findByTestId("page-loader")).toBeInTheDocument();
  });
});
