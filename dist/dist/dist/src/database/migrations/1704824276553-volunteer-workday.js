"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VolunteerWorkday1704824276553 = void 0;
class VolunteerWorkday1704824276553 {
    constructor() {
        this.name = 'VolunteerWorkday1704824276553';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "workday_volunteer" ("workday_id" integer NOT NULL, "volunteer_id" integer NOT NULL, CONSTRAINT "PK_f54a0fec65dacbeaf7947a94820" PRIMARY KEY ("workday_id", "volunteer_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1c83ed9def98378988aec2f157" ON "workday_volunteer" ("workday_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_3230d76c1b839787b4aa8ff0eb" ON "workday_volunteer" ("volunteer_id") `);
        await queryRunner.query(`ALTER TABLE "workday_volunteer" ADD CONSTRAINT "FK_1c83ed9def98378988aec2f157c" FOREIGN KEY ("workday_id") REFERENCES "workday"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "workday_volunteer" ADD CONSTRAINT "FK_3230d76c1b839787b4aa8ff0eb4" FOREIGN KEY ("volunteer_id") REFERENCES "volunteer"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "workday_volunteer" DROP CONSTRAINT "FK_3230d76c1b839787b4aa8ff0eb4"`);
        await queryRunner.query(`ALTER TABLE "workday_volunteer" DROP CONSTRAINT "FK_1c83ed9def98378988aec2f157c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3230d76c1b839787b4aa8ff0eb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1c83ed9def98378988aec2f157"`);
        await queryRunner.query(`DROP TABLE "workday_volunteer"`);
    }
}
exports.VolunteerWorkday1704824276553 = VolunteerWorkday1704824276553;
//# sourceMappingURL=1704824276553-volunteer-workday.js.map