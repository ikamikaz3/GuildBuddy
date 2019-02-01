
function up(knex) {
  return knex.schema.createTable('characters', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('race').notNullable();
    table.string('class').notNullable();
    table.integer('level').notNullable();
  });
}

function down(knex) {
  return knex.schema.dropTable('characters');
}

module.exports = {
  up,
  down,
};
