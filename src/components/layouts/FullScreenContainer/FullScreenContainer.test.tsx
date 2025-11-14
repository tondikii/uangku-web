import {render, screen} from "@testing-library/react";
import FullScreenContainer from "./FullScreenContainer";

describe("FullScreenContainer", () => {
  it("renders children inside a full screen container", () => {
    const {container} = render(
      <FullScreenContainer>
        <div data-testid="child-element">Hello, World!</div>
      </FullScreenContainer>
    );

    const wrapper = container.firstChild as HTMLElement;
    const childElement = screen.getByTestId("child-element");

    expect(wrapper).toHaveClass("w-screen");
    expect(wrapper).toHaveClass("h-screen");
    expect(wrapper).toHaveClass("flex");
    expect(wrapper).toHaveClass("justify-center");
    expect(wrapper).toHaveClass("items-center");
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent("Hello, World!");
  });
});
