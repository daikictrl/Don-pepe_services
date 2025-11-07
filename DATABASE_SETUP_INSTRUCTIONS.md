# Database Setup Instructions

## ⚠️ IMPORTANT: You must complete these steps in Supabase before the app will work!

Your backend server is running, but it needs the database tables to be created in Supabase first.

### Step 1: Open Supabase SQL Editor

1. Go to: **https://app.supabase.com/project/kdmrtgayjfgjketrezif/sql/new**
2. You'll see the SQL Editor

### Step 2: Create Tables

1. Open the file `supabase-schema.sql` in this project
2. Copy **ALL** the SQL code (the entire file)
3. Paste it into the Supabase SQL Editor
4. Click the **Run** button (or press Cmd/Ctrl + Enter)

This creates 4 tables:
- ✅ `cars` - for luxury vehicles
- ✅ `properties` - for real estate listings  
- ✅ `concierge_services` - for concierge services
- ✅ `site_settings` - for site configuration

It also sets up:
- Row Level Security (RLS) policies
- Public read access
- Admin write access (using service role key)
- Automatic timestamp updates

### Step 3: Create Image Storage Bucket

1. Go to: **https://app.supabase.com/project/kdmrtgayjfgjketrezif/storage/buckets**
2. Click **New bucket**
3. Name: `images`
4. Make it **Public** (check the box)
5. Click **Create bucket**

### Step 4: Set Storage Policies

1. Click on the `images` bucket
2. Click the **Policies** tab
3. Click **New policy** → **For full customization**

**Policy 1 - Public Read:**
- Policy name: `Public read access`
- Allowed operation: SELECT
- Policy definition: `true`
- Click **Save**

**Policy 2 - Admin Write:**
- Policy name: `Service role write access`  
- Allowed operation: INSERT, UPDATE, DELETE
- Policy definition: `(auth.jwt() ->> 'role'::text) = 'service_role'::text`
- Click **Save**

### Step 5: Verify Setup

Go back to SQL Editor and run:

```sql
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;
```

You should see all 4 tables listed.

### ✅ Done!

Once these steps are complete:
- Your admin panel will save to the cloud database
- Changes will appear on ALL devices instantly
- No more localStorage limitations
- PC and mobile will stay perfectly in sync

## Need Help?

If you see errors:
1. Make sure you pasted the ENTIRE `supabase-schema.sql` file
2. Check that the storage bucket is marked as "Public"
3. Verify all 3 environment variables are set (SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY)
