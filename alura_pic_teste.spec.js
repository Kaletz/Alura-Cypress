describe ('Login e Registro de Usuário no Alura Pic', () => {

    beforeEach(()=> {
        cy.visit('/'); //"alura-fotos.herokuapp.com" no cypress.json
        //cy.intercept('POST','https://apialurapic.herokuapp.com/user/login', {
        //    statusCode: 400
        //}).as('stubPost')
    })
    it('verifica mensagens de validação', () =>{
        cy.contains('a','Register now').click();
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Email is required!').should('be.visible');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Full name is required!').should('be.visible');
        cy.contains('ap-vmessage', 'User name is required!').should('be.visible');
        cy.contains('ap-vmessage', 'Password is required!').should('be.visible');
    })

    it('verifica mensagens de email invalido', () =>{
        cy.contains('a','Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="email"]').type('joão');
        cy.contains('ap-vmessage', 'Invalid e-mail').should('be.visible');
 
    })
    it('verifica mensagens de senha menor de 8 caracteres', () =>{
        cy.contains('a','Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="password"]').type('64');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Mininum length is 8').should('be.visible');
 
    })

    it('verifica mensagens se o usuário está em lowercase', () =>{
        cy.contains('a','Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="userName"]').type('João');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Must be lower case').should('be.visible');
 
    })

    it('verifica login de um usuário inválido', () =>{
        cy.login('joão','64');
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Invalid user name or password');
        })
    })

    it('verifica login de um usuário válido', () =>{
        cy.login(Cypress.env('userName'),Cypress.env('password')); //'flavio','131'
        //cy.wait('@stubPost');
        cy.contains('a', '(Logout)').should('be.visible');
    })
    // Os testes deveriam ser organizados para melhor discretizar sobre questões distintas: registor,login, verificação, etc
    
    //it('registra um novo usuário', () =>{     //essa iteração seria para a utilização de JSONs para facilitar o teste de multiplicidade 
    //    cy.register('joão@alura','João Pedro', 'joaop', '164');
    //})
})