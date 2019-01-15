exports.up = function(knex, Promise) {
  return knex.schema.createTable("metrics", function(tbl) {
    tbl.increments();
    tbl.timestamps(true, true);
    tbl.decimal("weight");
    tbl.decimal("hips");
    tbl.decimal("waist");
    tbl.decimal("arm_right");
    tbl.decimal("arm_left");
    tbl.decimal("leg_right");
    tbl.decimal("leg_left");
    tbl.timestamp("date").defaultTo(knex.fn.now());
    tbl
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTableIfExists("metrics")]);
};
