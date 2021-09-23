import { render, screen } from '@testing-library/react';
import TestComponent from  '../helpers/TestComponent';
import HomePage from '../homecomponents/HomePage'

it('renders login page', () => {
    render(
        <TestComponent>
            <HomePage />
        </TestComponent>
    );
    const homepageComponents = screen.getAllByText("Books For You")
    expect(homepageComponents.length).toBeTruthy();
});