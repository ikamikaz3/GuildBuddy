function up(knex) {
  return knex.schema.createTable('guilds', (table) => {
    table.increments();
    table.string('name').notNullable().unique();
  });
}

function down(knex) {
  return knex.schema.dropTable('guilds');
}

module.exports = {
  up,
  down,
};
