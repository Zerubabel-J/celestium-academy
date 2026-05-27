SELECT 
    id,
    league,
    date,
    status,
    featured,
    team1_id,
    team2_id,
    CASE 
        WHEN date > NOW() THEN 'Future'
        WHEN date <= NOW() AND status = 'upcoming' THEN 'Past but still upcoming (NEEDS FIX)'
        WHEN date <= NOW() AND status != 'upcoming' THEN 'Past and closed'
        ELSE 'Unknown'
    END as date_status,
    NOW() as current_time,
    date - NOW() as time_until_match
FROM matches
ORDER BY date DESC;

SELECT 
    id,
    league,
    date,
    status,
    featured,
    date - NOW() as time_diff,
    CASE 
        WHEN date <= NOW() THEN 'This match date is in the past!'
        ELSE 'OK'
    END as warning
FROM matches
WHERE status = 'upcoming' AND date <= NOW()
ORDER BY date DESC;

UPDATE matches
SET 
    date = NOW() + INTERVAL '24 hours',
    updated_at = NOW()
WHERE status = 'upcoming' AND date <= NOW()
RETURNING id, league, date, status;

SELECT id, name FROM teams LIMIT 5;

UPDATE matches
SET 
    date = GREATEST(date, NOW() + INTERVAL '1 hour'),
    updated_at = NOW()
WHERE status = 'upcoming'
RETURNING id, league, date, status;

