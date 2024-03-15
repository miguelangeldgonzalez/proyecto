"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collected1710468802009 = void 0;
class Collected1710468802009 {
    constructor() {
        this.name = 'Collected1710468802009';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "workday" ADD "total_collected" integer`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "workday" DROP COLUMN "total_collected"`);
    }
}
exports.Collected1710468802009 = Collected1710468802009;
//# sourceMappingURL=1710468802009-collected.js.map