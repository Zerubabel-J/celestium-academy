-- Insert sample teams
INSERT INTO teams (id, name, logo, country) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Chelsea', '/sport-betting/teams/chelsea.png', 'England'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Barcelona', '/sport-betting/teams/barcelona.png', 'Spain'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Islam Makhachev', '/sport-betting/fighters/makhachev.png', 'Russia'),
  ('550e8400-e29b-41d4-a716-446655440004', 'Conor McGregor', '/sport-betting/fighters/mcgregor.png', 'Ireland'),
  ('550e8400-e29b-41d4-a716-446655440005', 'Real Madrid', '/sport-betting/teams/real-madrid.png', 'Spain'),
  ('550e8400-e29b-41d4-a716-446655440006', 'Manchester City', '/sport-betting/teams/man-city.png', 'England');

-- Insert sample matches
INSERT INTO matches (id, league, date, team1_id, team2_id, featured, status) VALUES
  (
    '550e8400-e29b-41d4-a716-446655440101',
    'UFC 249',
    '2024-12-15 04:00:00+00',
    '550e8400-e29b-41d4-a716-446655440003',
    '550e8400-e29b-41d4-a716-446655440004',
    true,
    'upcoming'
  ),
  (
    '550e8400-e29b-41d4-a716-446655440102',
    'LA LIGA',
    '2024-12-10 19:00:00+00',
    '550e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440002',
    false,
    'upcoming'
  ),
  (
    '550e8400-e29b-41d4-a716-446655440103',
    'LA LIGA',
    '2024-12-12 20:00:00+00',
    '550e8400-e29b-41d4-a716-446655440005',
    '550e8400-e29b-41d4-a716-446655440006',
    false,
    'upcoming'
  );

-- Insert sample betting stats
INSERT INTO betting_stats (match_id, team1_total_bets, team1_total_users, team2_total_bets, team2_total_users, total_pool) VALUES
  ('550e8400-e29b-41d4-a716-446655440101', 0, 0, 1200, 1, 1200),
  ('550e8400-e29b-41d4-a716-446655440102', 0, 0, 1200, 1, 1200),
  ('550e8400-e29b-41d4-a716-446655440103', 500, 2, 800, 3, 1300);

-- Update platform stats with sample data
UPDATE platform_stats SET
  total_volume = 4500000,
  total_earned_staking = 4500000,
  total_users = 862165,
  online_users = 10256
WHERE id = 1;
