# Supabase Database Setup Guide

## Step 1: Access Your Supabase Project

1. Go to: https://app.supabase.com/project/kdmrtgayjfgjketrezif
2. Click on the **SQL Editor** in the left sidebar

## Step 2: Create Database Tables

Copy and paste the entire contents of `supabase-schema.sql` into the SQL Editor and click **Run**.

This will create:
- `cars` table
- `properties` table  
- `concierge_services` table
- `site_settings` table
- Row Level Security (RLS) policies for public read and admin write access
- Automatic `updated_at` timestamp triggers

## Step 3: Create Storage Bucket for Images

1. Go to **Storage** in the left sidebar
2. Click **New bucket**
3. Bucket name: `images`
4. Make it **Public**
5. Click **Create bucket**

## Step 4: Set Storage Bucket Policies

1. Click on the `images` bucket
2. Go to **Policies** tab
3. Click **New policy**
4. Select **For full customization**
5. Policy name: `Public read access`
6. Allowed operation: SELECT
7. Policy definition: `true`
8. Click **Review** then **Save policy**

9. Click **New policy** again
10. Policy name: `Service role write access`
11. Allowed operation: INSERT, UPDATE, DELETE
12. Policy definition: `(auth.jwt() ->> 'role'::text) = 'service_role'::text`
13. Click **Review** then **Save policy**

## Step 5: Verify Setup

Run this query in SQL Editor to check tables:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

You should see:
- cars
- concierge_services
- properties
- site_settings

## Step 6: Test the Backend

Once the database is set up, start the backend server:

```bash
npm run server
```

You should see:
```
🚀 Server running on http://0.0.0.0:3000
📍 API endpoints: http://0.0.0.0:3000/api/*
```

## Troubleshooting

### Error: "relation does not exist"
- Make sure you ran the entire `supabase-schema.sql` file
- Check that tables were created in the `public` schema

### Error: "permission denied"
- Verify RLS policies were created correctly
- Check that SUPABASE_SERVICE_ROLE_KEY is set in environment variables

### Images not uploading
- Make sure the `images` storage bucket exists and is public
- Verify storage policies allow service role to write

## Next Steps

After database setup is complete:
1. The backend server will be able to read/write to Supabase
2. Admin panel will save data to the cloud database
3. Public pages will read from the cloud database
4. All devices will see the same data instantly
