"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workday1698114665384 = void 0;
class Workday1698114665384 {
    constructor() {
        this.name = 'Workday1698114665384';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "media_type" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "PK_42a5f58b69908435e57eac82216" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "external_assistance" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "PK_acda90129a68f3b311f06dfcec4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workday" ("id" SERIAL NOT NULL, "start_time" TIMESTAMP NOT NULL, "end_time" TIMESTAMP NOT NULL, "media_description" character varying, "external_assistance_description" character varying, "total_external_assistance" integer, "workday_location_id" integer, CONSTRAINT "PK_2c3ec5e170006831ea06875ae3d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workday_location" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "locationUrl" character varying NOT NULL, "borough_id" integer, CONSTRAINT "PK_4939168969b7dc45f0e3bab3e5f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "role_id" integer, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permission" ("id" SERIAL NOT NULL, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "volunteer" ("id" SERIAL NOT NULL, "identification" integer NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "has_pet" boolean NOT NULL, "birth_date" TIMESTAMP NOT NULL, "borough_id" integer, CONSTRAINT "UQ_6829b501f22842ca607985bdecd" UNIQUE ("identification"), CONSTRAINT "UQ_0cd0dae369207b0fc7f884d1924" UNIQUE ("birth_date"), CONSTRAINT "PK_76924da1998b3e07025e04c4d3c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workday_media_type" ("workday_id" integer NOT NULL, "media_type_id" integer NOT NULL, CONSTRAINT "PK_29c8a8733096a23edf8e830c107" PRIMARY KEY ("workday_id", "media_type_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3003ea593d3e29609147357917" ON "workday_media_type" ("workday_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_6b807a2cda69bb191296d10b53" ON "workday_media_type" ("media_type_id") `);
        await queryRunner.query(`CREATE TABLE "workday_external_assistance" ("workday_id" integer NOT NULL, "external_assistance_id" integer NOT NULL, CONSTRAINT "PK_6205826934f5085a4a9104a56ed" PRIMARY KEY ("workday_id", "external_assistance_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1cc95d5e08671e9e26dd105bf2" ON "workday_external_assistance" ("workday_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_5941f203463d763af868595944" ON "workday_external_assistance" ("external_assistance_id") `);
        await queryRunner.query(`CREATE TABLE "user_state" ("user_id" integer NOT NULL, "state_id" integer NOT NULL, CONSTRAINT "PK_a151cd0808652703dee9fde1515" PRIMARY KEY ("user_id", "state_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_37ce04acc330443acbc020f77b" ON "user_state" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_a20253882e0c30a148f3d65fa7" ON "user_state" ("state_id") `);
        await queryRunner.query(`CREATE TABLE "role_permission" ("role_id" integer NOT NULL, "permission_id" integer NOT NULL, CONSTRAINT "PK_19a94c31d4960ded0dcd0397759" PRIMARY KEY ("role_id", "permission_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3d0a7155eafd75ddba5a701336" ON "role_permission" ("role_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e3a3ba47b7ca00fd23be4ebd6c" ON "role_permission" ("permission_id") `);
        await queryRunner.query(`ALTER TABLE "workday" ADD CONSTRAINT "FK_6387280b4c9e9810106ab58a2e8" FOREIGN KEY ("workday_location_id") REFERENCES "workday_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workday_location" ADD CONSTRAINT "FK_267f3899066d32a863075c2bf19" FOREIGN KEY ("borough_id") REFERENCES "borough"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "volunteer" ADD CONSTRAINT "FK_704ee93ba0ea97a68346262b72c" FOREIGN KEY ("borough_id") REFERENCES "borough"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workday_media_type" ADD CONSTRAINT "FK_3003ea593d3e296091473579177" FOREIGN KEY ("workday_id") REFERENCES "workday"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "workday_media_type" ADD CONSTRAINT "FK_6b807a2cda69bb191296d10b530" FOREIGN KEY ("media_type_id") REFERENCES "media_type"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "workday_external_assistance" ADD CONSTRAINT "FK_1cc95d5e08671e9e26dd105bf29" FOREIGN KEY ("workday_id") REFERENCES "workday"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "workday_external_assistance" ADD CONSTRAINT "FK_5941f203463d763af8685959449" FOREIGN KEY ("external_assistance_id") REFERENCES "external_assistance"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_state" ADD CONSTRAINT "FK_37ce04acc330443acbc020f77bd" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_state" ADD CONSTRAINT "FK_a20253882e0c30a148f3d65fa7f" FOREIGN KEY ("state_id") REFERENCES "state"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "FK_3d0a7155eafd75ddba5a7013368" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "FK_e3a3ba47b7ca00fd23be4ebd6cf" FOREIGN KEY ("permission_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "FK_e3a3ba47b7ca00fd23be4ebd6cf"`);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "FK_3d0a7155eafd75ddba5a7013368"`);
        await queryRunner.query(`ALTER TABLE "user_state" DROP CONSTRAINT "FK_a20253882e0c30a148f3d65fa7f"`);
        await queryRunner.query(`ALTER TABLE "user_state" DROP CONSTRAINT "FK_37ce04acc330443acbc020f77bd"`);
        await queryRunner.query(`ALTER TABLE "workday_external_assistance" DROP CONSTRAINT "FK_5941f203463d763af8685959449"`);
        await queryRunner.query(`ALTER TABLE "workday_external_assistance" DROP CONSTRAINT "FK_1cc95d5e08671e9e26dd105bf29"`);
        await queryRunner.query(`ALTER TABLE "workday_media_type" DROP CONSTRAINT "FK_6b807a2cda69bb191296d10b530"`);
        await queryRunner.query(`ALTER TABLE "workday_media_type" DROP CONSTRAINT "FK_3003ea593d3e296091473579177"`);
        await queryRunner.query(`ALTER TABLE "volunteer" DROP CONSTRAINT "FK_704ee93ba0ea97a68346262b72c"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"`);
        await queryRunner.query(`ALTER TABLE "workday_location" DROP CONSTRAINT "FK_267f3899066d32a863075c2bf19"`);
        await queryRunner.query(`ALTER TABLE "workday" DROP CONSTRAINT "FK_6387280b4c9e9810106ab58a2e8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e3a3ba47b7ca00fd23be4ebd6c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3d0a7155eafd75ddba5a701336"`);
        await queryRunner.query(`DROP TABLE "role_permission"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a20253882e0c30a148f3d65fa7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_37ce04acc330443acbc020f77b"`);
        await queryRunner.query(`DROP TABLE "user_state"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5941f203463d763af868595944"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1cc95d5e08671e9e26dd105bf2"`);
        await queryRunner.query(`DROP TABLE "workday_external_assistance"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6b807a2cda69bb191296d10b53"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3003ea593d3e29609147357917"`);
        await queryRunner.query(`DROP TABLE "workday_media_type"`);
        await queryRunner.query(`DROP TABLE "volunteer"`);
        await queryRunner.query(`DROP TABLE "permission"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "workday_location"`);
        await queryRunner.query(`DROP TABLE "workday"`);
        await queryRunner.query(`DROP TABLE "external_assistance"`);
        await queryRunner.query(`DROP TABLE "media_type"`);
    }
}
exports.Workday1698114665384 = Workday1698114665384;
//# sourceMappingURL=1698114665384-workday.js.map