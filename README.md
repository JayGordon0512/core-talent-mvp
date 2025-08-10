# Core Talent MVP (Next.js + Supabase)

Casting & booking platform MVP with Talent profiles, tag-based search, media upload, and basic admin.

## Quick Start

### 1) Create Supabase project
- Get **Project URL** and **Anon Key**
- In SQL editor, run `supabase/schema.sql`
- Create a **Storage bucket** named `media`
- (Optional) Turn on email auth; disable email confirmations during testing

### 2) Configure Env
Copy `.env.example` to `.env.local` and fill in:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
APP_SECRET=any_random_string
```

### 3) Install & Run
```
npm install
npm run dev
```

### 4) Vercel Deploy
- Connect repo to Vercel
- Add env vars in Vercel project settings
- Deploy

## Features
- Email/password auth (Supabase)
- Talent dashboard: tags & media upload
- Admin: tag-based talent search
- Job card component scaffold

## Notes
- RLS policies are permissive for MVP; harden for production.
- Add role management by writing to `users_profile.role` for admins.

## Repo Structure
- `app/` – Next.js App Router pages
- `components/` – UI components
- `lib/` – Supabase client
- `supabase/` – SQL schema
- `.env.example` – env vars
- `tailwind.config.ts` – styling
