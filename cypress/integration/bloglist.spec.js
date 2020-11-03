describe('Blog list', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'test user',
      username: 'root',
      password: 'sekret',
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    const user2 = {
      name: 'test user2',
      username: 'root2',
      password: 'sekret2',
    };
    cy.request('POST', 'http://localhost:3003/api/users', user2);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function () {
    cy.contains('Blogs');
  });

  it('login form can be opened', function () {
    cy.contains('log in').click();
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  it('login fails with wrong password', function () {
    cy.contains('log in').click();
    cy.get('#username').type('root');
    cy.get('#password').type('wrong');
    cy.get('#login').click();

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid');

    cy.get('html').should('not.contain', 'test user logged in');
  });

  it('user can login', function () {
    cy.contains('log in').click();
    cy.get('#username').type('root');
    cy.get('#password').type('sekret');
    cy.get('#login').click();
    cy.contains('test user logged in');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'sekret' });
    });

    it('a new blog can be created, liked and deleted only by user who created it', function () {
      cy.contains('new blog').click();
      cy.get('.title').type('a blog created by cypress');
      cy.get('.author').type('cypress');
      cy.get('.url').type('http://localhost:3000');
      cy.contains('create').click();
      cy.contains('a blog created by cypress');

      cy.login({ username: 'root2', password: 'sekret2' });
      cy.contains('a blog created by cypress');
      cy.contains('view').click();
      cy.contains('likes 0');
      cy.contains('like').click();
      cy.contains('likes 1');
      cy.get('html').should('not.contain', 'delete');

      cy.login({ username: 'root', password: 'sekret' });
      cy.contains('a blog created by cypress');
      cy.contains('view').click();
      cy.contains('delete').click();
      cy.get('html').should('not.contain', 'delete');
      cy.get('html').should('not.contain', 'view');
    });

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'first blog',
          author: 'cypress',
          url: 'http://localhost:3001',
          likes: 2,
        });
        cy.createBlog({
          title: 'second blog',
          author: 'cypress',
          url: 'http://localhost:3002',
          likes: 6,
        });
        cy.createBlog({
          title: 'third blog',
          author: 'cypress',
          url: 'http://localhost:3003',
          likes: 4,
        });
      });

      it('with right order of likes', function () {
        cy.get('.blog').then((blogs) => {
          for (let blog of blogs) {
            cy.wrap(blog).contains('view').click();
          }
        });

        cy.get('.blog .likes').should((likes) => {
          expect(likes[0]).to.contain.text('6');
          expect(likes[1]).to.contain.text('4');
          expect(likes[2]).to.contain.text('2');
        });
      });
    });
  });
});
