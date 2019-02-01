exports.seed = knex =>
  knex ('users')
    .del ()
    .then (() =>
      knex ('users').insert ({
        username: 'gBuddyUser',
        password: 'password',
        role: 'user',
      })
    )
    .then (() =>
      knex ('users').insert ({
        username: 'adminUser',
        password: 'password',
        role: 'admin',
      })
    );
