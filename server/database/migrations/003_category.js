exports.up = function(knex, Promise) {
  return knex.schema.createTable("category", function(tbl) {
    tbl.increments();
    tbl.string("name").notNullable();
    tbl
      .biginteger("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .index();
  });
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTableIfExists("category")]);
};
