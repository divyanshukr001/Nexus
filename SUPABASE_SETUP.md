# Supabase Setup Guide for Nexus Marketplace

Follow these simple steps to connect your Supabase database and authentication to Nexus.

---

### Step 1: Create a Free Supabase Project
1. Go to [https://supabase.com](https://supabase.com) and sign in or create an account.
2. Click **New Project**.
3. Name your project (e.g., `nexus-marketplace`), set a strong database password, and choose your preferred region.

---

### Step 2: Run Database Schema and Seed Scripts
1. In your Supabase dashboard, click **SQL Editor** on the left navigation bar.
2. Click **New query**.
3. Copy the entire contents of [`supabase/schema.sql`](file:///c:/Users/divya_x4jqts4/Desktop/website/supabase/schema.sql) and paste it into the SQL editor, then click **Run**.
   - *This creates the `profiles`, `products`, `cart_items`, `orders`, and `order_items` tables with Row Level Security (RLS) and automatic user profile sync triggers.*
4. Click **New query** again, copy the contents of [`supabase/seed.sql`](file:///c:/Users/divya_x4jqts4/Desktop/website/supabase/seed.sql), paste it into the editor, and click **Run**.
   - *This seeds initial products matching the Nexus futuristic marketplace catalogue.*

---

### Step 3: Copy Your API Credentials
1. Go to **Project Settings** (gear icon at the bottom left) -> **API**.
2. Copy the **Project URL**.
3. Copy the **anon public** API Key.

---

### Step 4: Add Keys to `.env.local`
Open [`.env.local`](file:///c:/Users/divya_x4jqts4/Desktop/website/.env.local) in your project root and paste your values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

### Step 5: (Optional) Enable Email Confirmations & Google OAuth
1. **Email Auth**: Enabled by default in Supabase under **Authentication** -> **Providers** -> **Email**.
   - For rapid local testing without needing to confirm emails, you can turn off *"Confirm email"* under **Authentication** -> **Providers** -> **Email** -> disable *Confirm email*.
2. **Google OAuth**: Under **Authentication** -> **Providers** -> **Google**, toggle Enabled and paste your Google Client ID and Secret if you want 1-click Google Sign In.

---

### You're all set!
Start your development server:
```bash
npm run dev
```
Navigate to `http://localhost:3000` to sign up, sign in, manage your profile, and shop!
