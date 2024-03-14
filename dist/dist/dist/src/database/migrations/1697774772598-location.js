"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location1697774772598 = void 0;
class Location1697774772598 {
    constructor() {
        this.name = 'Location1697774772598';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "borough" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, "municipality_id" integer, CONSTRAINT "UQ_a1c24ec2476c8a1c5fa409d0ee6" UNIQUE ("name"), CONSTRAINT "PK_66ca9c4115420b64ac5c18dfff9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "municipality" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, "state_id" integer, CONSTRAINT "UQ_2b5ccf3ba4eff316a528f74c08a" UNIQUE ("name"), CONSTRAINT "PK_281ad341f20df7c41b83a182e2a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "state" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, CONSTRAINT "UQ_b2c4aef5929860729007ac32f6f" UNIQUE ("name"), CONSTRAINT "PK_549ffd046ebab1336c3a8030a12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "borough" ADD CONSTRAINT "FK_b0e2e1e162158df82f888f3d459" FOREIGN KEY ("municipality_id") REFERENCES "municipality"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "municipality" ADD CONSTRAINT "FK_b0dcbb985609e74288d82260e37" FOREIGN KEY ("state_id") REFERENCES "state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "municipality" DROP CONSTRAINT "FK_b0dcbb985609e74288d82260e37"`);
        await queryRunner.query(`ALTER TABLE "borough" DROP CONSTRAINT "FK_b0e2e1e162158df82f888f3d459"`);
        await queryRunner.query(`DROP TABLE "state"`);
        await queryRunner.query(`DROP TABLE "municipality"`);
        await queryRunner.query(`DROP TABLE "borough"`);
    }
}
exports.Location1697774772598 = Location1697774772598;
//# sourceMappingURL=1697774772598-location.js.map