
exports.up = function(knex, Promise) {
  return knex.schema.createTable('schedule_workouts', function(tbl) {
    tbl.increments()
    tbl.date('date')
    tbl.boolean('completed').defaultTo(false)
    tbl.integer('workout_id').unsigned().references('id').inTable('workouts').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('schedule_workouts')
};
