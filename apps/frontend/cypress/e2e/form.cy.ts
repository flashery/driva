describe('Loan Application Multi-Step Form', () => {
    it('completes step-by-step and receives lender offers', () => {
      cy.visit('/'); // the form root
  
      // Wait for Step 1
      cy.contains('Personal Details');
      cy.get('input[name="firstName"]').type('Yves');
      cy.get('input[name="lastName"]').type('Gonzaga');
      cy.get('input[name="email"]').type('yves@example.com');
      cy.get('select[name="employmentStatus"]').select('Employed');
      cy.get('input[name="employerName"]').type('Tech Corp');
      cy.contains('Next').click();
  
      // Wait for Step 2 to appear on the same route
      cy.contains('Loan Details');
      cy.get('select[name="loanPurpose"]').select('Vehicle');
      cy.get('input[name="amount"]').type('10000');
      cy.get('input[name="deposit"]').type('1000');
      cy.get('input[name="loanTerm"]').type('5');
      cy.contains('Submit').click();
  
      // Result assertions
      cy.contains('Lender A');
      cy.contains('Monthly Repayment');
    });
  });
  