exports.up = function(knex, Promise) {
  return knex.schema.createTable("schedule_exercises", function(tbl) {
    tbl.increments();
    tbl
      .integer("schedule_workout_id")
      .unsigned()
      .references("id")
      .inTable("schedule_workouts")
      .notNullable();
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
