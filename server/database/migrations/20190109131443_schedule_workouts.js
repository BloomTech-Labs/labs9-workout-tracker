
exports.up = function(knex, Promise) {
  return knex.schema.createTable('schedule_workouts', function(tbl) {
    tbl.increments()
    tbl.date('date')
    tbl.boolean('completed').defaultTo(false)
    tbl.integer('percentage').defaultTo(0)
    tbl.string('title')
    tbl.integer('category_id').unsigned().references('id').inTable('category').notNullable();
    tbl.integer('user_id').unsigned().references('id').inTable('users').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('schedule_workouts')
};
