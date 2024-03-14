"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkdayNull1705806465008 = void 0;
class WorkdayNull1705806465008 {
    constructor() {
        this.name = 'WorkdayNull1705806465008';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "workday" DROP CONSTRAINT "FK_6387280b4c9e9810106ab58a2e8"`);
        await queryRunner.query(`ALTER TABLE "workday" ALTER COLUMN "workday_location_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workday" ADD CONSTRAINT "FK_6387280b4c9e9810106ab58a2e8" FOREIGN KEY ("workday_location_id") REFERENCES "workday_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "workday" DROP CONSTRAINT "FK_6387280b4c9e9810106ab58a2e8"`);
        await queryRunner.query(`ALTER TABLE "workday" ALTER COLUMN "workday_location_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workday" ADD CONSTRAINT "FK_6387280b4c9e9810106ab58a2e8" FOREIGN KEY ("workday_location_id") REFERENCES "workday_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.WorkdayNull1705806465008 = WorkdayNull1705806465008;
//# sourceMappingURL=1705806465008-workday-null.js.map