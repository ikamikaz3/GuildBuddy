exports.seed = (knex, Promise) => knex('guilds').del()
  .then(() => knex('guilds').insert({
      name: 'The Land Before Time'
    }))
  .then(() => knex('guilds').insert({
      name: 'Jurassic Park'
    }))
  .then(() => knex('guilds').insert({
      name: 'Ice Age: Dawn of the Dinosaurs'
    }));
