exports.up = function(knex, Promise) {
  return knex.schema.createTable("schedule_exercises", function(tbl) {
    tbl.increments();
    tbl
      .biginteger("schedule_workout_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("schedule_workouts")
      .onDelete("CASCADE")
      .index();
    tbl.string("name");
    tbl.integer("weight");
    tbl.integer("sets");
    tbl.integer("reps");
    tbl.boolean("completed").defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTableIfExists("schedule_exercises")]);
};
