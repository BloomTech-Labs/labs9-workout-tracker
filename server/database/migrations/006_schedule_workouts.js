exports.up = function(knex, Promise) {
  return knex.schema.createTable("schedule_workouts", function(tbl) {
    tbl.increments();
    tbl.date("date");
    tbl.boolean("completed").defaultTo(false);
    tbl.integer("percentage").defaultTo(0);
    tbl.string("title");
    tbl
      .integer("category_id")
      .unsigned()
      .references("id")
      .inTable("category");
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
  return Promise.all([knex.schema.dropTableIfExists("schedule_workouts")]);
};
