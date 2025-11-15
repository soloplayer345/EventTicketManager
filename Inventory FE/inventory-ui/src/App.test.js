import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("react-router-dom");

test("renders landing hero headline", () => {
    render(<App />);
    const headline = screen.getByText(/FU-Eventify/i);
    expect(headline).toBeInTheDocument();
});
