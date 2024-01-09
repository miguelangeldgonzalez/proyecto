"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timestamps1704655169185 = void 0;
class Timestamps1704655169185 {
    constructor() {
        this.name = 'Timestamps1704655169185';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "workday" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "workday" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "workday" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "workday_location" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "workday_location" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "workday_location" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "user" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "volunteer" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "volunteer" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "volunteer" ADD "deleted_at" TIMESTAMP`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "volunteer" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "volunteer" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "volunteer" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "workday_location" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "workday_location" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "workday_location" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "workday" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "workday" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "workday" DROP COLUMN "created_at"`);
    }
}
exports.Timestamps1704655169185 = Timestamps1704655169185;
//# sourceMappingURL=1704655169185-timestamps.js.map