import {render, screen} from "@testing-library/react";
import SignUpPage from "../SignUpPage";

// mock AuthForm
// eslint-disable-next-line @typescript-eslint/no-explicit-any
jest.mock("../../components/AuthForm", () => (props: any) => (
  <div data-testid="auth-form" data-signup={props.isSignUp} />
));

describe("SignUpPage", () => {
  it("renders AuthForm with isSignUp prop", () => {
    render(<SignUpPage />);
    const form = screen.getByTestId("auth-form");
    expect(form).toBeInTheDocument();
    expect(form).toHaveAttribute("data-signup", "true");
  });
});
