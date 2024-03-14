"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordNullable1701628058366 = void 0;
class PasswordNullable1701628058366 {
    constructor() {
        this.name = 'PasswordNullable1701628058366';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
    }
}
exports.PasswordNullable1701628058366 = PasswordNullable1701628058366;
//# sourceMappingURL=1701628058366-password_nullable.js.map