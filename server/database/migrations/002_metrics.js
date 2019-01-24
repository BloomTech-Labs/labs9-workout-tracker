exports.up = function(knex, Promise) {
  return knex.schema.createTable("metrics", function(tbl) {
    tbl.increments();
    tbl.decimal("weight");
    tbl.decimal("hips");
    tbl.decimal("waist");
    tbl.decimal("arm_right");
    tbl.decimal("arm_left");
    tbl.decimal("leg_right");
    tbl.decimal("leg_left");
    tbl.date("date").notNullable();
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
  return Promise.all([knex.schema.dropTableIfExists("metrics")]);
};
