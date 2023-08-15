describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({
        title: 'A note created by cypress',
        url: 'note.com',
        author: 'Cypress'
      })
    })

    it('A blog can be created', function () {
      cy.contains('A note created by cypress')
      cy.contains('Cypress')
    })

    it('A blog can be liked', function () {
      cy.contains('view').click()
      cy.get('#like-button').click()

      cy.contains('A note created by cypress').parent().should('contain', 'likes 1')
    })

    it('A blog can be deleted', function () {
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('html').should('not.contain', 'A note created by cypress')
    })

    it.only('Blogs ordered by likes', function () {
      cy.createBlog({
        title: 'The title with the second most likes',
        url: 'blog.com/2',
        author: 'Cypress'
      })
      cy.createBlog({
        title: 'The title with the most likes',
        url: 'blog.com/1',
        author: 'Cypress'
      })
      cy.contains('The title with the most likes').contains('view').click()
      cy.contains('The title with the most likes').contains('like').click()
      cy.contains('The title with the most likes').contains('like').click()
      cy.contains('The title with the most likes').contains('like').click()
      cy.contains('The title with the most likes').contains('like').click()
      cy.contains('The title with the most likes').contains('hide').click()

      cy.contains('The title with the second most likes').contains('view').click()
      cy.contains('The title with the second most likes').contains('like').click()
      cy.contains('The title with the second most likes').contains('like').click()

      cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
      cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
    })
  })

  describe('Another user', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({
        title: 'A note created by cypress',
        url: 'note.com',
        author: 'Cypress'
      })
      cy.contains('Logout').click()
      const user = {
        name: 'root',
        username: 'root',
        password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3000')
    })

    it('can\'t see the remove option for a blog they didn\'t create', function () {
      cy.login({ username: 'root', password: 'salainen' })
      cy.contains('view').click()
      cy.get('html').should('not.contain', '#remove-button')
    })
  })
})
