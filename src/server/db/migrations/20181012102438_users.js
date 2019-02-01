function up (knex) {
  return knex.schema.createTable ('users', table => {
    table.increments ();
    table.string ('username').unique ().notNullable ();
    table.string ('password').notNullable ();
    table.string ('role').notNullable ();
  });
}

function down (knex) {
  return knex.schema.dropTable ('users');
}

module.exports = {
  up,
  down,
};
