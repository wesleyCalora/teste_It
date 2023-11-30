describe('Teste de Requisição GET', () => {
  it('Deve fazer uma requisição GET/status para a API', () => {
    cy.request('GET', 'https://simple-books-api.glitch.me/status')
      .should((response) => {
        expect(response.status).to.eq(200); 
      });

      cy.request({
        method: 'GET',
        url: 'https://simple-books-api.glitch.me/rota-inexistente',
        failOnStatusCode: false 
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
  
      
      cy.request({
        method: 'GET',
        url: 'https://simple-books-api.glitch.me/rota-protegida',
        failOnStatusCode: false 
      }).then((response) => {
        expect(response.status).to.eq(401);
      });
  });

  it('Deve fazer uma requisição GET para /books com parâmetros opcionais', () => {
    const queryParams = {
      type: 'fiction', 
      limit: 10 
    };

    cy.request('GET', 'https://simple-books-api.glitch.me/books', queryParams)
      .should((response) => {
        expect(response.status).to.eq(200); 

        if (queryParams.type) {
          response.body.forEach((book) => {
            expect(book.type === queryParams.type || book.type === 'non-fiction').to.be.true;
          });
        }

        if (queryParams.limit) {
          expect(response.body).to.have.length.at.most(queryParams.limit);
        }
      });
  });

  it('Deve fazer uma requisição GET para /books/:bookId', () => {
    const bookId = 1; 

    cy.request('GET', `https://simple-books-api.glitch.me/books/${bookId}`)
      .should((response) => {
        expect(response.status).to.eq(200); 
        expect(response.body).to.have.property('id', bookId); 
      });
  });

});