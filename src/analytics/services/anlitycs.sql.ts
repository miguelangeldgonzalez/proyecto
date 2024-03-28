import { Regionalities } from "../constants/anlytics.constant";

/**
 * Get the joins and alias to complete the query
 * @param regionality 
 * @returns 
 */
function getJoinsAndAlias(regionality: Regionalities): { joins: string, aliasSelected: string } {
    let joins = '';
    let aliasSelected = '';
    
    switch (regionality) {
        case Regionalities.STATE:
            joins = `INNER JOIN state s ON s.id = m.state_id`;
            aliasSelected = 's';

        case Regionalities.MUNICIPALITY: 
            joins = `INNER JOIN municipality m ON m.id = b.municipality_id ${joins}`;
            if (regionality === Regionalities.MUNICIPALITY) aliasSelected = 'm';

        case Regionalities.BOROUGH: 
            joins = `INNER JOIN borough b ON b.id = wl.borough_id ${joins}`; 
            if (regionality === Regionalities.BOROUGH) aliasSelected = 'b';
    }

    return { joins, aliasSelected };
}

/**
 * Returns the sql to get the average age of volunteers by regionality
 * @param regionality 
 * @returns 
 */
export function averageAge(regionality: Regionalities): string {
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

export function totalCollected(regionality: Regionalities): string {
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

export function averageHasPet(regionality): string {
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

export function totalVolunteers(regionality: Regionalities): string {
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