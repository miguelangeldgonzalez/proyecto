"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateType1711375680449 = void 0;
class DateType1711375680449 {
    constructor() {
        this.name = 'DateType1711375680449';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE public.volunteer ALTER COLUMN birth_date TYPE date USING birth_date::date::date;`);
    }
    async down(queryRunner) { }
}
exports.DateType1711375680449 = DateType1711375680449;
//# sourceMappingURL=1711375680449-date_type.js.map