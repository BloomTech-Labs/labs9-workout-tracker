
exports.up = function(knex, Promise) {
    return knex.schema.createTable('workouts', function(tbl){
        tbl.increments();
        tbl.integer('user_id').unsigned().references('id').inTable('users').notNullable();
        tbl.integer('category_id').unsigned().references('id').inTable('category').notNullable();
        tbl.string('title');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('workouts')
};
