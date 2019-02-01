exports.seed = knex => knex('characters').del()
  .then(() => knex('characters').insert({
    name: 'Finn',
    race: 'Undead',
    class: 'Mage',
    level: 120,
  }))
  .then(() => knex('characters').insert({
    name: 'Destro',
    race: 'Undead',
    class: 'Warlock',
    level: 120,
  }))
  .then(() => knex('characters').insert({
    name: 'Stunner',
    race: 'Blood elf',
    class: 'Paladin',
    level: 120,
  }));
