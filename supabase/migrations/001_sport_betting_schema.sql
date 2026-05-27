-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Teams table
CREATE TABLE teams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    logo TEXT,
    country VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Matches table
CREATE TABLE matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    league VARCHAR(100) NOT NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    team1_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    team2_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'live', 'finished', 'cancelled')),
    team1_score INTEGER DEFAULT 0,
    team2_score INTEGER DEFAULT 0,
    winner VARCHAR(10) CHECK (winner IN ('team1', 'team2', 'draw')),
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bets table
CREATE TABLE bets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL, -- References auth.users
    match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
    bet_type VARCHAR(10) NOT NULL CHECK (bet_type IN ('team1', 'team2', 'draw')),
    amount DECIMAL(18, 6) NOT NULL CHECK (amount > 0),
    potential_win DECIMAL(18, 6) NOT NULL,
    bonus_amount DECIMAL(18, 6) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'won', 'lost', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Betting statistics table (aggregated data for performance)
CREATE TABLE betting_stats (
    match_id UUID PRIMARY KEY REFERENCES matches(id) ON DELETE CASCADE,
    team1_total_bets DECIMAL(18, 6) DEFAULT 0,
    team1_total_users INTEGER DEFAULT 0,
    team2_total_bets DECIMAL(18, 6) DEFAULT 0,
    team2_total_users INTEGER DEFAULT 0,
    draw_total_bets DECIMAL(18, 6) DEFAULT 0,
    draw_total_users INTEGER DEFAULT 0,
    total_pool DECIMAL(18, 6) DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User statistics table
CREATE TABLE user_stats (
    user_id UUID PRIMARY KEY, -- References auth.users
    total_bets INTEGER DEFAULT 0,
    total_wins INTEGER DEFAULT 0,
    total_losses INTEGER DEFAULT 0,
    total_amount_bet DECIMAL(18, 6) DEFAULT 0,
    total_amount_won DECIMAL(18, 6) DEFAULT 0,
    win_rate DECIMAL(5, 4) DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Platform statistics table (single row for global stats)
CREATE TABLE platform_stats (
    id INTEGER PRIMARY KEY DEFAULT 1,
    total_volume DECIMAL(18, 6) DEFAULT 0,
    total_earned_staking DECIMAL(18, 6) DEFAULT 0,
    total_users INTEGER DEFAULT 0,
    online_users INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT single_row CHECK (id = 1)
);

-- Insert initial platform stats row
INSERT INTO platform_stats (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Indexes for performance
CREATE INDEX idx_matches_date ON matches(date);
CREATE INDEX idx_matches_status ON matches(status);
CREATE INDEX idx_matches_featured ON matches(featured);
CREATE INDEX idx_bets_user_id ON bets(user_id);
CREATE INDEX idx_bets_match_id ON bets(match_id);
CREATE INDEX idx_bets_status ON bets(status);
CREATE INDEX idx_bets_created_at ON bets(created_at);

-- Functions to update statistics
CREATE OR REPLACE FUNCTION update_betting_stats()
RETURNS TRIGGER AS $$
BEGIN
    -- Update betting stats for the match
    INSERT INTO betting_stats (match_id)
    VALUES (NEW.match_id)
    ON CONFLICT (match_id) DO NOTHING;

    -- Recalculate stats
    UPDATE betting_stats SET
        team1_total_bets = (
            SELECT COALESCE(SUM(amount), 0)
            FROM bets
            WHERE match_id = NEW.match_id AND bet_type = 'team1' AND status = 'pending'
        ),
        team1_total_users = (
            SELECT COUNT(DISTINCT user_id)
            FROM bets
            WHERE match_id = NEW.match_id AND bet_type = 'team1' AND status = 'pending'
        ),
        team2_total_bets = (
            SELECT COALESCE(SUM(amount), 0)
            FROM bets
            WHERE match_id = NEW.match_id AND bet_type = 'team2' AND status = 'pending'
        ),
        team2_total_users = (
            SELECT COUNT(DISTINCT user_id)
            FROM bets
            WHERE match_id = NEW.match_id AND bet_type = 'team2' AND status = 'pending'
        ),
        draw_total_bets = (
            SELECT COALESCE(SUM(amount), 0)
            FROM bets
            WHERE match_id = NEW.match_id AND bet_type = 'draw' AND status = 'pending'
        ),
        draw_total_users = (
            SELECT COUNT(DISTINCT user_id)
            FROM bets
            WHERE match_id = NEW.match_id AND bet_type = 'draw' AND status = 'pending'
        ),
        total_pool = (
            SELECT COALESCE(SUM(amount), 0)
            FROM bets
            WHERE match_id = NEW.match_id AND status = 'pending'
        ),
        updated_at = NOW()
    WHERE match_id = NEW.match_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update betting stats when bets are inserted/updated
CREATE TRIGGER trigger_update_betting_stats
    AFTER INSERT OR UPDATE ON bets
    FOR EACH ROW
    EXECUTE FUNCTION update_betting_stats();

-- Function to update user stats
CREATE OR REPLACE FUNCTION update_user_stats()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert or update user stats
    INSERT INTO user_stats (user_id)
    VALUES (NEW.user_id)
    ON CONFLICT (user_id) DO NOTHING;

    -- Recalculate user stats
    UPDATE user_stats SET
        total_bets = (
            SELECT COUNT(*)
            FROM bets
            WHERE user_id = NEW.user_id
        ),
        total_wins = (
            SELECT COUNT(*)
            FROM bets
            WHERE user_id = NEW.user_id AND status = 'won'
        ),
        total_losses = (
            SELECT COUNT(*)
            FROM bets
            WHERE user_id = NEW.user_id AND status = 'lost'
        ),
        total_amount_bet = (
            SELECT COALESCE(SUM(amount), 0)
            FROM bets
            WHERE user_id = NEW.user_id
        ),
        total_amount_won = (
            SELECT COALESCE(SUM(potential_win + bonus_amount), 0)
            FROM bets
            WHERE user_id = NEW.user_id AND status = 'won'
        ),
        updated_at = NOW()
    WHERE user_id = NEW.user_id;

    -- Calculate win rate
    UPDATE user_stats SET
        win_rate = CASE
            WHEN total_bets > 0 THEN total_wins::DECIMAL / total_bets::DECIMAL
            ELSE 0
        END
    WHERE user_id = NEW.user_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update user stats
CREATE TRIGGER trigger_update_user_stats
    AFTER INSERT OR UPDATE ON bets
    FOR EACH ROW
    EXECUTE FUNCTION update_user_stats();

-- Function to update platform stats
CREATE OR REPLACE FUNCTION update_platform_stats()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE platform_stats SET
        total_volume = (
            SELECT COALESCE(SUM(amount), 0)
            FROM bets
        ),
        total_users = (
            SELECT COUNT(DISTINCT user_id)
            FROM user_stats
        ),
        updated_at = NOW()
    WHERE id = 1;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update platform stats
CREATE TRIGGER trigger_update_platform_stats
    AFTER INSERT OR UPDATE ON bets
    FOR EACH ROW
    EXECUTE FUNCTION update_platform_stats();

-- RLS (Row Level Security) policies
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE bets ENABLE ROW LEVEL SECURITY;
ALTER TABLE betting_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_stats ENABLE ROW LEVEL SECURITY;

-- Public read access for teams, matches, betting_stats, and platform_stats
CREATE POLICY "Public read access for teams" ON teams FOR SELECT USING (true);
CREATE POLICY "Public read access for matches" ON matches FOR SELECT USING (true);
CREATE POLICY "Public read access for betting_stats" ON betting_stats FOR SELECT USING (true);
CREATE POLICY "Public read access for platform_stats" ON platform_stats FOR SELECT USING (true);

-- Users can only see their own bets and stats
CREATE POLICY "Users can view their own bets" ON bets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own bets" ON bets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own bets" ON bets FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own stats" ON user_stats FOR SELECT USING (auth.uid() = user_id);

-- Admin policies (you can create an admin role later)
-- CREATE POLICY "Admins can manage all data" ON teams FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
-- CREATE POLICY "Admins can manage all data" ON matches FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
