exports.seed = (knex, Promise) => {
  return knex('guilds').del()
  .then(() => {
    return knex('guilds').insert({
      name: 'The Land Before Time'
    });
  })
  .then(() => {
    return knex('guilds').insert({
      name: 'Jurassic Park'
    });
  })
  .then(() => {
    return knex('guilds').insert({
      name: 'Ice Age: Dawn of the Dinosaurs'
    });
  });
};
