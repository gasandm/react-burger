describe('service is available', function() {
    before(function() {
        cy.visit('http://localhost:3000');
    });

    it('should correct drag and drop element', function() {
        cy.wait(1000);
        cy.get('.burger-constructor_ingredientsListInner__2u2hQ>div').should('not.exist');
        cy.get('.ingredient_ingredient__3tAi7').eq(2).trigger('dragstart'); 
        cy.get('.burger-constructor_ingredientsList__3vMA4').trigger('drop');
        cy.get('.burger-constructor_ingredientsListInner__2u2hQ>div').should('exist');
    });
  });