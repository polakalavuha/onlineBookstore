import { render, screen } from '@testing-library/react';
import TestComponent from '../helpers/TestComponent';
import EditBook from '../adminDashboard/EditBook'

describe('Edit book Tests', () => {
    it('should EditCategory Modal is visible when show is true', () => {
        render(
            <TestComponent>
                <EditBook show={true} />
            </TestComponent>
        );
        const checkeditHeading = screen.getByText(/edit/i)
        expect(checkeditHeading).toBeVisible();
    });
})