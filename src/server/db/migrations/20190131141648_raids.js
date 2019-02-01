exports.up = function up (knex) {
  return knex.schema.createTable ('raids', table => {
    table.increments ();
    table.string ('name').unique ().notNullable ();
  });
};

exports.down = function down (knex) {
  return knex.schema.dropTable ('raids');
};
