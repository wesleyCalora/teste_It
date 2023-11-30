

const token = '180622be2f5cdbe7bc4bc917c2afcc5ea9aa608b0dcc3655888aedef215c0ac7';
let orderId 

describe('Teste de Envio de Pedido', () => {
  it('Deve fazer uma requisição POST para submeter um novo pedido', () => {
    
    const orderData = {
      bookId: 1, 
      customerName: 'John'
    };

    cy.request({
      method: 'POST',
      url: 'https://simple-books-api.glitch.me/orders',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: orderData
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('orderId');

      orderId = response.body.orderId;
      cy.log(`ID do pedido gerado: ${orderId}`);
      
    });
  });
  

  it('Deve fazer uma requisição GET para /orders', () => {

    cy.request({
      method: 'GET',
      url: 'https://simple-books-api.glitch.me/orders',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200); 
    });
  });

  it('Deve fazer uma requisição GET para /orders/:orderId', () => {
    
    cy.request({
      method: 'GET',
      url: `https://simple-books-api.glitch.me/orders/${orderId}`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200); 
    });
  });

  it('Deve fazer uma requisição PATCH para atualizar um pedido', () => {

    cy.log(`ID do pedido gerado do primeiro teste: ${orderId}`);
      
    const updatedData = {
      customerName: 'teste wesley'
    };

    cy.request({
      method: 'PATCH',
      url: `https://simple-books-api.glitch.me/orders/${orderId}`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: updatedData
    }).then((response) => {
      expect(response.status).to.eq(204); 
    });
  });

  it('Deve fazer uma requisição DELETE para excluir um pedido', () => {
      
    cy.log(`ID do pedido gerado no primeiro teste: ${orderId}`);
    cy.request({
      method: 'DELETE',
      url: `https://simple-books-api.glitch.me/orders/${orderId}`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(204); 
    });
  });
});