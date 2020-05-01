describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Root User',
      username: 'root',
      password: 'bing2dabong'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)

    const baduser = {
      name: 'Bad User',
      username: 'baduser',
      password: 'honeypot'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', baduser)

    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function () {
    cy.contains('Log In')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('bing2dabong')
      cy.get('#login-button').click()
      cy.contains('blogs')
    })
    it('fails with wrong credentials', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('bong2dabing')
      cy.get('#login-button').click()
      cy.get('.error').contains('Wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'bing2dabong' })
    })

    it('a blog can be created', function () {
      cy.get('#show-blog-form-button').click()
      cy.get('#title').type('Deep Dive Into Modern Web Development')
      cy.get('#url').type('https://fullstackopen.com/en/')
      cy.get('#author').type('Matti Luukkainen')
      cy.get('#submit-blog-button').click()
      cy.get('.blog').contains('Deep Dive Into Modern Web Development')
    })

    describe('with a blog on the site', function () {
      beforeEach(function () {
        cy.addBlog({
          title: 'Deep Dive Into Modern Web Development',
          url: 'https://fullstackopen.com/en/',
          author: 'Matti Luukkainen'
        })
      })

      it('a blog can be liked', function () {
        cy.contains('Deep Dive Into Modern Web Development').parent().find('.toggle-visible-button').click()
        cy.contains('Deep Dive Into Modern Web Development').parent().find('.likes-div').contains('0')
        cy.contains('Deep Dive Into Modern Web Development').parent().find('.like-button').click()
        cy.contains('Deep Dive Into Modern Web Development').parent().find('.likes-div').contains('1')
      })

      it('a blog can be deleted', function () {
        cy.contains('Deep Dive Into Modern Web Development').parent().find('.toggle-visible-button').click()
        cy.contains('Deep Dive Into Modern Web Development').parent().find('.delete-button').click()
        cy.get('.blog').should('not.contain', 'Deep Dive Into Modern Web Development')
      })

      it('a blog cannot be deleted if user switches', function () {
        cy.get('#logout-button').click()

        cy.login({ username: 'baduser', password: 'honeypot' })
        cy.contains('Deep Dive Into Modern Web Development').parent().find('.toggle-visible-button').click()
        cy.contains('Deep Dive Into Modern Web Development').parent().should('not.have.id', '.delete-button')

        cy.get('.blog').should('contain', 'Deep Dive Into Modern Web Development')
      })
    })

    describe('with multiple blogs on the site', function () {
      const blog1 = {
        title: 'Deep Dive Into Modern Web Development',
        url: 'https://fullstackopen.com/en/',
        author: 'Matti Luukkainen',
        likes: Math.floor(Math.random() * 100)
      }
      const blog2 = {
        title: 'Professor Frisby\'s Mostlye Adequate Guide to Functional Programming',
        url: 'https://mostly-adequate.gitbooks.io/mostly-adequate-guide/',
        author: 'Professor Frisby',
        likes: Math.floor(Math.random() * 100)
      }
      const blog3 = {
        title: 'Running on Emptiness',
        url: 'https://theanarchistlibrary.org/library/john-zerzan-running-on-emptiness-the-failure-of-symbolic-thought',
        author: 'John Zerzan',
        likes: Math.floor(Math.random() * 100)
      }
      const blogArray = [blog1, blog2, blog3]
      beforeEach(function () {
        cy.addBlog(blog1)
        cy.addBlog(blog2)
        cy.addBlog(blog3)
      })

      it('is sorted by likes', function () {
        const sortedBlogArray = [...blogArray].sort((a, b) => b.likes - a.likes)
        //cy.get('.blog').should('contain', 'Running on Emptiness')
        cy.get('.blog:first').should('contain', sortedBlogArray[0].title)
        cy.get('.blog:last').should('contain', sortedBlogArray[2].title)
        cy.get('.blog:last').should('not.contain', sortedBlogArray[1].title)
      })
    })
  })
})