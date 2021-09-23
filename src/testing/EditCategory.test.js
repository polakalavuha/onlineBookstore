import { render, screen } from '@testing-library/react';
import TestComponent from '../helpers/TestComponent';
import EditCategory from '../adminDashboard/EditCategory'

describe('Edit Category Tests', () => {
    it('should EditCategory Modal is visible when show is true', () => {
        render(
            <TestComponent>
                <EditCategory show={true} />
            </TestComponent>
        );
        const checkeditHeading = screen.getByText(/edit/i)
        expect(checkeditHeading).toBeVisible();
    });
    it("checks update button is present in the modal when updateIndex is passed", () => {
        render(
            <TestComponent>
                <EditCategory show={true} updateIndex={1} />
            </TestComponent>
        )
        const updateButton = screen.getByRole("button", { name: /update/i })
        expect(updateButton).toBeVisible()
    })
})