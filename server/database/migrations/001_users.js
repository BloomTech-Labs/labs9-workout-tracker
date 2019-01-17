exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", function(tbl) {
    tbl.increments();
    tbl.string("uid").unique();
    tbl.string("name").notNullable();
    tbl.string("email").unique();
    tbl.string("phone");
    tbl.boolean("recieves_text").defaultTo(false);
    tbl.boolean("recieves_email").defaultTo(false);
    tbl.timestamps(true, true);
    tbl.boolean("premium").defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTableIfExists("users")]);
};
