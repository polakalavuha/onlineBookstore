import { render, screen,fireEvent } from '@testing-library/react';
import TestComponent from  '../helpers/TestComponent';
import Login from '../homecomponents/Login'

it('renders login page', () => {
    render(
        <TestComponent>
            <Login />
        </TestComponent>
    );
    const loginComponents = screen.getAllByText("Login")
    expect(loginComponents.length).toBeTruthy();
});

it("should check input field is working properly", () => {
    render(
        <TestComponent>
            <Login />
        </TestComponent>
    )
    // Finding username field and firing change event
    const usernameInputData = screen.getByLabelText("Username")
    fireEvent.change(usernameInputData, { target: { value: "yoshitha" } })
    // The change should be reflected in the input field
    expect(usernameInputData.value).toBe("yoshitha")
})
it("should check proper error message is displayed when fields are empty", async () => {
    render(
        <TestComponent>
            <Login />
        </TestComponent>
    )
    // Finding and clicking on login button
    const loginButton = screen.getByRole("button", { name: /Login/i })
    fireEvent.click(loginButton)
    // Finding alert msg with required text
    const reqAlert = await screen.findAllByText(/required/i)
    // Two alret messages must be there for username and password
    expect(reqAlert.length).toBe(2)
})

