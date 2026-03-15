import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "@/modules/auth/login-form";
import { vi } from "vitest";

vi.mock("next-auth/react", () => ({
  signIn: vi.fn()
}));

describe("LoginForm", () => {
  it("renders the magic link field and development actions", async () => {
    render(<LoginForm showDemo showEmail showGoogle />);

    expect(screen.getByText("Continue with magic link")).toBeInTheDocument();
    expect(screen.getByText("Continue with Google")).toBeInTheDocument();
    expect(screen.getByText("Demo access")).toBeInTheDocument();

    await userEvent.type(screen.getByPlaceholderText("you@grouptrip.com"), "casey@example.com");
    expect(screen.getByDisplayValue("casey@example.com")).toBeInTheDocument();
  });
});
