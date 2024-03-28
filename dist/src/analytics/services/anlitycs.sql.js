"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.totalVolunteers = exports.averageHasPet = exports.totalCollected = exports.averageAge = void 0;
const anlytics_constant_1 = require("../constants/anlytics.constant");
function getJoinsAndAlias(regionality) {
    let joins = '';
    let aliasSelected = '';
    switch (regionality) {
        case anlytics_constant_1.Regionalities.STATE:
            joins = `INNER JOIN state s ON s.id = m.state_id`;
            aliasSelected = 's';
        case anlytics_constant_1.Regionalities.MUNICIPALITY:
            joins = `INNER JOIN municipality m ON m.id = b.municipality_id ${joins}`;
            if (regionality === anlytics_constant_1.Regionalities.MUNICIPALITY)
                aliasSelected = 'm';
        case anlytics_constant_1.Regionalities.BOROUGH:
            joins = `INNER JOIN borough b ON b.id = wl.borough_id ${joins}`;
            if (regionality === anlytics_constant_1.Regionalities.BOROUGH)
                aliasSelected = 'b';
    }
    return { joins, aliasSelected };
}
function averageAge(regionality) {
    const { joins, aliasSelected } = getJoinsAndAlias(regionality);
    return `
        SELECT
            ${aliasSelected}.name,
            EXTRACT (YEAR FROM AGE(NOW(), timestamp without time zone '1970-01-01' + CAST(
                AVG(EXTRACT(EPOCH FROM birth_date::date)
                )::text as interval))) AS "averageAge"
        FROM volunteer v
        INNER JOIN workday_volunteer wv ON wv.volunteer_id = v.id
        INNER JOIN workday w ON w.id = wv.workday_id
        INNER JOIN workday_location wl ON w.workday_location_id = wl.id
        ${joins}
        GROUP BY ${aliasSelected}.name`;
}
exports.averageAge = averageAge;
function totalCollected(regionality) {
    const { joins, aliasSelected } = getJoinsAndAlias(regionality);
    return `
        SELECT
            ${aliasSelected}.name,
            SUM(w.total_collected) as "totalCollected"
        FROM workday w
        INNER JOIN workday_location wl ON wl.id = w.workday_location_id 
        ${joins}
        GROUP BY ${aliasSelected}.name`;
}
exports.totalCollected = totalCollected;
function averageHasPet(regionality) {
    const { joins, aliasSelected } = getJoinsAndAlias(regionality);
    return `
    SELECT 
        ${aliasSelected}.name,
        (AVG(CASE WHEN v.has_pet  = TRUE THEN 1 ELSE 0 END) * 100)::int AS "averageHasPet"
    FROM workday w 
    INNER JOIN workday_volunteer wv ON wv.workday_id = w.id 
    INNER JOIN volunteer v ON v.id = wv.volunteer_id 
    INNER JOIN workday_location wl ON wl.id = w.workday_location_id 
    ${joins}
    GROUP BY ${aliasSelected}.name`;
}
exports.averageHasPet = averageHasPet;
function totalVolunteers(regionality) {
    const { joins, aliasSelected } = getJoinsAndAlias(regionality);
    return `
    SELECT 
        ${aliasSelected}.name,
        COUNT(v.id) as "totalVolunteers"
    FROM volunteer v
    INNER JOIN workday_volunteer wv ON wv.volunteer_id = v.id
    INNER JOIN workday w ON w.id = wv.workday_id
    INNER JOIN workday_location wl ON w.workday_location_id = wl.id
    ${joins}
    GROUP BY ${aliasSelected}.name`;
}
exports.totalVolunteers = totalVolunteers;
//# sourceMappingURL=anlitycs.sql.js.map