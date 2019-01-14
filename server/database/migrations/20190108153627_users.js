exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", function(tbl) {
    tbl.string("id").unique().notNullable().primary();
    tbl.string("name").notNullable();
    tbl.string("email").unique();
    tbl.string("phone");
    tbl.boolean("recieves_text").defaultTo(false);
    tbl.boolean("recieves_email").defaultTo(false);
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};

// primary — column.primary([constraintName]); table.primary(columns, [constraintName])
//   When called on a single column it will set that column as the primary key for a table.
//   If you need to create a composite primary key, call it on a table with an array of column names instead.
//   Constraint name defaults to `tablename_pkey` unless `constraintName` is specified.
//   On Amazon Redshift, all columns included in a primary key must be not nullable.