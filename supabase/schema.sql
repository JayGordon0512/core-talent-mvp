-- Core Talent MVP Database Schema

-- Enable UUIDs
create extension if not exists "uuid-ossp";

-- Users are managed by Supabase auth; we'll mirror essential info
create table if not exists users_profile (
  id uuid primary key references auth.users(id) on delete cascade,
  role text check (role in ('Talent','Admin')) default 'Talent',
  created_at timestamp with time zone default now()
);

create table if not exists talent_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  bio text,
  location text,
  height_cm int,
  weight_kg int,
  skills text[],
  tags text[],
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists media (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  file_type text check (file_type in ('Headshot','Video','Audio','Document')),
  file_path text not null,
  created_at timestamp with time zone default now()
);

create table if not exists jobs (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  job_type text,
  location text,
  date date,
  rate text,
  usage_rights text,
  created_by uuid references auth.users(id)
);

create table if not exists applications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  job_id uuid references jobs(id) on delete cascade,
  status text check (status in ('Pending','Selected','Confirmed','Declined')) default 'Pending',
  rate_override text,
  created_at timestamp with time zone default now()
);

create table if not exists availability (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  date date not null,
  is_available boolean default true
);

create table if not exists invoices (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  job_id uuid references jobs(id) on delete cascade,
  amount numeric(10,2),
  status text check (status in ('Draft','Sent','Paid','Overdue')) default 'Draft',
  date_issued date default now(),
  date_paid date,
  invoice_url text
);

create table if not exists admin_notes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  created_by uuid references auth.users(id) on delete cascade,
  note_text text,
  created_at timestamp with time zone default now()
);

-- RLS
alter table users_profile enable row level security;
alter table talent_profiles enable row level security;
alter table media enable row level security;
alter table jobs enable row level security;
alter table applications enable row level security;
alter table availability enable row level security;
alter table invoices enable row level security;
alter table admin_notes enable row level security;

-- Policies
-- Users can read their own profile; admins can read all
create policy "talent_profiles_select_own" on talent_profiles
for select using (auth.uid() = user_id);

create policy "talent_profiles_upsert_own" on talent_profiles
for insert with check (auth.uid() = user_id);

create policy "talent_profiles_update_own" on talent_profiles
for update using (auth.uid() = user_id);

-- Admins: allow read all via function-based role check (simple: any signed-in for MVP)
create policy "talent_profiles_select_all_signed_in" on talent_profiles
for select using (auth.role() = 'authenticated');

-- Simple policies for other tables (tighten later)
create policy "media_owner_rw" on media
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "applications_owner_rw" on applications
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "availability_owner_rw" on availability
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "jobs_read_all" on jobs for select using (true);

-- Storage bucket (create in Supabase UI): 'media'
-- Set storage policy to allow authenticated users to upload and read their own paths.
