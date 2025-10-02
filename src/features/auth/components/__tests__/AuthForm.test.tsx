/* eslint-disable @typescript-eslint/no-explicit-any */
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthForm from "../AuthForm";

// mock useAuth
const mockLogin = jest.fn();
const mockRegister = jest.fn();
let mockUser: any = null;
let mockLoading = false;
let mockError: string | null = null;

jest.mock("../../hooks/useAuth", () => ({
  useAuth: () => ({
    user: mockUser,
    loading: mockLoading,
    error: mockError,
    login: mockLogin,
    register: mockRegister,
  }),
}));

// mock react-router
const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  Link: ({to, children}: any) => <a href={to}>{children}</a>,
  useNavigate: () => mockNavigate,
}));

describe("AuthForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUser = null;
    mockLoading = false;
    mockError = null;
  });

  it("renders Sign In form by default", () => {
    render(<AuthForm />);
    expect(screen.getByText(/Sign In to UangKu/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Name")).not.toBeInTheDocument();
  });

  it("renders Sign Up form when isSignUp is true", () => {
    render(<AuthForm isSignUp />);
    expect(screen.getByText(/Sign Up to UangKu/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
  });

  it("calls login on submit when Sign In", async () => {
    render(<AuthForm />);
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const button = screen.getByRole("button", {name: /Sign In/i});

    await userEvent.type(emailInput, "admin@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(button);

    await waitFor(() =>
      expect(mockLogin).toHaveBeenCalledWith({
        email: "admin@example.com",
        password: "password123",
        name: "",
      })
    );
  });

  it("calls register on submit when Sign Up", async () => {
    render(<AuthForm isSignUp />);
    const nameInput = screen.getByPlaceholderText("Name");
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const button = screen.getByRole("button", {name: /Sign Up/i});

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "john@example.com");
    await userEvent.type(passwordInput, "secret123");
    await userEvent.click(button);

    await waitFor(() =>
      expect(mockRegister).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
        password: "secret123",
      })
    );
  });

  it("navigates to home if user is logged in", () => {
    mockUser = {id: "1", name: "John", email: "john@example.com"};
    render(<AuthForm />);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("disables submit button when loading", () => {
    mockLoading = true;
    render(<AuthForm />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("shows error message", () => {
    mockError = "Invalid credentials";
    render(<AuthForm />);
    expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
  });

  it("renders correct link in Sign In form", () => {
    render(<AuthForm />);
    expect(screen.getByRole("link", {name: /Sign Up/i})).toHaveAttribute(
      "href",
      "/sign-up"
    );
  });

  it("renders correct link in Sign Up form", () => {
    render(<AuthForm isSignUp />);
    expect(screen.getByRole("link", {name: /Sign In/i})).toHaveAttribute(
      "href",
      "/sign-in"
    );
  });
});
