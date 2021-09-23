import { render, screen } from '@testing-library/react';
import TestComponent from  '../helpers/TestComponent';
import Register from '../homecomponents/Register';

it('renders register page', () => {
    render(
        <TestComponent>
            <Register/>
        </TestComponent>
    );
    const registerComponents = screen.getAllByText("Register")
    expect(registerComponents.length).toBeTruthy();
});