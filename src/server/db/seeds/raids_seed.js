exports.seed = knex =>
  knex ('raids')
    .del ()
    .then (() => knex ('raids').insert ({name: 'The Sunwell Plateau'}))
    .then (() => knex ('raids').insert ({name: 'The Black Temple'}));
