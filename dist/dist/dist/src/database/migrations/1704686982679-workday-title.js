"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkdayTitle1704686982679 = void 0;
class WorkdayTitle1704686982679 {
    constructor() {
        this.name = 'WorkdayTitle1704686982679';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "workday_location" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workday_location" DROP CONSTRAINT "FK_267f3899066d32a863075c2bf19"`);
        await queryRunner.query(`ALTER TABLE "workday_location" ALTER COLUMN "borough_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workday_location" ADD CONSTRAINT "FK_267f3899066d32a863075c2bf19" FOREIGN KEY ("borough_id") REFERENCES "borough"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "workday_location" DROP CONSTRAINT "FK_267f3899066d32a863075c2bf19"`);
        await queryRunner.query(`ALTER TABLE "workday_location" ALTER COLUMN "borough_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workday_location" ADD CONSTRAINT "FK_267f3899066d32a863075c2bf19" FOREIGN KEY ("borough_id") REFERENCES "borough"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workday_location" DROP COLUMN "title"`);
    }
}
exports.WorkdayTitle1704686982679 = WorkdayTitle1704686982679;
//# sourceMappingURL=1704686982679-workday-title.js.map