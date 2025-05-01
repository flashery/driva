describe('Loan Application Form Validations', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('shows required field errors on Step 1', () => {
        // Confirm you're on Personal Details
        cy.contains('Personal Details');
        // Click "Next" to trigger validation logic
        cy.contains('Next').click();
      
        // Confirm error messages rendered by Zod
        cy.contains('First name is required');
        cy.contains('Last name is required');
        cy.contains('Invalid email');
      });
      

    it('shows Employer Name only when Employed', () => {
        cy.get('select[name="employmentStatus"]').select('Self-Employed');
        cy.get('input[name="employerName"]').should('not.exist');

        cy.get('select[name="employmentStatus"]').select('Employed');
        cy.get('input[name="employerName"]').should('exist');
    });

    it('validates deposit≤ amount in Step 2', () => {
        // Fill step 1
        cy.get('input[name="firstName"]').type('Yves');
        cy.get('input[name="lastName"]').type('Gonzaga');
        cy.get('input[name="email"]').type('yves@example.com');
        cy.get('select[name="employmentStatus"]').select('Employed');
        cy.get('input[name="employerName"]').type('Tech Corp');
        cy.contains('Next').click();

        // Step 2 - deposit exceeds amount
        cy.get('select[name="loanPurpose"]').select('Vehicle');
        cy.get('input[name="amount"]').type('5000');
        cy.get('input[name="deposit"]').type('6000'); // invalid
        cy.get('input[name="loanTerm"]').type('3');
        cy.contains('Submit').click();

        // Match schema error
        cy.contains('Deposit cannot exceed loan amount');
    });

    it('hides Deposit field when Loan Purpose is not Vehicle', () => {
        // Fill step 1
        cy.get('input[name="firstName"]').type('Yves');
        cy.get('input[name="lastName"]').type('Gonzaga');
        cy.get('input[name="email"]').type('yves@example.com');
        cy.get('select[name="employmentStatus"]').select('Employed');
        cy.get('input[name="employerName"]').type('Tech Corp');
        cy.contains('Next').click();

        // Step 2
        cy.get('select[name="loanPurpose"]').select('Home Improvement');
        cy.get('input[name="deposit"]').should('not.exist');
    });

    it('prevents submitting form with missing loan fields', () => {
        // Fill step 1
        cy.get('input[name="firstName"]').type('Yves');
        cy.get('input[name="lastName"]').type('Gonzaga');
        cy.get('input[name="email"]').type('yves@example.com');
        cy.get('select[name="employmentStatus"]').select('Employed');
        cy.get('input[name="employerName"]').type('Tech Corp');
        cy.contains('Next').click();

        // Don't fill step 2
        cy.contains('Submit').click();

        cy.contains('Minimum loan amount is $2000');
        cy.contains('Loan term must be at least 1');
    });
});
