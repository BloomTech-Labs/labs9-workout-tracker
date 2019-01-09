
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(tbl) {
        tbl.increments();
        tbl.string('name').notNullable();
        tbl.string('email').unique();
        tbl.string('phone');
        tbl.boolean('recieves_text').defaultTo(false);
        tbl.boolean('recieves_email').defaultTo(false);
        tbl.timestamps(true, true);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
  
};
