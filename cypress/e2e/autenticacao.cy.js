describe('Teste de Registro do Cliente na API', () => {
  it('Deve registrar o cliente e obter um token de acesso', () => {
    const clientData = {
      clientName: 'wesley lubero',
      clientEmail: 'wesleyluberro@gmail.com'
    };

    cy.request({
      method: 'POST',
      url: 'https://simple-books-api.glitch.me/api-clients/',
      headers: {
        'Content-Type': 'application/json'
      },
      body: clientData
    }).then((response) => {
      expect(response.status).to.eq(201); 
      expect(response.body).to.have.property('accessToken'); 
      const accessToken = response.body.accessToken;
      cy.log(`Token de Acesso: ${accessToken}`);
    });
  });
});