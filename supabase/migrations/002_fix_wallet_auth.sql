CREATE TABLE IF NOT EXISTS app_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet_address VARCHAR(42) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_app_users_wallet_address ON app_users(wallet_address);

CREATE OR REPLACE FUNCTION get_or_create_user(wallet_addr TEXT)
RETURNS UUID AS $$
DECLARE
    user_uuid UUID;
BEGIN
    wallet_addr := LOWER(wallet_addr);
    
    SELECT id INTO user_uuid
    FROM app_users
    WHERE wallet_address = wallet_addr;
    
    IF user_uuid IS NULL THEN
        INSERT INTO app_users (wallet_address)
        VALUES (wallet_addr)
        RETURNING id INTO user_uuid;
    END IF;
    
    RETURN user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP POLICY IF EXISTS "Users can view their own bets" ON bets;
DROP POLICY IF EXISTS "Users can insert their own bets" ON bets;
DROP POLICY IF EXISTS "Users can update their own bets" ON bets;
DROP POLICY IF EXISTS "Users can view their own stats" ON user_stats;

CREATE POLICY "Allow all bets operations" ON bets FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all user_stats operations" ON user_stats FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE app_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for app_users" ON app_users FOR SELECT USING (true);

