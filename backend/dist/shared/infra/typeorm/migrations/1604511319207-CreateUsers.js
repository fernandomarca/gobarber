"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateUsers1604511319207 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "users",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true,
        generationStrategy: "uuid",
        default: "uuid_generate_v4()"
      }, {
        name: "name",
        type: "varchar",
        isNullable: false
      }, {
        name: "email",
        type: "varchar",
        isUnique: true
      }, {
        name: "password",
        type: "varchar"
      }, {
        name: "created_at",
        type: "timestamp with time zone",
        default: 'now()'
      }, {
        name: "updated_at",
        type: "timestamp with time zone",
        default: "now()"
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("users");
  }

}

exports.default = CreateUsers1604511319207;