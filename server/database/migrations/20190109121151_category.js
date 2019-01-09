
exports.up = function(knex, Promise) {
    return knex.schema.createTable('category', function(tbl){
        tbl.increments();
        tbl.string('name');
        tbl.integer('user_id').unsigned().references('id').inTable('users').notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('category')
};
