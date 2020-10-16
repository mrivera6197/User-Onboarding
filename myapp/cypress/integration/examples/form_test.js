//write tests here
describe('Quotes App', () => {

    //schedule something to happen before each test
    //navigate the browser to a given url, http://localhost:3000

    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    const nameInput = () => cy.get('input[name=name]')
    const emailInput = () => cy.get('input[name=email]')
    const passwordInput = () => cy.get('input[name=password]')
    const submitBtn = () => cy.get('#submitBtn')
    const checkbox = () => cy.get('input[type=checkbox]')
    const errors = () => cy.get('#error')

    // use the 'it' keyword for tests

    it('sanity checks', () => {
        expect(1 + 2).to.equal(3)
        expect({}).to.eql({})
        expect({}).to.not.equal({})
    })

    it('the proper elements exist', () => {
        nameInput().should('exist')
        emailInput().should('exist')
        passwordInput().should('exist')
        checkbox().should('exist')
    })

    describe('validation tests', () => {
        it('submit button is disabled', () => {
            submitBtn().should('be.disabled')
            nameInput().type('mali')
            emailInput().type('m@gmail.com')
            passwordInput().type('123456')
            checkbox().check()
            submitBtn().should('not.be.disabled')
            submitBtn().click()
        })

        it('type inside inputs', () => {
            nameInput()
                .should('have.value', '')
                .type('mali')
                .should('have.value', 'mali')
            emailInput()
                .should('have.value', '')
                .type('malirivera@gmail.com')
                .should('have.value', 'malirivera@gmail.com')
            passwordInput()
                .should('have.value', '')
                .type('******')
                .should('have.value', '******')
        })

        it('check terms of service box', () => {
            checkbox()
                .should('not.be.checked')
                .check()
                .should('be.checked')
                .uncheck()
                .should('not.be.checked')
        })

        it('user can submit the form data', () => {
            nameInput()
                .type('mali')
            emailInput()
                .type('mali@gmail.com')
            passwordInput()
                .type('123456')
            checkbox()
                .check()
            submitBtn()
                .click()

        })

        it('input left empty', () => {
            nameInput()
                .should('have.value', '')
            emailInput()
                .should('have.value', '')
            passwordInput()
                .should('have.value', '')
            checkbox()
                .should('not.be.checked')
        })

        it('form validation for empty inputs', () => {
            nameInput()
                .type('mali')
                .clear()
                errors().should('exist')
            emailInput()
                .type('m@gmail.com')
                .clear()
                errors().should('exist')
            passwordInput()
                .type('123456')
                .clear()
                errors().should('exist')
            checkbox()
                .check()
                .uncheck()
                errors().should('exist')
        })
    })


})
