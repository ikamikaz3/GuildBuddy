
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("guilds").del()
    .then(function () {
      // Inserts seed entries
      return knex("guilds").insert([
        {id: 1, name: "Garrosh Did Nothin Wrong"},
        {id: 2, name: "Guldan Stole My Bike"}
      ]);
    });
};
