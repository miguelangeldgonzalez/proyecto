"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEmail1701577342591 = void 0;
class UserEmail1701577342591 {
    constructor() {
        this.name = 'UserEmail1701577342591';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    }
}
exports.UserEmail1701577342591 = UserEmail1701577342591;
//# sourceMappingURL=1701577342591-user_email.js.map