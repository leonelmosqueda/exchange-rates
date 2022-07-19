/// <reference types="Cypress" />

const URL_API = "https://api.frankfurter.app";
const today = new Date();
const date = `${today.getFullYear()}-${(today.getMonth()+1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

describe('Home page', () => {
  it('successfully loads', () => {
    cy.visit('/')
  });

  describe('Initial setup', () => {
    it('makes sure the date is today', () => {
      

      cy.get('[name="date"]').should('contain.value', date)

    });

    it('makes sure the options exist', () => {
      cy.get('[name="from-currency"]').children().should('have.length', 33);
      cy.get('[name="to-currency"]').children().should('have.length', 33);
    });

    it('makes sure the inputs are empty', () => {
      cy.get('[name="from-currency"]').should('have.value', '');
      cy.get('[name="to-currency"]').should('have.value', '');
      cy.get('[name="amount"]').should('have.value', '');
    }); 

  });
});

describe('Funcionalities', () => {
  const amount = 1;
  const fromCurrency = 'USD';
  const toCurrency = 'EUR';

  describe('currency converter', () => {
    it('selects currencies and amount', () => {
      cy.get('[name="from-currency"]').select(fromCurrency);
      cy.get('[name="to-currency"]').select(toCurrency);
      cy.get('[name="amount"]').type(amount);
    });
    it('makes sure the swap button works', () => {
      cy.get('[data-button="swap"]').click()
      
      cy.get('[name="from-currency"]').should('have.value', toCurrency)
      cy.get('[name="to-currency"]').should('have.value', fromCurrency)
      
      cy.get('[data-button="swap"]').click()
    });
    it('currency converter works', () => {
      cy.get('[data-button="convert"]').click();
      cy.get('#result').should('not.have.class', 'hidden');
    });
  });

  describe('all currencies converter', () => {
    it('all currencies converter works', () => {
      cy.get('[name="to-currency"]').select('');
      cy.get('[data-button="convert"]').click();

      cy.get('#modal').should('have.class', 'active');
      cy.get('#overlay').should('have.class', 'active');
    });
    it('makes sure the information in the header is correct', () => {
      cy.get('#amount-header').should('have.text', `${amount} ${fromCurrency}`);
      cy.get('#date-header').should('have.text', date);
    });
    it('makes sure the back button works', () => {
      cy.get('[data-button="back"]').click()
      
      cy.get('#modal').should('not.have.class', 'active');
      cy.get('#overlay').should('not.have.class', 'active');
    });
  });

  describe('handle errors', () => {
    describe('in from currency select', () => {
      it ('handles error when from currency is empty', () => {
        cy.get('[name="from-currency"]').select('');
        cy.get('[data-button="convert"]').click();
        
        cy.get('.container-select > .text-error').should('have.text', 'You must select a currency');
        cy.get('[name="from-currency"]').should('have.class', 'error');
        cy.get('.container-select').should('have.class', 'error')
        
        cy.get('[name="from-currency"]').select('USD');
      });
    });
    describe('in amount', () => {
      it('handles error when amount is empty', () => {
        cy.get('[name="amount"]').clear();
        cy.get('[data-button="convert"]').click();
        
        cy.get('.container-input > .text-error').should('have.text', 'Amount cannot be empty');
        cy.get('[name="amount"]').should('have.class', 'error');
        cy.get('.container-input').should('have.class', 'error')
      });
      it('handles error when amount is less than or equal to zero', () => {
        cy.get('[name="amount"]').type('-1');
        cy.get('[data-button="convert"]').click();
        
        cy.get('.container-input > .text-error').should('have.text', 'Amount cannot be less than or equal to zero');
        cy.get('[name="amount"]').should('have.class', 'error');
        cy.get('.container-input').should('have.class', 'error')
        
        cy.get('[name="amount"]').clear();
        cy.get('[name="amount"]').type('1');
      });
    });
    describe('in date', () => {
      it('handles error when the date is empty', () => {
        cy.get('[name="date"]').clear();
        cy.get('[data-button="convert"]').click();
        
        cy.get('.container-input > .text-error').should('have.text', 'Date cannot be empty');
        cy.get('.container-input').should('have.class', 'error');
        cy.get('[name="date"]').should('have.class', 'error');
      });
      it('handles error when the date is early than 1999-01-04', () => {
        cy.get('[name="date"]').type('1998-01-04');
        cy.get('[data-button="convert"]').click();
        
        cy.get('.container-input > .text-error').should('have.text', 'Date cannot be earlier than 1999-01-04');
        cy.get('.container-input').should('have.class', 'error');
        cy.get('[name="date"]').should('have.class', 'error');
      });
      it('handles error when the date is later than today', () => {
        cy.get('[name="date"]').type('5000-07-18');
        cy.get('[data-button="convert"]').click();
        
        cy.get('.container-input > .text-error').should('have.text', 'Date cannot be later than today');
        cy.get('.container-input').should('have.class', 'error');
        cy.get('[name="date"]').should('have.class', 'error');
      });
    });
  });
});