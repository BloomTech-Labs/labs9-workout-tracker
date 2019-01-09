
exports.up = function(knex, Promise) {
  return knex.schema.createTable('exercises', function(tbl) {
    tbl.increments()
    tbl.integer('workout_id').unsigned().references('id').inTable('workouts').notNullable();
    tbl.string('name')
    tbl.integer('weight')
    tbl.integer('sets')
    tbl.integer('reps')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('exercises')
};
