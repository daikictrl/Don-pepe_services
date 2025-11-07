import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function setupDatabase() {
  console.log('🔧 Setting up Supabase database schema...\n');

  try {
    console.log('📦 Creating cars table...');
    const { error: carsError } = await supabase.rpc('exec_sql', {
      sql: `
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
      `
    });
    if (carsError && !carsError.message.includes('already exists')) {
      console.error('Error creating cars table:', carsError);
    } else {
      console.log('✅ Cars table ready');
    }

    console.log('📦 Creating properties table...');
    const { error: propertiesError } = await supabase.rpc('exec_sql', {
      sql: `
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
      `
    });
    if (propertiesError && !propertiesError.message.includes('already exists')) {
      console.error('Error creating properties table:', propertiesError);
    } else {
      console.log('✅ Properties table ready');
    }

    console.log('📦 Creating concierge_services table...');
    const { error: conciergeError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS concierge_services (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name VARCHAR(255) NOT NULL,
          description TEXT,
          icon VARCHAR(50),
          enabled BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });
    if (conciergeError && !conciergeError.message.includes('already exists')) {
      console.error('Error creating concierge_services table:', conciergeError);
    } else {
      console.log('✅ Concierge services table ready');
    }

    console.log('📦 Creating site_settings table...');
    const { error: settingsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS site_settings (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          key VARCHAR(100) UNIQUE NOT NULL,
          value JSONB,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });
    if (settingsError && !settingsError.message.includes('already exists')) {
      console.error('Error creating site_settings table:', settingsError);
    } else {
      console.log('✅ Site settings table ready');
    }

    console.log('\n✅ Database schema setup complete!');
    console.log('\n📝 Next steps:');
    console.log('   1. Go to your Supabase dashboard: https://app.supabase.com/project/kdmrtgayjfgjketrezif/editor');
    console.log('   2. Run the SQL from supabase-schema.sql to set up RLS policies');
    console.log('   3. Create a storage bucket named "images" for file uploads');
    console.log('   4. Run the migration script to transfer localStorage data');

  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();
