import {render, screen} from "@testing-library/react";
import SignInPage from "../SignIn.page";

// mock AuthForm
// eslint-disable-next-line @typescript-eslint/no-explicit-any
jest.mock("../../components/AuthForm", () => (props: any) => (
  <div data-testid="auth-form" data-signup={props.isSignUp} />
));

describe("SignInPage", () => {
  it("renders AuthForm without isSignUp", () => {
    render(<SignInPage />);
    const form = screen.getByTestId("auth-form");
    expect(form).toBeInTheDocument();
    expect(form).not.toHaveAttribute("data-signup", "true");
  });
});
