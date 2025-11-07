-- Don Pépé Services Database Schema

-- Cars table
CREATE TABLE IF NOT EXISTS cars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INTEGER NOT NULL,
  price DECIMAL(12, 2) NOT NULL,
  engine VARCHAR(100),
  color VARCHAR(50),
  transmission VARCHAR(50),
  description TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Properties table
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  price DECIMAL(12, 2) NOT NULL,
  bedrooms INTEGER,
  bathrooms INTEGER,
  area DECIMAL(10, 2),
  description TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Concierge services table
CREATE TABLE IF NOT EXISTS concierge_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Site settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE concierge_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Public can read cars" ON cars FOR SELECT USING (true);
CREATE POLICY "Public can read properties" ON properties FOR SELECT USING (true);
CREATE POLICY "Public can read concierge services" ON concierge_services FOR SELECT USING (true);
CREATE POLICY "Public can read site settings" ON site_settings FOR SELECT USING (true);

-- Admin write access policies (authenticated service role only)
CREATE POLICY "Service role can insert cars" ON cars FOR INSERT WITH CHECK (auth.jwt()->>'role' = 'service_role');
CREATE POLICY "Service role can update cars" ON cars FOR UPDATE USING (auth.jwt()->>'role' = 'service_role');
CREATE POLICY "Service role can delete cars" ON cars FOR DELETE USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Service role can insert properties" ON properties FOR INSERT WITH CHECK (auth.jwt()->>'role' = 'service_role');
CREATE POLICY "Service role can update properties" ON properties FOR UPDATE USING (auth.jwt()->>'role' = 'service_role');
CREATE POLICY "Service role can delete properties" ON properties FOR DELETE USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Service role can insert concierge services" ON concierge_services FOR INSERT WITH CHECK (auth.jwt()->>'role' = 'service_role');
CREATE POLICY "Service role can update concierge services" ON concierge_services FOR UPDATE USING (auth.jwt()->>'role' = 'service_role');
CREATE POLICY "Service role can delete concierge services" ON concierge_services FOR DELETE USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Service role can insert site settings" ON site_settings FOR INSERT WITH CHECK (auth.jwt()->>'role' = 'service_role');
CREATE POLICY "Service role can update site settings" ON site_settings FOR UPDATE USING (auth.jwt()->>'role' = 'service_role');
CREATE POLICY "Service role can delete site settings" ON site_settings FOR DELETE USING (auth.jwt()->>'role' = 'service_role');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers to update updated_at
CREATE TRIGGER update_cars_updated_at BEFORE UPDATE ON cars FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_concierge_services_updated_at BEFORE UPDATE ON concierge_services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
