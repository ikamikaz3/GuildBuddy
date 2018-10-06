exports.seed = (knex, Promise) => knex('users').del()
  .then(() => knex('users').insert({
      username: 'gBuddyUser',
      password: 'password'
    }));